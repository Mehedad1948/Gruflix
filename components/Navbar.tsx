import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { signOut, signIn } from "next-auth/react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Logo from "./atoms/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { magic } from "@/lib/magic-client";
import { useSession } from "next-auth/react";
import Image from "next/image";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { data: session, status } = useSession();
  // console.log({ session });

  const router = useRouter();

  useEffect(() => {
    const hacdleStart = () => {
      setIsNavigating(true);
    };
    const handleComplete = () => {
      setIsNavigating(false);
    };
    router.events.on("routeChangeStart", hacdleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.on("routeChangeStart", hacdleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     // Assumes a user is already logged in
  //     try {
  //       setIsloading(true);
  //       const userInfo = await magic.user.getInfo();
  //       const didToken = await magic.user.getIdToken();
  //       console.log({ didToken });

  //       if (userInfo) {
  //         setIsloading(false);
  //         setUsername(userInfo.email);
  //       }
  //     } catch (err) {
  //       setIsloading(false);
  //       console.error("Error in getting user data", err);
  //     }
  //   };
  //   getUser();
  // }, []);

  const ref = useOutsideClick<HTMLDivElement>(
    () => setIsMenuOpen(false),
    false,
  );

  return (
    <nav
      className="fixed left-0 top-0 z-50 flex w-full gap-8 rounded-b-lg bg-sky-50/90 px-4 pb-4
                 pt-4 text-black shadow backdrop-blur sm:px-10 sm:pb-6"
    >
      {isNavigating && (
        <div className="loading-line absolute bottom-0 h-1 w-full bg-orange-400"></div>
      )}
      <Logo />
      <ul className="flex  gap-4">
        {/* <Link href="/">Home</Link> */}
        <Link className="w-max" href="/browse/my-list">
          My List
        </Link>
      </ul>

      <span className="grow"></span>

      <div className="relative h-fit">
        <div
          ref={ref}
          onClick={() => setIsMenuOpen((state) => !state)}
          className="flex  items-center gap-2"
        >
          <MdKeyboardArrowDown />
          <div>
            {status === "loading" ? (
              "Authenticating..."
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <span>{session.user?.name ? session.user?.name : session.user?.email }</span>
                {session.user.image && (
                  <Image
                    className="w-7 rounded-full"
                    src={session.user.image}
                    width={50}
                    height={50}
                    alt="pic"
                  />
                )}
              </div>
            ) : (
              <button type="button" className="inline" onClick={() => signIn()}>
                Login
              </button>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="absolute -bottom-11 right-0 w-32 rounded border-2 border-sky-200 bg-sky-100/70
                       px-2 py-1 text-center backdrop-blur-sm"
          >
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
