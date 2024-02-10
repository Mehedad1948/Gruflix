import GradientBg from "@/components/atoms/gadient-bg";
import Apple from "@/components/atoms/icons/apple";
import Github from "@/components/atoms/icons/github";
import Google from "@/components/atoms/icons/google";
import Linkedin from "@/components/atoms/icons/linkedin";
import Input from "@/components/atoms/input";
import { createNewUser } from "@/lib/db/hasura";
import { magic } from "@/lib/magic-client";
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
const bcryptjs = require("bcryptjs");

const initialValues = {
  login_email: "",
  login_password: "",
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, query } = context;
  const session = await getSession({ req });
  console.log({ context, req });
  const callbackUrl = query?.callbackUrl || "";
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
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

    const hashedPassword = bcryptjs.hashSync(loginPassword, salt);

    if (formState === "login") {
      const res = await signIn("credentials", {
        email: loginEmail,
        password: hashedPassword,
        redirect: false,
      });

      return router.push(callbackUrl || "/");
    } else {
      console.log("call create", process.env.JWT_SECRET);
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
        "12345678912345678912345678912345",
      );

      const res = await createNewUser(token, loginEmail, hashedPassword);
      if (res.success) {
        toast.success("Welcome");
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
          "12345678912345678912345678912345",
        );
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/activate/${activation_token}`;
        console.log({ loginEmail });

        const send = await fetch("/api/activate-account", {
          method: "POST",
          body: JSON.stringify({
            email: loginEmail,
            url,
            subject: "Activate your Account",
          }),
        });
        console.log({ send });

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
          className="flex flex-col h-full sm:flex-row-reverse b
                         sm:items-stretch "
        >
          <div
            className="   sm:w-1/3 text-white   backdrop-blur-sm h-full  flex flex-col
                         items-center justify-center"
          >
            <div>
              <h1 className="text-amber-700">
                Gruflix
              </h1>
              <p className="text-lg font-semibold ml-1 text-amber-700">Keep Learning</p>
            </div>
            {formState === "login" ? (
              <div className="text mt-3 flex gap-2 flex-col items-center text-amber-700 justify-self-end">
                <p>Dont have account yet? </p>
                <button
                  onClick={() => {
                    setFormState((s) => (s === "login" ? "register" : "login"));
                  }}
                  className="rounded font-semibold px-4 py-0.5 header-text text-amber-50 "
                >
                  Register here
                </button>
              </div>
            ) : (
              <div className="text-sm mt-3 flex gap-2 flex-col items-center justify-self-end">
                <p>Already have an account? </p>
                <button
                  onClick={() => {
                    setFormState((s) => (s === "login" ? "register" : "login"));
                  }}
                  className="text-slate-800 rounded font-semibold px-3 py-0.5 bg-slate-200 "
                >
                  Login here
                </button>
              </div>
            )}
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

                <button
                  className=" w-full rounded hero-text py-2 font-medium text-white capitalize"
                >
                  {isLoading ? "Loading..." : formState}
                </button>
              </form>

              <div className="flex items-stretch gap-3 justify-center mt-4">
                {providers &&
                  Object.values(providers).map((provider) => {
                    if (provider.name !== "Credentials") {
                      return (
                        <div
                          className="border rounded-lg cursor-pointer  header-text justify-evenly text-sm text-white flex 
                 py-2 items-center gap-2 grow h-12"
                          onClick={() => signIn(provider.id)}
                          key={provider.id}
                        >
                          {providersIcons[provider.name.toLowerCase()]}
                          <span>{provider.name}</span>
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
