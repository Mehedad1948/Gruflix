import { error } from "console";
import { videoRequest } from "./videoRequest";

export async function getVideos(searchQuery: string) {
  const url = `/search?part=snippet&q=${searchQuery}&safeSearch=strict&chart=mostPopular&maxResults=10`;
  // const videos = await videoRequest(url);

  const videos = [
    {
      title:
        "Build a Mindblowing 3D Portfolio Website // Three.js Beginner’s Tutorial",
      imgUrl: "https://i.ytimg.com/vi/Q7AOvWpIVHU/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "Q7AOvWpIVHU",
    },
    {
      title: "How to Learn Three.js in 2023 ( Full Guide )",
      imgUrl: "https://i.ytimg.com/vi/Xu6oHc_20ow/hqdefault.jpg",
      channelId: "UCDaja1uwOZcPu9eehTSlXTA",
      id: "Xu6oHc_20ow",
    },
    {
      title: "Three JS Explained in 10 Minutes | What is ThreeJS",
      imgUrl: "https://i.ytimg.com/vi/ZiT2tN2eEro/hqdefault.jpg",
      channelId: "UC1mBXiJnLtiDHMtpga0Ugaw",
      id: "ZiT2tN2eEro",
    },
    {
      title: "[ PROJECT + SOURCE CODE ] Threejs Three Graces Design Concept",
      imgUrl: "https://i.ytimg.com/vi/79EpgV2D50I/hqdefault.jpg",
      channelId: "UCEZqgdPDnbpX9Ihbw_k4VUA",
      id: "79EpgV2D50I",
    },
    {
      title:
        "Build and Deploy an Amazing 3D Developer Portfolio in React with Three.js",
      imgUrl: "https://i.ytimg.com/vi/FkowOdMjvYo/hqdefault.jpg",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      id: "FkowOdMjvYo",
    },
    {
      title:
        "React 3D Animation Website Tutorial with ThreeJS (WebGi) &amp; GSAP",
      imgUrl: "https://i.ytimg.com/vi/IyBhFma4H1A/hqdefault.jpg",
      channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
      id: "IyBhFma4H1A",
    },
    {
      title: "Three.js explained in 100 seconds with example (2023)",
      imgUrl: "https://i.ytimg.com/vi/fNFkDc7WawQ/hqdefault.jpg",
      channelId: "UCQ_TmFbOkCyIfknGonSXEVQ",
      id: "fNFkDc7WawQ",
    },
    {
      title:
        "Build and Deploy an Amazing 3D Web Developer Portfolio in React JS | Beginner Three.js Tutorial",
      imgUrl: "https://i.ytimg.com/vi/0fYi8SGA20k/hqdefault.jpg",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      id: "0fYi8SGA20k",
    },
    {
      title: "Comprehensive Authentication Tutorial in Next.js 14",
      imgUrl: "https://i.ytimg.com/vi/Xa73Xr8PM2k/hqdefault.jpg",
      channelId: "UCTKSxERKbrpQOTa7QjDPjZg",
      id: "Xa73Xr8PM2k",
    },
    {
      title: "Three.js Tutorial For Absolute Beginners",
      imgUrl: "https://i.ytimg.com/vi/xJAfLdUgdc4/hqdefault.jpg",
      channelId: "UC1q2FdkcQ4qIxXzj3KQ1HYA",
      id: "xJAfLdUgdc4",
    },
  ];

  return videos;
}
