import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { montserrat } from "../styles/fonts";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { magic } from "@/lib/magic-client";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "@/components/Footer";

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
          <div className="p-3 sm:p-4 frame bg-fixed">
            <div className="border relative z-20 border-amber-200 bg-white/80 backdrop-blur-lg rounded-lg overflow-hidden">
              <Navbar />

              <Component {...pageProps} />
              <Footer />
            </div>
            {/* <div className="w-64 aspect-square fixed z-0 top-1/3 left-1/3 frame rounded-full"></div>
            <div className="w-48 aspect-square opacity-80 fixed z-0 bottom-16 right-1/3 hero-text 
            rounded-full animate-pulse"></div> */}
            {/* <div className="fixed top-0 left-0 h-4 frame w-full z-50 bg-fixed"></div> */}
            {/* <div className="fixed bottom-0 left-0 h-4 frame w-full z-50 bg-fixed"></div> */}
          </div>
        </SessionProvider>
      </QueryClientProvider>
    </main>
  );
}
