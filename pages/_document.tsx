import { montserrat } from "@/styles/fonts";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="description" content="Your app description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* Add your SVG logo as an image in the title bar */}
        <link rel="icon" href="/guruLogo.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="https://apis.google.com/js/api.js" />
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js" strategy="beforeInteractive" /> */}
      </body>
    </Html>
  );
}
