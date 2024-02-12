import { ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
}

const VideoPage = ({ children }: Props) => {
  return (
    <div className=" frame bg-fixed  min-h-screen h-fit relative">
        <Navbar />
        {children}
        {/* <div className="w-64 aspect-square fixed z-0 top-1/3 left-1/3 frame rounded-full"></div>
              <div className="w-48 aspect-square opacity-80 fixed z-0 bottom-16 right-1/3 hero-text 
              rounded-full animate-pulse"></div> */}
        {/* <div className="fixed top-0 left-0 h-4 frame w-full z-50 bg-fixed"></div> */}
        {/* <div className="fixed bottom-0 left-0 h-4 frame w-full z-50 bg-fixed"></div> */}
    </div>
  );
};

export default VideoPage;
