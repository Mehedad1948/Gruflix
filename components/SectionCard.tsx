import { MutableRefObject, WheelEventHandler, useRef, useState } from "react";
import Card, { CardSizes } from "./Card";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { VideoData } from "@/models/videos";
import ReactIcon from "./atoms/icons/react";
import useEmblaCarousel from "embla-carousel-react";
import Slider from "./Slider";
import { SwiperSlide } from "swiper/react";

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
  const [emblaRef] = useEmblaCarousel();
  const [showMore, setShowMore] = useState(false);

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
        ` relative mx-auto flex   w-full min-h-fit flex-col items-center justify-center
           gap-2 rounded-lg bg-gr  first:mt-2  sm:p-4
            overflow-hidden prespective`
      }
    >
      <h2
        data-scroll
        data-scroll-speed="0.3"
        className=" w-fit top-0  left-0  align-top  rounded-lg text-center text-transparent
                     bg-gradient-to-r from-amber-700 to-slate-900 bg-clip-text
                      text-[40px] md:text-[80px] lg:text-[150px] lg:leading-[150px] md:pb-[35px]
                     "
      >
        {title}
      </h2>
      <div className="grow"></div>

      <div
        className={`${showMore ? "sm:grid-rows-[repeat(3,_400px)] grid-rows-1" : "-mb-6 !grid-rows-[repeat(3,_0px)]"}
         w-full cards-container 
       p-4  grid-cols-1 justify-items-center sm:grid-cols-2 
       md:grid-cols-3 xl:grid-cols-4 gap-4  overflow-hidden sm:grid hidden`}
      >
        {videos.map((video, index) => (
          <Link
            key={index}
            className="block overflow-hidden"
            href={`/video/${video.id}`}
          >
            <Card video={video}  size={size} />
          </Link>
        ))}
      </div>
      {videos.length > 1 && (
        <div
          className="px-3 py-0.5  relative hidden sm:block
          z-20 hover:px-6 transition-all duration-300 ease-out
        "
        >
          <div className="absolute left-0 top-0 w-full h-full border-x bg-[#fbfdf7]
           border-amber-300 rounded-full z-20"></div>
          <div
            className="w-screen absolute  h-[1px]
          z-0 top-1/2 bg-amber-300 right-1/2 translate-x-1/2"
          ></div>
          <button
            className={` relative z-20 px-4 py-1 rounded-full border border-amber-300 
            transition-colors duration-300
          text-amber-700 hover:bg-amber-50 cursor-pointer`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide Videos" : "Show Videos"}
          </button>
        </div>
      )}
      {/* <div
        className="block sm:hidden w-full cards-container 
       p-4 overflow-visible"
      >
        <Slider
          sliderPreview={4}
          spaceBetween={20}
          cardsArray={videos || []}
          render={(video: any) => (
            <SwiperSlide key={video.id}>
              <Link className="block " href={`/video/${video.id}`}>
                <Card video={video} key={video.id} size={size} />
              </Link>
            </SwiperSlide>
          )}
        />
      </div> */}
    </section>
  );
}

export default SectionCard;
