import { MutableRefObject, WheelEventHandler, useRef } from "react";
import Card, { CardSizes } from "./Card";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { VideoData } from "@/models/videos";

interface Props {
  videos: VideoData[];
  title: string;
  size?: CardSizes;
  colorClass?: string;
}

function SectionCard({
  videos,
  title,
  size = "small",
  colorClass = "bg-gradient-to-tr from-blue-950 to-slate-950",
}: Props) {
  // console.log({ videos });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll: WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.deltaY !== 0 && scrollContainerRef.current) {
      e.stopPropagation();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };
  // console.log({ videos });

  return (
    <section
      className={
        colorClass +
        " " +
        ` relative mx-auto mt-16 flex sm:w-[96%] flex-col items-center justify-center gap-2 rounded sm:rounded-3xl
          border-2 border-sky-950/10 py-4 sm:py-12 first:mt-0 `
      }
    >
      {/* <div
        className="absolute right-5 top-1/2 z-50 flex aspect-square w-12 -translate-y-1/2 items-center
                     justify-center rounded-full bg-blue-400/50 align-middle 
                     backdrop-hue-rotate-180 "
      >
        <IoIosArrowForward />
      </div> */}
      <h2 className="text-sky-100 text-left">{title}</h2>
      <div
        ref={scrollContainerRef}
        onWheel={handleScroll}
        className="mx-auto grid w-11/12 grid-cols-1 justify-items-center gap-x-4 gap-y-4 overflow-y-hidden overflow-x-scroll
                  pt-4 sm:pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(10,_300px)]"
      >
        {videos && videos.map((video: any) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <Card video={video} size={size} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SectionCard;
