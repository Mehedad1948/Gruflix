import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold uppercase tracking-wider"
    >
      <Image src="/guruLogo.svg" width={20} height={20} alt="Gruflix" />
      <span> Guruflix</span>
    </Link>
  );
}

export default Logo;
