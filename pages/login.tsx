import GradientBg from "@/components/atoms/gadient-bg";
import Apple from "@/components/atoms/icons/apple";
import Github from "@/components/atoms/icons/github";
import Google from "@/components/atoms/icons/google";
import Linkedin from "@/components/atoms/icons/linkedin";
import Input from "@/components/atoms/input";
import { createNewUser } from "@/lib/db/hasura";
import { Form, Formik, useField } from "formik";
import { GetServerSidePropsContext } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";

import { z } from "zod";
import { sendEmail } from "@/lib/utils/sendEmail";
import { redirect } from "next/dist/server/api-utils";
import VideoPage from "@/components/layouts/video-page";
import { NextPageWithLayout } from "./_app";
import Default from "@/components/layouts/default";
import Link from "next/link";
const bcryptjs = require("bcryptjs");

const initialValues = {
  login_email: "",
  login_password: "",
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, query } = context;
  const session = await getSession({ req });
  // console.log({ context, req });
  const callbackUrl = query?.callbackUrl || "";
  console.log({ session, callbackUrl });

  if (session) {
    return {
      redirect: {
        destination: callbackUrl || "/",
      },
    };
  }

  const csrfTpken = await getCsrfToken(context);

  const providers = await getProviders();
  return {
    props: { providers, csrfTpken, callbackUrl },
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

const Login: NextPageWithLayout = ({
  providers,
  csrfTpken,
  callbackUrl,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfTpken: string;
  callbackUrl: string;
}) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formState, setFormState] = useState<"login" | "register">("login");
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

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    // const response = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: "email",
    //     password: "1234",
    //   }),
    // });
    e.preventDefault();
    const saltRounds = 10;
    const salt = bcryptjs.genSaltSync(saltRounds);
    setIsLoading(true);
    const hashedPassword = bcryptjs.hashSync(loginPassword, salt);

    if (formState === "login") {
      const res = await signIn("credentials", {
        email: loginEmail,
        password: hashedPassword,
        redirect: false,
      });
      console.log({ res });

      if (res?.ok) {
        return router.push(callbackUrl || "/");
      } else {
        toast.error("Credentials are not valid");
        setIsLoading(false);
      }
    } else {
      const token = jwt.sign(
        {
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            // "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
      );

      const res = await createNewUser(token, loginEmail, hashedPassword);
      if (res.success) {
        toast.success("Welcome");
        setIsLoading(false);

        const activationCode = res.data.id;
        const activation_token = jwt.sign(
          {
            id: activationCode,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
            "https://hasura.io/jwt/claims": {
              "x-hasura-default-role": "user",
              "x-hasura-allowed-roles": ["user", "admin"],
              // "x-hasura-user-id": `${metadata.issuer}`,
            },
          },
          process.env.NEXT_PUBLIC_JWT_SECRET,
        );
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/activate/${activation_token}`;
        console.log({ loginEmail });

        // const send = await fetch("/api/activate-account", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     email: loginEmail,
        //     url,
        //     subject: "Activate your Account",
        //   }),
        // });
        // console.log({ send });

        setFormState("login");
      }
    }

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
        <title>{formState}</title>
      </Head>
      <div className="  h-screen frame w-full block ">
        <div
          className="flex flex-col h-full md:flex-row-reverse b
                         md:items-stretch items-center justify-center"
        >
          <div className="h-full  sm:w-1/2 lg:w-[750px] w-full flex items-center justify-center">
            <div
              className="w-full sm:aspect-square  text-slate-800 
             backdrop-blur-sm h-full sm:h-fit  flex flex-col
                         items-center justify-center sm:pr-4 relative"
            >
              <div
                className="w-full absolute z-0 top-1/2 -translate-y-1/2 frame border-2 shadow-amber-200 
                       border-amber-700/10  rounded-tr-full rounded-bl-full
              h-full max-h-[650px]"
              ></div>
              <div
                className="w-full absolute z-0 frame border-2  border-amber-700/10 shadow-amber-200 
             rounded-tl-full rounded-br-full
              h-full max-h-[650px]"
              ></div>
              <div className="relative z-50">
                <h1
                  className="text-[35px] text-center  sm:text-[50px] font-bold
                   mb-2 "
                >
                  <Link href="/">
                    <img
                      src="/guruLogo.svg"
                      className="w-44 sm:w-64 lg:w-fit"
                    />
                  </Link>
                </h1>
                {/* <p
                  className="text-lg font-semibold ml-1 text-center bg-gradient-to-r
              from-amber-900 to-amber-600 bg-clip-text text-transparent"
                >
                  Keep Learning
                </p> */}
              </div>

              <div className="text mt-3 bg-white/0 flex gap-2 flex-col items-center justify-self-end relative z-50">
                {formState === "login" ? (
                  <p
                    className=" bg-gradient-to-r
                  from-amber-900 to-amber-600 bg-clip-text text-transparent
                  font-semibold"
                  >
                    Dont have account yet?{" "}
                  </p>
                ) : (
                  <p
                    className=" bg-gradient-to-r
                  from-amber-900 to-amber-600 bg-clip-text text-transparent
                  font-semibold"
                  >
                    Already have an account?{" "}
                  </p>
                )}
                <button
                  onClick={() => {
                    setFormState((s) => (s === "login" ? "register" : "login"));
                  }}
                  className="rounded font-semibold px-4 py-0.5 bg-gradient-to-r
                from-amber-900 to-amber-600 text-amber-50 "
                >
                  {formState === "login" ? ` Register here` : "Login here"}
                </button>
              </div>
            </div>
          </div>
          <div
            className="relative flex h-full  w-full items-end sm:items-center 
                  justify-center  sm:w-2/3"
          >
            {/* <GradientBg className="absolute right-0 h-full max-h-screen w-full" /> */}
            <main
              className="w-full h-fit sm:max-w-lg rounded-lg bg-white backdrop-blur-sm border-amber-300 border
                     px-4 py-3 sm:py-4  rounded-t-md shadow shadow-amber-200"
            >
              <h2 className="capitalize text-amber-600">{formState}</h2>

              <form
                onSubmit={handleLogin}
                className={`${formState === "login" ? "" : ""} mt-3 flex flex-col  
                 gap-6 sm:gap-8 transition-all duration-200`}
              >
                <Input
                  label="Email"
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
                  label="Password"
                  error="Password is too short"
                  placeholder="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                  type="password"
                  min="4"
                  minLength={4}
                />
                <Input
                  className={`${formState === "login" ? "opacity-0 absolute hidden overflow-hidden" : "opacity-100"} 
                    transition-all duration-200`}
                  label="Repeat password"
                  error="Passwords are not same"
                  placeholder="Repeat password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  type="password"
                  min="4"
                  minLength={4}
                />

                <button className=" w-full text-lg rounded hero-text py-2 font-medium text-white capitalize">
                  {isLoading ? "Loading..." : formState}
                </button>
              </form>

              <div className="grid grid-cols-3 gap-2 mt-4 flex-wrap">
                {providers &&
                  Object.values(providers).map((provider) => {
                    if (provider.name !== "Credentials") {
                      return (
                        <div
                          className="border rounded-lg   header-text justify-evenly text-sm text-white flex 
                 py-2 items-center gap-2 grow h-12"
                          onClick={() => signIn(provider.id)}
                          key={provider.id}
                        >
                          {providersIcons[provider.name.toLowerCase()]}
                          <span className="hidden sm:inline-block">
                            {provider.name}
                          </span>
                        </div>
                      );
                    }
                  })}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
