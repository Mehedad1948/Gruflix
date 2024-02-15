import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { signOut, signIn } from "next-auth/react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Logo from "./atoms/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session, status } = useSession();
  // console.log({ session });

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsScrolled(isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

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
      className={`${isScrolled ? "-translate-y-[105%]" : ""}  z-50
        w-full gap-8   px-4 pb-4 
                 pt-4 text-black sm:px-10 sm:pb-6
                 transition-transform duration-500 sm:flex hidden`}
    >
      {isNavigating && (
        <div className="loading-line absolute bottom-0 h-1 w-full bg-orange-400"></div>
      )}
      <Logo />
      <ul className="flex  gap-4">
        {/* <Link href="/">Home</Link> */}
        {/* <Link className="w-max" href="/browse/my-list">
          My List
        </Link> */}
      </ul>

      <span className="grow"></span>

      <div className="relative h-fit">
        <div
          ref={ref}
          onClick={() => {
            status !== "loading" &&
              session?.user &&
              setIsMenuOpen((state) => !state);
          }}
          className="flex  items-center gap-2 text-slate-800 font-semibold"
        >
          {status !== "loading" && session?.user && <MdKeyboardArrowDown />}
          <div>
            {status === "loading" ? (
              "Authenticating..."
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <span>
                  {session.user?.name
                    ? session.user?.name
                    : session.user?.email}
                </span>
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
              <button
                className="block z-50  rounded-full border-2 border-orange-400 bg-[#f59e0b] 
              px-4 py-1 text-center  text-amber-50 font-semibold hover:scale-105 transition-transform 
              duration-500"
                onClick={() => signIn()}
              >
                Login
              </button>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <button
            onClick={() => signOut()}
            className="absolute -bottom-11 z-50 right-0 w-32 rounded  header-text 
                       px-2 py-1 text-center  text-amber-50 font-semibold"
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
