import { MutableRefObject, WheelEventHandler, useRef } from "react";
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
        ` relative mx-auto flex   w-full h-screen flex-col items-center justify-center
           gap-2 rounded-lg bg-gr mt-8 first:mt-2  sm:p-4
            overflow-hidden prespective`
      }
    >
      <h2
        data-scroll
        data-scroll-speed="0.3"
        className=" w-fit top-0 pt-[20vh] left-0 absolute h-[50vh]  rounded-lg text-center text-transparent
                     bg-gradient-to-r from-amber-950 to-emerald-950 bg-clip-text text-[10vh] md:text-[30vh] rotateY 
                     translate-x-8 md:translate-x-24"
      >
        {title}
      </h2>
      <div className="grow"></div>

      <div className="block w-full cards-container  translate-x-8 lg:translate-x-24
       p-4 overflow-visible">
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
      </div>
    </section>
  );
}

export default SectionCard;
