import { LegacyRef, useEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<any>(null);

  const { contextSafe } = useGSAP();

  const mouseMove = contextSafe((e: MouseEvent) => {
    if (!cursorRef.current) {
      return;
    }
    const { top, left, width, height } =
      cursorRef.current.getBoundingClientRect();

    gsap.to(cursorRef.current, {
      x: e.clientX - width / 2,
      y: e.clientY - height / 2,
      ease: "back.out",
      duration: 1.5,
    });
  });

  window.addEventListener("mousemove", mouseMove);

  return (
    <div
    style={{backgroundSize: `800% 800%`}}
      ref={cursorRef}
      className="fixed top-0 left-0 z-50   pointer-events-none"
    >
        <div className=' border-amber-600 border-2 rounded-full w-12 h-12 
         pointer-events-none backdrop-contrast-200 border-dashed animate-spin-slow-3'>

        </div>
    </div>
  );
};

export default CustomCursor;
