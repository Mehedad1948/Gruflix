import Modal from "@/components/Modal";
import GradientBg from "@/components/atoms/gadient-bg";
import Bookmark from "@/components/atoms/icons/bookmark";
import Heart from "@/components/atoms/icons/heart";
import { videoById } from "@/lib/videoById";
import { VideoData } from "@/models/videos";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoEyeSharp } from "react-icons/io5";
import { NextPageWithLayout } from "../_app";
import Default from "@/components/layouts/default";
import VideoPage from "@/components/layouts/video-page";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { videoId } = context.params as { videoId: string };

  const video = (await videoById(videoId)) || null;

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

const Video: NextPageWithLayout = ({ video }: { video: VideoData }) => {
  const [theaterMode, setTheaterMode] = useState(false);
  const [favourited, setFavourited] = useState<0 | 1>(0);
  // console.log({ video });

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
    <>
      <Head>
        <title>{video.title}</title>
      </Head>

      <div
        className={`${
          theaterMode ? "sm:pb-4 !grid-cols-[0fr,_1fr,_0fr] " : "py-8  "
        }  grid w-full grid-cols-[0fr,_1fr,_0fr] items-center
      transition-[grid] duration-1000 ease-out lg:grid-cols-[0.1fr,_0.6fr,_0.3fr]`}
      >
        <div></div>
        <div
          className="overflow-hidden rounded-lg  bg-slate-50 pb-6 mx-1 sm:mx-0 
        shadow-emerald-100 border border-amber-200
         shadow-lg"
        >
          <div className="relative bg-black shadow shadow-blue-400">
            <iframe
              id="player"
              // type="text/html"
              className={`${
                theaterMode ? "sm:!h-[85vh]" : "w-full"
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
            <div className="my-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
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
                        console.log({ data });

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
                <button
                  className="sm:block hidden"
                  onClick={() => setTheaterMode((s) => !s)}
                >
                  Theater
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Heart className="mb-0.5 text-lg" />
                  {video.statistics.likeCount}
                  <span className="text-sm">likes</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <IoEyeSharp className="text-xl" />
                  {video.statistics.viewCount}
                  <span className="text-sm">views</span>
                </div>
              </div>
            </div>

            <div className="relative mt-3  rounded-lg   ">
              <h3
                className="relative  top-0 my-1 inline-block max-w-[95%]
               
            text-center  font-semibold after:absolute after:-inset-1
            after:z-0 after:block after:-skew-y-0 after:rounded-full  after:px-3 
             sm:text-left sm:text-lg  xl:text-xl"
              >
                <span
                  className="relative z-10 hero-text
                                 bg-clip-text text-transparent"
                >
                  {" "}
                  {video.title}
                </span>
              </h3>
              <p className="mt-1 text-slate-800  sm:font-semibold sm:leading-7">
                {description}
              </p>
              <div>
                <h4 className="mt-3 font-semibold">📋 Links and Resources:</h4>
                <ul
                  className="my-2 flex w-fit flex-col gap-1.5 sm:gap-3 rounded border border-orange-300
                       bg-orange-50/70 py-2 text-orange-800 max-w-full"
                >
                  {links.map((link) => (
                    <Link
                      className="w-fit px-3 text-sm hover:text-orange-700 sm:text-base"
                      key={link}
                      href={link}
                    >
                      {link}
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="mb-2"># Tags:</h4>
                <div className=" flex flex-wrap items-center gap-1.5 sm:gap-x-2 sm:gap-y-2.5 ">
                  {video.tags.map((tag) => (
                    <span key={tag}>
                      <span
                        className="rounded-full border bg-gradient-to-tr
                       from-orange-800/20 to-amber-500/10 px-3
                  py-1 text-xs sm:text-sm text-amber-800 "
                      >
                        {tag}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* <GradientBg /> */}
            </div>

            {/* <p>{timestamps}</p> */}
            {/* <p>{processPlainText(video.description)}</p> */}
          </div>
        </div>

        <div className=""></div>
      </div>
    </>
  );
};

Video.getLayout = function getLayout(page: ReactElement) {
  return <VideoPage>{page}</VideoPage>;
};

export default Video;
