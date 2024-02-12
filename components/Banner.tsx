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
import HeaderIntro from "./atoms/header-intro";

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
  const dummyText = `  Welcome to our coding hub! Explore a goldmine of top-notch YouTube
  programming videos.`;

  function handleOnPlay() {}
  console.log({ videos });

  const titleRef = useRef(null);

  const imageContainer: LegacyRef<HTMLDivElement> = useRef(null);
  const playButton: LegacyRef<HTMLDivElement> = useRef(null);

  const handleHover = (event: any) => {
    if (imageContainer.current && playButton.current) {
      const {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight,
      } = imageContainer.current.getBoundingClientRect();

      const {
        top: buttonTop,
        left: buttonLeft,
        width: buttonWidth,
        height: buttonHeight,
      } = playButton.current.getBoundingClientRect();

      const x = event.clientX - containerLeft;
      const y =
        event.clientY - containerTop - containerHeight + buttonHeight / 2;

      console.log("Hover me", event);
      gsap.to(".play-icon", {
        x: x,
        y: y,
        duration: 1.5,
        ease: "elastic.out",
      });
    }
  };

  const handleHoverOut = (event: any) => {
    console.log("Leave me");

    gsap.to(".play-icon", {
      x: "16px",
      y: "8px",
      duration: 1.56,
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
          className=" w-full sm:w-11/12 mx-auto sm:p-4 xl:min-h-screen flex flex-col 
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
            <HeaderIntro text={dummyText} />
            <span
              className="opacity-0  pointer-events-none
              text-[35px] sm:text-[50px] lg:text-[65px] xl:text-[80px] 
              bg-clip-text leading-[38px] sm:leading-[54px] lg:leading-[65px] xl:leading-[80px]"
            >
              {dummyText}
            </span>
          </h2>
        </div>
      </div>

      <div
        className=" mx-auto  roinded-lg   md:h-fit flex flex-col
         items-center sm:justify-center relative 
                 z-10 mb-6 xl:mt-0 mt-16
               rounded-t-2xl w-11/12 md:w-2/3 overflow-hidden  
               "
      >
        <Link
          href={`/video/${videos[0].id}`}
          className="relative block border w-full"
        >
          <div className=" p-7 w-full h-full absolute top-0 left-0 z-50 ">
            <div
              ref={imageContainer}
              onMouseLeave={handleHoverOut}
              onMouseMove={handleHover}
              className="w-full h-full "
            ></div>
          </div>
          <img
            className="z-20 relative border-2 aspect-[16/9] object-cover
             border-amber-400 rounded w-full overflow-hidden"
            src={imgUrl}
            alt=""
          />
          <div
            ref={playButton}
            style={{ transform: "translate(50%, -50%)" }}
            className="play-icon origin-center absolute bottom-0 left-0 z-30 w-12 h-12 flex items-center justify-center
             header-text p-2.5 sm:p-3 aspect-square rounded-full 
          text-white text-lg sm:text-xl lg:w-14 lg:h-14 lg:text-2xl"
          >
            <HiPlay />
          </div>
        </Link>

        <div className="flex flex-col gap-3 mt-4 relative z-20">
          <h1 className="text-amber-800 text-2xl md:text-3xl hero-text bg-clip-text text-transparent
          w-fit font-bold">
            {videos[0].title}
          </h1>
          <p
            ref={titleRef}
            className="text-amber-800 text-lg font-semibold relative hero-text bg-clip-text text-transparent
            w-fit"
          >
            <span className=""> {videos[0].description}</span>
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
