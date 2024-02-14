import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Logo from "./atoms/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const { data: session, status } = useSession();



  const ref = useOutsideClick<HTMLDivElement>(
    () => setIsMenuOpen(false),
    false,
  );

  const router = useRouter();

  return (
    <footer
      className="w-full bg-gradient-to-r from-amber-600 to-amber-800 px-4  
                 pt-4 text-amber-50  min-h-[50vh] flex-col
                 flex items-center justify-center"
    >
      <div
        className=" text-amber-50 text-[40px] sm:text-[100px] px-4 sm:px-6 py-2 border-2 sm:border-4 bg-gradient-to-r from-amber-500/50
       to-amber-700/50 
      border-amber-300 rounded-lg"
      >
        GURUFLIX
      </div>

      <div className=" px-6 py-1 my-2">
        {/* <ul className="flex gap-4 flex-wrap text-3xl">
          <li>React</li>
          <li>Vue</li>
          <li>Next</li>
        </ul> */}
      </div>
      <span className="grow"></span>
      <div className="flex items-center justify-start  w-full sm:w-fit">
        <p
          className="font-normal text-sm px-1 sm:px-5 py-2 border-t border-amber-300
        text-amber-100 flex sm:flex-row flex-col items-center w-full sm:w-fit gap-x-1.5"
        >
          <span>Some rights are reserved</span>{" "}
          <span className="sm:block hidden">|</span>
          <span className="w-max break-words"> GURUFLIX - 2024</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
