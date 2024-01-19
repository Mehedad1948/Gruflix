import Modal from "@/components/Modal";
import Bookmark from "@/components/atoms/icons/bookmark";
import { videoById } from "@/lib/videoById";
import { VideoData } from "@/models/videos";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  console.log({ video });

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
                  lg:grid-cols-[0.15fr,_0.7fr,_0.15fr] `}
    >
      <div></div>
      <div>
        <div className="relative">
          <iframe
            id="player"
            // type="text/html"
            className={`${
              theaterMode ? "!h-[80vh]" : ""
            } mx-auto aspect-[16/9] w-full rounded-md`}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&rel=1`}
            // frameborder="0"
          ></iframe>
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
            className="absolute bottom-16 left-2 w-6"
            checked={favourited === 1}
          />
        </div>
        <button onClick={() => setTheaterMode((s) => !s)}>theater</button>
        <p>{video.title}</p>
        <p>{video.description}</p>
      </div>

      <div className=""></div>
    </div>
  );
};

export default Video;
