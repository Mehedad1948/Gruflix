import GradientBg from "@/components/atoms/gadient-bg";
import Apple from "@/components/atoms/icons/apple";
import Github from "@/components/atoms/icons/github";
import Google from "@/components/atoms/icons/google";
import Linkedin from "@/components/atoms/icons/linkedin";
import Input from "@/components/atoms/input";
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
const bcryptjs = require("bcryptjs");

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

type KeyType = keyof Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

const providersIcons: Partial<Record<KeyType, JSX.Element>> = {
  github: <Github className="scale-125" />,
  google: <Google className="scale-125" />,
  linkedin: <Linkedin />,
  auth0: <Apple className="scale-125" />,
};

function Login({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  console.log({ providers });

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [field, meta] = useField("login_email");
  // console.log(meta.onChange);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Access the dynamic segment value
    const { auth } = router.query;

    // Check if the dynamic segment matches the allowed values
    if (auth === 'register') {
      console.log('User is on the register page');
    } else if (auth === 'login') {
      console.log('User is on the login page');
    } else {
      console.log('Invalid authentication page');
    }
  }, [router.query.auth]);

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

  async function handleLogin() {
    // const response = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: "email",
    //     password: "1234",
    //   }),
    // });

    const saltRounds = 10;
    const salt = bcryptjs.genSaltSync(saltRounds);

    const hashedPassword = bcryptjs.hashSync(loginPassword, salt);

    const res = await signIn("credentials", {
      email: loginEmail,
      password: hashedPassword,
      redirect: false,
    });
    console.log({ res });

    // if (email.length === 0) {
    //   setMsg("Please enter your email address");
    // } else {
    //   setIsLoading(true);
    //   // log in a user by their email
    //   try {
    //     const didToken = await magic.auth.loginWithMagicLink({
    //       email,
    //     });
    //     if (didToken) {
    //       const response = await fetch("/api/auth/signup", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           email: "email",
    //           password: "1234",
    //         }),
    //         headers: {
    //           Authorization: `Bearer ${didToken}`,
    //           "Content-Type": "application/json",
    //         },
    //       });

    //       const loggedInResponse = await response.json();
    //       if (loggedInResponse.done) {
    //         router.push("/");
    //       } else {
    //         throw new Error("Something went wrong in login");
    //       }
    //     }
    //   } catch (err) {
    //     // Handle errors if required!
    //     setIsLoading(false);
    //     console.error(err);
    //     toast.error("Something went wrong in login");
    //   }
    // }
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div
        className=" flex h-full min-h-screen w-full  bg-white flex-col sm:flex-row
                        from-[#cbdcf7] to-white sm:items-stretch "
      >
        <div
          className=" h-[35vh] sm:h-screen sm:w-1/3 text-white  bg-gradient-to-tr from-slate-900
          to-slate-700 flex
                         items-center justify-center"
        >
          <div>
            <h1>Gruflix</h1>
            <p className="text-lg font-semibold ml-1">Keep Learning</p>
          </div>
        </div>
        <div
          className="relative flex h-full sm:min-h-screen w-full items-end sm:items-center 
                  justify-center  sm:w-2/3"
        >
          {/* <GradientBg className="absolute right-0 h-full max-h-screen w-full" /> */}
          <main
            className="w-full sm:max-w-lg rounded-lg bg-white/90
                     px-4 py-3 sm:py-4  rounded-t-md "
          >
            <h2>Sign in</h2>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={() => {}}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form className="mt-3 flex flex-col gap-8 ">
                  <Input
                    error="Email is invalid"
                    value={loginEmail}
                    onChange={(e) => {
                      setMsg("");
                      setLoginEmail(e.target.value);
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
                    onClick={handleLogin}
                    className=" w-full rounded bg-gradient-to-tr from-slate-900
                          to-slate-700 py-2 font-medium text-white "
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex items-center gap-6 justify-center mt-4">
              {providers &&
                Object.values(providers).map((provider) => (
                  <div
                    className="border rounded-lg  aspect-square bg-gradient-to-tr
                from-indigo-400 to-indigo-950 w-12 text-sm text-white flex 
                justify-center items-center "
                    onClick={() => signIn(provider.id)}
                    key={provider.id}
                  >
                    {providersIcons[provider.name.toLowerCase()]}
                  </div>
                ))}
            </div>

            <div className='text-sm mt-3'>
              <p>Dont have account yet? <span className='text-blue-600'>Sign up here</span></p> 
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Login;
