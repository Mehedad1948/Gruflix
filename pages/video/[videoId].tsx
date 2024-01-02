import Modal from "@/components/Modal";
import { videoById } from "@/lib/videoById";
import { VideoData } from "@/models/videos";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();
  const { videoId } = router.query;
  const [theaterMode, setTheaterMode] = useState(false);
  return (
    <div
      className={`${
        theaterMode ? "!grid-cols-[0fr,_1fr,_0fr]" : ""
      } mt-16 grid w-full grid-cols-[0fr,_1fr,_0fr] items-center 
                  lg:grid-cols-[0.15fr,_0.7fr,_0.15fr] `}
    >
      <div></div>
      <div>
        <iframe
          id="player"
          // type="text/html"
          className={`${
            theaterMode ? "!h-[80vh]" : ""
          } mx-auto aspect-[16/9] w-full rounded-md`}
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&rel=1`}
          // frameborder="0"
        ></iframe>
        <button onClick={() => setTheaterMode((s) => !s)}>theater</button>
        <p>{video.title}</p>
        <p>{video.description}</p>
      </div>

      <div className=""></div>
    </div>
  );
};

export default Video;
