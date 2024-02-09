import { HiPlay } from "react-icons/hi2";

function PlayIconOverlay() {
  return (
    <div
      className="absolute left-0 bottom-8 z-10 h-fit w-fit sm:transition-transform duration-200
                   block -translate-x-14 boder-2 sm:group-hover:translate-x-2 
                   ease-[cubic-bezier(0.36,0.58,0.18,1.34)]"
    >
      <div
        className="center flex  gap-1.5 items-center justify-end
                    rounded-full  bg-gradient-to-r from-amber-900 to-amber-500
                     py-2 px-2.5 text-2xl text-white
                     rotate-0 w-48 text-right"
      >
         <span className='text-base'>Watch</span> <HiPlay />
      </div>
    </div>
  );
}

export default PlayIconOverlay;
