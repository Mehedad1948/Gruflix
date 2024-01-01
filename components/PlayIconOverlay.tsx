import { HiPlay } from "react-icons/hi2";

function PlayIconOverlay() {
  return (
    <div
      className="absolute left-0 top-0 z-10 h-full w-full
                   "
    >
      <div
        className="center flex aspect-square translate-y-full rotate-90 scale-[30%] items-center justify-center
                    rounded-full bg-rose-utube px-3 text-2xl text-white
                    transition-all duration-500 ease-[cubic-bezier(0.36,0.58,0.18,1.34)]
                    group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-100"
      >
        <HiPlay />
      </div>
    </div>
  );
}

export default PlayIconOverlay;
