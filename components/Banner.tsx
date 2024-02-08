import { BsFillPlayFill } from "react-icons/bs";
import CoverText from "./CoverText";
import { useEffect, useState } from "react";
interface Props {
  title: string;
  subtitle: string;
  imgUrl: string;
}
let timer: NodeJS.Timeout;
const Banner = ({ title, subtitle, imgUrl }: Props) => {
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const dummyText = ` The keynote from Tailwind Connect 2023, our first-ever live event
  that took place on June 20th, 2023, featuring presentations from
  Adam Wathan, Sam Selikoff, and Steve Schoger.`;
  function handleOnPlay() {}

  const handleGenerate = () => {
    if (timer || text.length === dummyText.length) {
      return;
    }
    setStarted(true);
    let i = -1;
    timer = setInterval(() => {
      i++;
      if (i === dummyText.length - 1) clearInterval(timer);
      setText((prev) => prev + dummyText[i]);
    }, 50);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div
      className="relative  flex h-screen w-full gap-4 items-center overflow-hidden sm:px-16
                    "
    >
      <div
        className="grow flex flex-col p-4 absolute sm:relative z-30 bottom-8 
      sm:max-w-[50%]  sm:items-center"
      >
        <h1 className="text-amber-50 sm:text-black">GRUFLIX</h1>
        <h2 className="font-semibold relative capitalize text-amber-50 sm:text-black z-10 text-[30px]">
          A palce to grow
        </h2>
        {/* <h2
          className="absolute z-0 text-rose-500 top-0 text-[50px]
       translate-y-0.5 -translate-x-0.5 font-semibold font-['a_astro_space']"
        >
          A place to grow
        </h2> */}
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
        onClick={() => handleGenerate()}
        className="md:w-[50%] w-full md:right-16 md:p-8 roinded-lg  h-screen md:h-fit flex flex-col
         items-center sm:justify-center relative md:absolute
                 z-10 before:content-[''] p-2
                  after:w-full after:h-full after:absolute after:content-[''] after:-z10
                after:bg-gradient-to-r after:from-rose-900 after:to-emerald-950 after:top-0 after:left-0 after:border-2 after:border-amber-900  
                before:top-0 before:left-0 before:translate-x-3 before:translate-y-3
                before:w-full before:absolute before:h-full before:-z-10 before:bg-purple-200/0"
      >
        <img
          className="z-20 relative border-2 border-rose-600 rounded w-full"
          src={imgUrl}
          alt=""
        />
        <div className="flex flex-col gap-3 mt-4 relative z-20">
          <h1 className="text-amber-100 text-xl md:text-3xl">
            Tailwind Connect 2023 — Keynote
          </h1>
          <p className="text-amber-100 font-medium relative w-full">
            <span className="absolute left-0 top-0"> {text}</span>
            <span className="opacity-0 pointer-events-none">{dummyText}</span>
          </p>
        </div>
      </div>

      {/* <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-cover"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div> */}
    </div>
  );
};

export default Banner;
