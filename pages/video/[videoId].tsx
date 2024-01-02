import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { useState } from "react";

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const [theaterMode, setTheaterMode] = useState(false);
  return (
    <div className="mt-24 flex items-center flex-col">
      <iframe
        id="player"
        // type="text/html"
        width={theaterMode ? "100%" : "60%"}
        className="mx-auto aspect-[16/9] rounded-md"
        src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&rel=1`}
        // frameborder="0"
      ></iframe>
      <button onClick={() => setTheaterMode((s) => !s)}>theater</button>
      <div className=''>

      </div>
    </div>
  );
};

export default Video;
