import Modal from "@/components/Modal";
import Bookmark from "@/components/atoms/icons/bookmark";
import { videoById } from "@/lib/videoById";
import { VideoData } from "@/models/videos";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { videoId } = context.params as { videoId: string };

  const video = await videoById(videoId);

  return {
    props: {
      video,
    },
    revalidate: 40, // in seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos: string[] = [];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }: { video: VideoData }) => {
  const [theaterMode, setTheaterMode] = useState(false);
  const [favourited, setFavourited] = useState<0 | 1>(0);

  const router = useRouter();
  const { videoId } = router.query;
  // console.log({ video });

  const description = video.description.split("\n\n")[0].trim();

  // Extract links
  const links = video.description.match(/(https?:\/\/[^\s]+)/g) || [];

  // Extract timestamps
  const timestamps = video.description.match(/(\d+:\d+)/g) || [];

  function processPlainText(text: string) {
    const paragraphs = text
      .split("\n")
      .map((paragraph: string, index: number) => (
        <React.Fragment key={index}>
          <p>{paragraph}</p>
          {index < text.split("\n").length - 1 && <br />}{" "}
          {/* Add <br /> after each <p> except the last one */}
        </React.Fragment>
      ));

    return <div>{paragraphs}</div>;
  }

  useEffect(() => {
    if (!videoId) {
      return;
    }
    const getStats = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      const video = result.video;
      if (video) {
        setFavourited(video.favourited);
        if (!video.watched) {
          const response = await fetch("/api/stats", {
            method: "POST",
            body: JSON.stringify({
              videoId,
              favourited: video.favourited,
              watched: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resalt) => resalt.json())
            .then((data) => console.log({ data }));
        }
      } else {
        const response = await fetch("/api/stats", {
          method: "POST",
          body: JSON.stringify({
            videoId,
            favourited: 0,
            watched: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resalt) => resalt.json())
          .then((data) => console.log({ data }));
      }
    };
    getStats();
  }, [videoId]);

  return (
    <div
      className={`${
        theaterMode ? "!grid-cols-[0fr,_1fr,_0fr]" : ""
      } mt-16 grid w-full grid-cols-[0fr,_1fr,_0fr] items-center 
         lg:grid-cols-[0.175fr,_0.65fr,_0.175fr] transition-all duration-500 ease-out`}
    >
      <div></div>
      <div className="bg-slate-50 pb-6">
        <div className="relative bg-black shadow shadow-blue-400">
          <iframe
            id="player"
            // type="text/html"
            className={`${
              theaterMode ? "!h-[85vh]" : "w-full"
            } mx-auto aspect-[16/9] max-w-full rounded-sm sm:rounded-t-lg  `}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&rel=1`}
            // frameborder="0"
          ></iframe>
        </div>
        <div
          className={`${
            theaterMode ? "px-2 sm:px-6" : "px-2 sm:px-3"
          } relative  h-full`}
        >
          <div className="my-2 flex items-center gap-3">
            <Bookmark
              onClick={async () => {
                setFavourited((s) => (s === 0 ? 1 : 0));
                const response = await fetch("/api/stats", {
                  method: "POST",
                  body: JSON.stringify({
                    videoId,
                    favourited: favourited === 0 ? 1 : 0,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((resalt) => resalt.json())
                  .then((data) => {
                    if (!data.success) {
                      toast.error(data.error);
                      setTimeout(() => {
                        setFavourited(0);
                      }, 250);
                    }
                  });
              }}
              className=" w-6"
              checked={favourited === 1}
            />
            <button onClick={() => setTheaterMode((s) => !s)}>Theater</button>
          </div>

          <div className="relative mt-4  rounded-lg p-3  ring-1 ring-slate-950/10 sm:mt-6">
            <h3
              className="relative left-4 top-0 my-1 inline-block max-w-[95%]
            bg-slate-50 font-semibold  text-white 
            after:absolute after:-inset-1 after:z-0 after:block
            after:-skew-y-0 after:bg-gradient-to-tr after:from-fuchsia-600 after:to-sky-600 
              sm:my-3  sm:px-2 sm:text-lg lg:absolute after:rounded-full lg:-translate-y-full xl:text-xl"
            >
              <span className="relative z-10"> {video.title}</span>
            </h3>
            <p className="mt-4 text-slate-800 sm:ml-3 sm:font-semibold sm:leading-7">
              {description}
            </p>
            <div>
              <h4 className="mt-3 font-semibold">📋 Links and Resources:</h4>
              <ul
                className="my-2 flex w-fit flex-col  gap-3 rounded border border-blue-300
                       bg-blue-50 py-2 text-blue-800"
              >
                {links.map((link) => (
                  <Link
                    className="w-fit px-3 text-sm hover:text-blue-700 sm:text-base"
                    key={link}
                    href={link}
                  >
                    {link}
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* <p>{timestamps}</p> */}
          {/* <p>{processPlainText(video.description)}</p> */}
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};

export default Video;
