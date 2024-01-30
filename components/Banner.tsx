import { BsFillPlayFill } from "react-icons/bs";
import CoverText from "./CoverText";
interface Props {
  title: string;
  subtitle: string;
  imgUrl: string;
}

function Banner({ title, subtitle, imgUrl }: Props) {
  function handleOnPlay() {}
  return (
    <div
      className="relative  flex h-screen w-full items-center overflow-hidden
                    "
    >
      <div className='absolute top-1/2 -translate-y-1/2 left-16 '>
      <h2 className='font-semibold relative text-amber-950 z-10 text-[50px]'>
        A place to grow
      </h2>
      <h2 className='absolute z-0 text-rose-500 top-0 text-[50px]
       translate-y-0.5 -translate-x-0.5 font-semibold '>
        A place to grow
      </h2>
      </div>
      {/* <CoverText>
        <div className="relative z-20 flex flex-col gap-5 text-sky-50">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <button
            className="flex w-fit items-center gap-1 rounded  bg-sky-100 
                       px-2 py-1 text-xl font-medium text-black transition-colors duration-300 
                       hover:bg-black hover:text-sky-100
          "
            onClick={handleOnPlay}
          >
            <BsFillPlayFill />
            <span> Play </span>
          </button>
        </div>
      </CoverText> */}
      <div
        className="w-[50%] right-16 p-8 roinded-lg 
                absolute top-1/2 -translate-y-1/2 z-10 before:content-[''] 
                  after:w-full after:h-full after:absolute after:content-[''] after:-z10
                after:bg-rose-500 after:top-0 after:left-0 after:border-2 after:border-amber-900  
                before:top-0 before:left-0 before:translate-x-3 before:translate-y-3
                before:w-full before:absolute before:h-full before:-z-10 before:bg-purple-200"
      >
        <div className=''>as</div>
        <img className="z-20 relative" src={imgUrl} alt="" />
        <div className='flex flex-col gap-3 mt-4 relative z-20'>
          <h1 className='text-amber-100'>Tailwind Connect 2023 — Keynote</h1>
          <p className='text-amber-100 font-medium'>
            The keynote from Tailwind Connect 2023, our first-ever live event
            that took place on June 20th, 2023, featuring presentations from
            Adam Wathan, Sam Selikoff, and Steve Schoger.
          </p>
        </div>
      </div>

      {/* <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-cover"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div> */}
    </div>
  );
}

export default Banner;
