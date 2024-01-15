import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Logo from "./atoms/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { magic } from "@/lib/magic-client";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleLogout = async () => {
    try {
      const logout = await magic.user.logout();
      setIsloading(true);
      const isLoggedIn = await magic.user.isLoggedIn(); // => `false`
      if (!isLoggedIn) {
        setIsloading(false);
        setUsername("");
      }
    } catch {
      // Handle errors if required!
      console.error("Error in getting user data");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      // Assumes a user is already logged in
      try {
        setIsloading(true);
        const userInfo = await magic.user.getInfo();
        const didToken = await magic.user.getIdToken();
        console.log({ didToken });

        if (userInfo) {
          setIsloading(false);
          setUsername(userInfo.email);
        }
      } catch (err) {
        setIsloading(false);
        console.error("Error in getting user data", err);
      }
    };
    getUser();
  }, []);

  const ref = useOutsideClick<HTMLDivElement>(
    () => setIsMenuOpen(false),
    false,
  );

  const router = useRouter();

  return (
    <nav
      className="fixed left-0 top-0 z-50 flex w-full gap-8 rounded-b-lg bg-sky-50/90 px-10
                 pb-6 pt-4 text-black shadow backdrop-blur"
    >
      <Logo />
      <ul className="flex  gap-4">
        <Link href="/">Home</Link>
        <Link href="/my-list">My List</Link>
      </ul>

      <span className="grow"></span>

      <div className="relative h-fit">
        <div
          ref={ref}
          onClick={() => setIsMenuOpen((state) => !state)}
          className="flex  items-center gap-2"
        >
          <div>
            {isLoading ? (
              "Authenticating..."
            ) : username.length > 0 ? (
              username
            ) : (
              <button
                type="button"
                className="inline"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            )}
          </div>
          <MdKeyboardArrowDown />
        </div>
        {isMenuOpen && (
          <div
            className="absolute -bottom-11 right-0 w-32 rounded border-2 border-sky-200 bg-sky-100/70
                       px-2 py-1 text-center backdrop-blur-sm"
          >
            <button onClick={handleLogout}>Sign out</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
