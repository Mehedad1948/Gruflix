import { RefObject, useEffect, useRef } from "react";

export function useOutsideClick<T = HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref: RefObject<T> = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        ref.current instanceof HTMLElement &&
        !ref.current.contains(e.target as Node)
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
