import { ReactNode } from "react";

function CoverText({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute left-0 top-0 z-10 flex h-full w-full items-center bg-gradient-to-r from-black 
                    pl-[10vw] text-white"
    >
      {children}
    </div>
  );
}

export default CoverText;
