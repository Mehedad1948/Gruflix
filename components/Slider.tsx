import React, { ReactNode, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

interface Props {
  cardsArray: Object[] | null;
  error?: string | null;
  minWidth?: string;
  render: (item: any, index: number) => React.ReactNode;
  sliderPreview?: number;
  spaceBetween?: number;
  freeMode?: boolean;
}

export default function Slider({
  cardsArray,
  render,
  sliderPreview = 3,
  spaceBetween = 30,
  freeMode = true,
}: Props) {
  return (
    <>
      <Swiper
        slidesPerView={sliderPreview}
        spaceBetween={spaceBetween}
        freeMode={freeMode}
        pagination={{
          enabled: false,
          clickable: false,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1000: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
      >
        {cardsArray?.map(render)}
      </Swiper>
    </>
  );
}
