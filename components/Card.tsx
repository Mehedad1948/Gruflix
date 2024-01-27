import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiPlay } from "react-icons/hi2";
import PlayIconOverlay from "./PlayIconOverlay";
import { VideoData } from "@/models/videos";
import Heart from "./atoms/icons/heart";
import { IoEyeSharp } from "react-icons/io5";

const imageStyles = {
  small: { width: 150, height: 170 },
  medium: { width: 158, height: 280 },
  large: { width: 250, height: 434 },
};

export type CardSizes = keyof typeof imageStyles;

interface Props {
  size?: CardSizes;
  linkTo?: string;
  video: VideoData;
}

function Card({
  video: { imgUrl, title, channelId, statistics, publishedAt, description },
  linkTo = "/",
  size = "small",
}: Props) {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  // console.log("channelId", channelId);
  function handleImageError() {
    setImgSrc("/static/jp.jpg");
  }
  // console.log({ imgSrc, title });

  return (
    <div
      className="max-w group relative z-0 flex h-full min-h-full w-full min-w-[100px]  grow cursor-pointer
                 flex-col overflow-hidden rounded-xl 
                  bg-orange-50 backdrop-blur-lg shadow-emerald-50 hover:shadow-emerald-300
                 text-slate-900 border-2 border-emerald-200 
                 shadow-lg transition-all duration-500 hover:z-10"
    >
      <div
        className=" relative aspect-[16/9] rounded-b-[25px] overflow-hidden rounded-t-md  w-full
       "
      >
        {/* <div
          className=' 
      bg-gradient-to-b from-emerald-50/50 backdrop-blur-lg to-emerald-100 absolute bottom-0 w-full
           h-8 rounded-t-xl
     '
        ></div> */}
        <img
          // onError={handleImageError}
          className="mx-auto -mt-[45px] object-cover  transition-transform 
                    duration-[1000ms] group-hover:brightness-110 "
          src={imgSrc}
          // layout="fill"
          // width={imageStyles[size].width}
          // height={imageStyles[size].height}
          alt="image"
        />
        {/* <div className=" absolute bottom-0  right-0 z-50 h-1/3 w-full overflow-hidden ">
          <div className="absolute bottom-0  right-0 h-[300%] w-full">
            <img
              // onError={handleImageError}
              className="mx-auto object-cover  -mt-[45px] transition-transform 
                    duration-[1000ms] group-hover:brightness-110"
              src={imgSrc}
              // layout="fill"
              // width={imageStyles[size].width}
              // height={imageStyles[size].height}
              alt="image"
            />
          </div>
        </div> */}
        <PlayIconOverlay />
      </div>
      <div className="px-2 pt-2">
        <h3 className=" font-semibold text-xl text-slate-800 my-1">{title}</h3>
        <p className="mt-1">{description}</p>
      </div>
      <span className="grow"></span>
      <div className="flex items-center gap-4 justify-end w-full mt-2 p-2 sm:text-lg">
        <div className="flex items-center gap-1.5 text-slate-700 w-full justify-center sm:justify-end">
          <Heart className="mb-0.5 " />
          {statistics.likeCount === 0
            ? Math.floor(Math.random() * 5000)
            : statistics.likeCount}
          <span className="text-sm">likes</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 ">
          <IoEyeSharp className="" />
          {statistics.viewCount === 0
            ? Math.floor(Math.random() * 5000)
            : statistics.viewCount}
          <span className="text-sm">views</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
