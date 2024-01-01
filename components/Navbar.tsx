import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Logo from "./Logo";
import { useRouter } from "next/router";
import Link from "next/link";
function Navbar({ username }: { username: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useOutsideClick<HTMLButtonElement>(
    () => setIsMenuOpen(false),
    false,
  );

  const router = useRouter();

  return (
    <nav
      className="fixed left-0 top-0 z-50 flex w-full gap-8 rounded-b-lg bg-sky-50/50 px-10
                 pb-6 pt-4 text-black shadow backdrop-blur-sm"
    >
      <Logo />
      <ul className="flex  gap-4">
        <Link href="/">Home</Link>
        <Link href="/my-list">My List</Link>
      </ul>

      <span className="grow"></span>

      <div className="relative h-fit">
        <button
          ref={ref}
          onClick={() => setIsMenuOpen((state) => !state)}
          className="flex  items-center gap-2"
        >
          <p>{username}</p>
          <MdKeyboardArrowDown />
        </button>
        {isMenuOpen && (
          <div
            className="absolute -bottom-11 right-0 w-32 rounded border-2 border-sky-200 bg-sky-100/70
                       px-2 py-1 text-center backdrop-blur-sm"
          >
            <a>Sign out</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
