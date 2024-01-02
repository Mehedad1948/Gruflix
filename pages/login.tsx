import { magic } from "@/lib/magic-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
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
          router.push("/");
        }
      } catch {
        // Handle errors if required!
        setIsLoading(false);
        console.error("Something went wrong in login");
      }
    }
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div
        className="flex  min-h-screen w-full items-center justify-center
                        bg-gradient-to-tr from-[#cbdcf7] to-white "
      >
        <main
          className="w-full max-w-md rounded-lg border bg-white/30 px-4 py-3
                     shadow-md shadow-blue-300 outline-2 outline-blue-950/20 backdrop-blur-sm"
        >
          <h2>Sign in</h2>
          <form onSubmit={handleLogin} className="mt-3 flex flex-col gap-4">
            <label className="relative overflow-visible">
              <p className="text-lg font-medium">Email</p>
              <input
                value={email}
                onChange={(e) => {
                  setMsg("");
                  setEmail(e.target.value);
                }}
                name="email"
                type="email"
                className="relative z-20 mt-1 w-full rounded border border-blue-100 bg-white px-1
                           py-1 focus:outline-none"
              />

              <p
                className={`${
                  msg.length > 0
                    ? "translate-y-6 rotate-0"
                    : "translate-y-0 -rotate-3"
                } absolute bottom-0 z-0 origin-bottom-left font-medium text-rose-600
                transition-transform duration-300`}
              >
                {msg}
              </p>
            </label>
            <button
              className="mt-6 w-full rounded bg-gradient-to-tr from-slate-900
                          to-slate-700 py-2 font-medium text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
