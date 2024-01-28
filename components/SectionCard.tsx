import { MutableRefObject, WheelEventHandler, useRef } from "react";
import Card, { CardSizes } from "./Card";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { VideoData } from "@/models/videos";
import ReactIcon from "./atoms/icons/react";
import useEmblaCarousel from "embla-carousel-react";


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
  colorClass = "",
}: Props) {
  // console.log({ videos });
 const [emblaRef] = useEmblaCarousel()

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
    ref={emblaRef}
      className={
        colorClass +
        " " +
        ` relative mx-auto  flex w-full sm:w-[95%] flex-col items-center justify-center
           gap-2 rounded-lg shadow mt-8 first:mt-2 border sm:p-4
            overflow-hidden`
      }
    >
      {/* <ReactIcon color="white" className="absolute  " /> */}
      {/* <div
        className="absolute right-5 top-1/2 z-50 flex aspect-square w-12 -translate-y-1/2 items-center
                     justify-center rounded-full bg-blue-400/50 align-middle 
                     backdrop-hue-rotate-180 "
      >
        <IoIosArrowForward />
      </div> */}
      <h2 className=" w-11/12   py-2  rounded-lg text-center text-slate-700">
        {title}
      </h2>
      <div
        ref={scrollContainerRef}
        onWheel={handleScroll}
        className="mx-auto flex grid-cols-1 justify-items-center gap-x-4 gap-y-4 
                  pt-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {videos &&
          videos.map((video: any) => (
            <Link key={video.id} href={`/video/${video.id}`}>
              <Card video={video} key={video.id}  size={size} />
            </Link>
          ))}
      </div>
    </section>
  );
}

export default SectionCard;
