import { HiPlay } from "react-icons/hi2";

function PlayIconOverlay() {
  return (
    <div
      className="absolute left-8 bottom-8 z-10 h-fit w-fit
                   bg-black translate-x-full boder-2"
    >
      <div
        className="center flex aspect-square  rotate-90 scale-[70%] items-center justify-center
                    rounded-full bg-emerald-500 px-3 text-2xl text-white
                    transition-all duration-500 ease-[cubic-bezier(0.36,0.58,0.18,1.34)]
                    group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-100"
      >
        <HiPlay />
      </div>
    </div>
  );
}

export default PlayIconOverlay;
