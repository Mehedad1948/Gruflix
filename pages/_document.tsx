import { montserrat } from "@/styles/fonts";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html className={montserrat.variable} lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="https://apis.google.com/js/api.js" />
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js" strategy="beforeInteractive" /> */}
      </body>
    </Html>
  );
}
