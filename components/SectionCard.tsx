import {
  MutableRefObject,
  WheelEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Card, { CardSizes } from "./Card";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { VideoData } from "@/models/videos";
import ReactIcon from "./atoms/icons/react";
import useEmblaCarousel from "embla-carousel-react";
import Slider from "./Slider";
import { SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import _ScrollTrigger from "gsap/ScrollTrigger";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// (async () => {
//   const importedScrollTrigger = (await import("gsap/ScrollTrigger"))
//     .ScrollTrigger;
//   ScrollTrigger = importedScrollTrigger;
// })();

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
  const [scrollHolder, setScrollHolder] = useState<any>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll: WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.deltaY !== 0 && scrollContainerRef.current) {
      e.stopPropagation();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };
  // console.log({ videos });

  const sectionCard = useRef(null);
  const titleRef = useRef(null);



  useEffect(() => {
    // console.log(ScrollTrigger);

    if (typeof window !== "undefined") {
      const getScroll = async () => {
        const importedScrollTrigger = (await import("gsap/ScrollTrigger"))
        .ScrollTrigger;
        
        gsap.registerPlugin(importedScrollTrigger);

      if (titleRef.current) {
        const reveal = gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: "20%",
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "circ.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 70%",
              end: "100px 10%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          },
        );

        // Clean up animation on component unmount
        return () => {
          if (reveal) {
            reveal.kill();
          }
        };
      }
    };
    getScroll()
    }
  }, []);

  useGSAP(
    () => {
      console.log("run");

      gsap.fromTo(
        ".card-anim",
        { opacity: 0, y: "7%", scaleY: 0.95 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "back.out",
        },
      );
    },
    { dependencies: [showMore], scope: sectionCard },
  );

  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <section
      id={title}
      ref={emblaRef}
      className={
        colorClass +
        " " +
        ` relative mx-auto flex   w-full min-h-fit flex-col items-center justify-center
          rounded-lg  first:mt-2 last:mb-6  sm:px-4
            overflow-hidden prespective `
      }
    >
      <h2
        key={title}
        ref={titleRef}
        data-scroll
        data-scroll-speed="0.3"
        className="title w-fit top-0  left-0  align-top  rounded-lg text-center text-transparent
                     bg-gradient-to-r from-amber-700 to-slate-900 bg-clip-text
                      text-[40px] leading-[44px] md:text-[80px] lg:text-[150px] md:leading-[88px]
                       lg:leading-[158px] sm:py-6 lg:py-12 xl:py-16
                     "
      >
        {title}
      </h2>
      <div className="grow"></div>

      <div
        ref={sectionCard}
        className={`${
          showMore
            ? `sm:grid-rows-[repeat(5,_400px)] gap-4 md:grid-rows-[repeat(4,_400px)] 
                xl:grid-rows-[repeat(3,_400px)] grid-rows-1`
            : `-mb-6 sm:grid-rows-[repeat(6,_0px)] md:grid-rows-[repeat(4,_0px)] 
            xl:grid-rows-[repeat(3,_0px)]`
        }
         w-full cards-container  transition-all duration-300
       p-4  grid-cols-1 justify-items-center sm:grid-cols-2 
       md:grid-cols-3 xl:grid-cols-4   overflow-hidden sm:grid hidden`}
      >
        {videos.map((video, index) => (
          <Link
            key={video.id}
            className="block overflow-hidden card-anim origin-bottom"
            href={`/video/${video.id}`}
          >
            <Card video={video} size={size} />
            {/* <div
              className="w-48 h-64 bg-orange-600"
            ></div> */}
          </Link>
        ))}
      </div>
      {videos.length > 1 && (
        <div
          className="px-3 py-0.5  relative hidden sm:block
          z-20 hover:px-6 transition-all duration-300 ease-out
        "
        >
          <div
            className="absolute left-0 top-0 w-full h-full border-x bg-[#fbfdf5]
           border-amber-300 rounded-full z-20"
          ></div>
          <div
            className="w-screen absolute  h-[1px]
          z-0 top-1/2 bg-amber-300 right-1/2 translate-x-1/2"
          ></div>
          <button
            className={` relative z-20 px-4 py-1 rounded-full border border-amber-300 
            transition-colors duration-300
          text-amber-700 hover:bg-amber-50 `}
            onClick={() => {
              scrollToElement(title);
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Hide Videos" : "Show Videos"}
          </button>
        </div>
      )}
      <div
        className="block sm:hidden w-full cards-container 
       p-4 overflow-visible"
      >
        <Slider
          sliderPreview={4}
          spaceBetween={20}
          cardsArray={videos || []}
          render={(video: any, index) => (
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
