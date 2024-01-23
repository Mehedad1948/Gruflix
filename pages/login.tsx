import GradientBg from "@/components/atoms/gadient-bg";
import Input from "@/components/atoms/input";
import { magic } from "@/lib/magic-client";
import { Form, Formik, useField } from "formik";
import { GetServerSidePropsContext } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const initialValues = {
  login_email: "",
  login_password: "",
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

function Login({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [field, meta] = useField("login_email");
  // console.log(meta.onChange);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const loginValidation = z.object({
    login_email: z.string().email("Invalid email address"),
    login_password: z.string().min(4, "Too short password"),
  });

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEmail()
  // };

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.length === 0) {
      setMsg("Please enter your email address");
    } else {
      setIsLoading(true);
      // log in a user by their email
      try {
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            throw new Error("Something went wrong in login");
          }
        }
      } catch (err) {
        // Handle errors if required!
        setIsLoading(false);
        console.error(err);
        toast.error("Something went wrong in login");
      }
    }
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div
        className=" flex h-full min-h-screen w-full  bg-gradient-to-tr
                        from-[#cbdcf7] to-white sm:items-stretch "
      >
        <div className="hidden h-screen w-1/2 bg-white sm:block"></div>
        <div
          className="relative flex h-full min-h-screen w-full items-end sm:items-center 
                  justify-center  sm:w-1/2"
        >
          <GradientBg className="absolute right-0 h-full max-h-screen w-full" />
          <main
            className="w-full sm:max-w-md rounded-lg border bg-white/80
                     px-4 py-3 shadow-md shadow-blue-300 outline-2 outline-blue-950/20 
                    backdrop-blur-xl "
          >
            <h2>Sign in</h2>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={() => {}}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form className="mt-3 flex flex-col gap-6">
                  <Input
                    error="Email is invalid"
                    value={email}
                    onChange={(e) => {
                      setMsg("");
                      setEmail(e.target.value);
                    }}
                    placeholder="Email Address"
                    name="login_email"
                    type="email"
                  />
                  <Input
                    error="Password is too short"
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type="password"
                    min="4"
                    minLength={4}
                  />

                  <button
                    className=" w-full rounded bg-gradient-to-tr from-slate-900
                          to-slate-700 py-2 font-medium text-white "
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex items-center gap-6 justify-center mt-2">
              {providers &&
                Object.values(providers).map((provider) => (
                  <div
                    className="border rounded-full cursor-pointer aspect-square bg-gradient-to-tr
                from-fuchsia-500 to-black w-12 text-sm text-white flex 
                justify-center items-center"
                    onClick={() => signIn(provider.id)}
                    key={provider.id}
                  >
                    {provider.name}
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Login;
