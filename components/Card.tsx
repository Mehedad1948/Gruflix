import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiPlay } from "react-icons/hi2";
import PlayIconOverlay from "./PlayIconOverlay";

const imageStyles = {
  small: { width: 150, height: 170 },
  medium: { width: 158, height: 280 },
  large: { width: 250, height: 434 },
};

export type CardSizes = keyof typeof imageStyles;

interface Props {
  size?: CardSizes;
  linkTo?: string;
  video: {
    imgUrl: string;
    title: string;
    channelId: string;
  };
}

function Card({
  video: { imgUrl, title, channelId },
  linkTo = "/",
  size = "small",
}: Props) {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  console.log("channelId", channelId);
  function handleImageError() {
    setImgSrc("/static/jp.jpg");
  }
  return (
    <Link
      href={`/lecturers/${channelId}`}
      className="max-w group relative z-0 flex w-full grow cursor-pointer flex-col  overflow-hidden rounded-md
                 border-2 border-blue-950 bg-gray-900 pb-3 text-white shadow-lg transition-all duration-500
                 hover:z-10 hover:scale-105"
    >
      <div className=" relative aspect-[16/9] overflow-hidden rounded ">
        <PlayIconOverlay />
        <Image
          onError={handleImageError}
          className="mx-auto object-cover transition-transform 
                    duration-[1000ms] group-hover:brightness-110"
          src={imgSrc}
          layout="fill"
          // width={imageStyles[size].width}
          // height={imageStyles[size].height}
          alt="image"
        />
        <div className=" absolute bottom-0 right-0 z-50 h-1/3 w-full overflow-hidden ">
          <div className="absolute bottom-0 right-0 h-[300%] w-full">
            <Image
              onError={handleImageError}
              className="mx-auto w-1/2 object-cover transition-transform 
          duration-[1000ms] group-hover:brightness-110"
              src={imgSrc}
              layout="fill"
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className="px-2 pt-2">
        <h3 className="">{title}</h3>
      </div>
    </Link>
  );
}

export default Card;
