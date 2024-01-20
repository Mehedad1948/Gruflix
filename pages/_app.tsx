import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { montserrat } from "../styles/fonts";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { magic } from "@/lib/magic-client";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // router.push("/");
      } else {
        setIsLoading(false);
      }
    };
    isUserLoggedIn();
  }, []);

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

  return (
    <main className={`${montserrat.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </main>
  );
}
