import { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Link from 'next/link';

interface Props {
  children: ReactNode;
  showBg?: boolean;
}

const Default = ({ children, showBg = true }: Props) => {
  return (
    <div className="p-3 sm:p-4 frame bg-fixed">
      <div
        className={
          showBg
            ? `border relative z-20 border-amber-200 bg-white/75
                backdrop-blur-lg rounded-lg overflow-hidden`
            : ""
        }
      >
        <Navbar />
        {children}
        <Footer />
        {/* <div className="w-64 aspect-square fixed z-0 top-1/3 left-1/3 frame rounded-full"></div>
            <div className="w-48 aspect-square opacity-80 fixed z-0 bottom-16 right-1/3 hero-text 
            rounded-full animate-pulse"></div> */}
        {/* <div className="fixed top-0 left-0 h-4 frame w-full z-50 bg-fixed"></div> */}
        {/* <div className="fixed bottom-0 left-0 h-4 frame w-full z-50 bg-fixed"></div> */}
      </div>
      <Link href='/'>
        <img className='fixed bottom-8 left-8 z-50
        w-10 sm:w-12
        ' src='/guruLogo.svg' />
      </Link>
    </div>
  );
};

export default Default;
