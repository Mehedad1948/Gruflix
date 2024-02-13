import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { montserrat } from "../styles/fonts";
import Navbar from "@/components/Navbar";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "@/components/Footer";
import { NextPage } from "next";
import { Toaster } from "react-hot-toast";
import Default from "@/components/layouts/default";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const isUserLoggedIn = async () => {
  //     const isLoggedIn = await magic.user.isLoggedIn();
  //     if (isLoggedIn) {
  //       // router.push("/");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   };
  //   isUserLoggedIn();
  // }, []);

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

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={`${montserrat.className}`}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </QueryClientProvider>
    </main>
  );
}
