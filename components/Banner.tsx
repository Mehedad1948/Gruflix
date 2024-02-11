import { BsFillPlayFill } from "react-icons/bs";
import CoverText from "./CoverText";
import {
  LegacyRef,
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiPlay } from "react-icons/hi2";
import Link from "next/link";
import { VideoData } from "@/models/videos";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  title: string;
  subtitle: string;
  imgUrl: string;
  videos: VideoData[];
}
let timer: NodeJS.Timeout;

// Whether you're a newbie or a seasoned pro, there's
// something here for everyone. Let's ignite our coding journey together
// and elevate our skills to new heights!

const Banner = ({ title, subtitle, imgUrl, videos }: Props) => {
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    height: 0,
    width: 0,
  });
  const [buttonDimensions, setButtonDimensions] = useState({
    left: 0,
    top: 0,
    height: 0,
    width: 0,
  });
  const [started, setStarted] = useState(false);
  const dummyText = `  Welcome to our coding hub! Explore a goldmine of top-notch YouTube
  programming videos.`;
  function handleOnPlay() {}

  useEffect(() => {
    if (text.length === dummyText.length) {
      return;
    }
    setStarted(true);
    let i = -1;
    timer = setInterval(() => {
      i++;
      if (i === dummyText.length - 1) clearInterval(timer);
      setText((prev) => prev + dummyText[i]);
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    console.log("run");

    gsap.fromTo(
      ".card-anim",
      { opacity: 0, y: "5%" },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "back.out" },
    );
  }, {});

  const titleRef = useRef(null);

  const imageContainer: LegacyRef<HTMLDivElement> = useRef(null);
  const playButton: LegacyRef<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (imageContainer.current) {
      const { top, left, width, height } =
        imageContainer.current.getBoundingClientRect();

      setPosition({ left, top, height, width });
    }
    if (playButton.current) {
      const { top, left, width, height } =
        playButton.current.getBoundingClientRect();

      setButtonDimensions({ left, top, height, width });
    }
  }, []);
  console.log({ buttonDimensions });

  const handleHover = (event: any) => {
    const tl = gsap.timeline();

    const x = event.clientX - position.left;
    const y =
      event.clientY -
      position.top -
      position.height +
      buttonDimensions.height / 2;

    console.log("Hover me", event);
    tl.to(".play-icon", {
      x: x,
      y: y,
      duration: 2.5,
      ease: "elastic.out",
    });

    // tl.to(
    //   ".play-icon",
    //   {
    //     left: "50%",
    //     duration: 0.4,
    //     ease: "none",
    //   },
    //   "0",
    // );
  };

  const handleHoverOut = (event: any) => {
    console.log("Leave me");
    const tl = gsap.timeline();

    tl.to(".play-icon", {
      x: "16px",
      y: '8px',
      duration: 1,
      ease: "bounce.out",
    });

   
  };

  return (
    <div
      className="relative min-h-screen w-full gap-4 h-fit items-center overflow-hidden
                    "
    >
      <div
        className="grow flex flex-col items-center justify-center p-4 h-fit  z-30  relative
    "
      >
        <div
          className=" w-full sm:w-11/12 mx-auto sm:p-4 min-h-screen flex flex-col 
        items-center justify-center sm:justify-start sm:items-start"
        >
          <h1
            className="h-fit header-text w-fit  
                      text-[48px] mx-auto sm:mx-0 sm:text-[70px] lg:text-[65px] xl:text-[80px] 
                      leading-[48px] sm:leading-[70px] lg:leading-[65px] xl:leading-[80px]
                      text-transparent bg-clip-text "
          >
            GURUFLIX
          </h1>
          <h2
            className="font-semibold relative capitalize text-amber-950 max-w-full 
            z-10 text-xl mx-auto mt-4 sm:mt-2"
          >
            <span
              className="absolute top-0 left-0 hero-text w-fit text-[35px] sm:text-[50px] lg:text-[65px] xl:text-[80px] text-transparent 
          bg-clip-text leading-[38px] sm:leading-[54px] lg:leading-[65px] xl:leading-[80px] pb-1
          text-center sm:text-left"
            >
              {" "}
              {/* {text.length > 0 && (
                <div className="h-1 w-6 bg-amber-950 rounded inline-block"></div>
              )} */}
              {text}
            </span>
            <span
              className="opacity-0  pointer-events-none
              text-[35px] sm:text-[50px] lg:text-[65px] xl:text-[80px] 
              bg-clip-text leading-[38px] sm:leading-[54px] lg:leading-[65px] xl:leading-[80px]"
            >
              {dummyText}
            </span>
          </h2>
        </div>
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
        className=" mx-auto  roinded-lg   md:h-fit flex flex-col
         items-center sm:justify-center relative
                 z-10 mb-6
               rounded-t-2xl w-11/12 md:w-2/3 overflow-hidden  
               "
      >
        <Link href={`/video/${videos[0].id}`} className="relative block border">
          <div className=" p-7 w-full h-full absolute top-0 left-0 z-50">
            <div
              ref={imageContainer}
              onMouseLeave={handleHoverOut}
              onMouseMove={handleHover}
              className="w-full h-full "
            ></div>
          </div>
          <img
            className="z-20 relative border-2 border-amber-400 rounded w-full"
            src={imgUrl}
            alt=""
          />
          <div
            ref={playButton}
            style={{ transform: "translate(50%, -50%)" }}
            className="play-icon origin-center absolute bottom-0 left-0 z-30 w-12 h-12 flex items-center justify-center
             header-text p-2.5 sm:p-3 aspect-square rounded-full 
          text-white text-lg sm:text-xl"
          >
            <HiPlay />
          </div>
        </Link>

        <div className="flex flex-col gap-3 mt-4 relative z-20">
          <h1 className="text-amber-800 text-2xl md:text-3xl">
            Tailwind Connect 2023 — Keynote
          </h1>
          <p
            ref={titleRef}
            className="text-amber-800 text-lg font-semibold relative w-full"
          >
            <span className="">
              {" "}
              The keynote from Tailwind Connect 2023, our first-ever live event
              that took place on June 20th, 2023, featuring presentations from
              Adam Wathan, Sam Selikoff, and Steve Schoger.
            </span>
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
