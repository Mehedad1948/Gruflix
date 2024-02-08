import { error } from "console";
import { videoRequest } from "./videoRequest";

export async function getVideos(searchQuery: string) {
  const url = `/search?part=snippet&q=${searchQuery}&safeSearch=strict&chart=mostPopular&maxResults=10`;
  //   const videos = await videoRequest(url);
  // console.log({ videos });

  const videos = [
    {
      title: "Tailwind CSS Tutorial",
      imgUrl: "https://i.ytimg.com/vi/bxmDnn7lrnk/hqdefault.jpg",
      channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
      id: 687,
      description: "",
      publishedAt: "2020-07-06T07:23:27Z",
      channelTitle: "Net Ninja",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Tailwind in 100 Seconds",
      imgUrl: "https://i.ytimg.com/vi/mr15Xzb1Ook/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "mr15Xzb1Ook",
      description:
        "Tailwind is a utility-first CSS framework for building websites. It takes a functional approach to web design by providing thousands ...",
      publishedAt: "2021-08-26T16:07:49Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Tailwind Labs",
      imgUrl:
        "https://yt3.ggpht.com/ikv41jMTr1uHGdILrJhvbfVJcDt4oqhwApKX37TjAleF_cRPbF2W-waj7uMnS5JySvnlvAlTCg=s800-c-k-c0xffffffff-no-rj-mo",
      channelId: "UCOe-8z68tgw9ioqVvYM4ddQ",
      id: 440,
      description:
        "We're a small team of developers and designers spread out all across the world, building tools that help other developers build ...",
      publishedAt: "2020-09-22T23:47:58Z",
      channelTitle: "Tailwind Labs",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Learn Tailwind CSS – Course for Beginners",
      imgUrl: "https://i.ytimg.com/vi/ft30zcMlFao/hqdefault.jpg",
      channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
      id: "ft30zcMlFao",
      description:
        "This course will give you a full introduction into all of the core concepts of Tailwind CSS — it will also provide details on every ...",
      publishedAt: "2023-01-17T16:56:57Z",
      channelTitle: "freeCodeCamp.org",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Tailwind CSS is the worst…",
      imgUrl: "https://i.ytimg.com/vi/lHZwlzOUOZ4/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "lHZwlzOUOZ4",
      description:
        "People have been debating the merits of Tailwind on twitter recently, so let's look at the pros and cons of this popular CSS library.",
      publishedAt: "2023-01-16T18:34:07Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title:
        "Ultimate Tailwind CSS Tutorial // Build a Discord-inspired Animated Navbar",
      imgUrl: "https://i.ytimg.com/vi/pfaSUYaSgRo/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "pfaSUYaSgRo",
      description:
        "Learn the basics of Tailwind CSS by building a Discord-inspired navbar from scratch. Learn how to leverage utility classes to build ...",
      publishedAt: "2021-10-19T16:01:06Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Corso Tailwind CSS Italiano 2023",
      imgUrl: "https://i.ytimg.com/vi/y2UDe_Suk5Y/hqdefault.jpg",
      channelId: "UC0L-hCq_zb0ZX8JJ3c6D_wA",
      id: 697,
      description:
        "In questo corso di tailwind css vedremo il framework css più in crescita ed apprezzato negli ultimi anni. Vedremo come funziona ...",
      publishedAt: "2022-11-03T07:08:28Z",
      channelTitle: "Edoardo Midali",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Tailwind Connect 2023 — Keynote",
      imgUrl: "https://i.ytimg.com/vi/CLkxRnRQtDE/hqdefault.jpg",
      channelId: "UCOe-8z68tgw9ioqVvYM4ddQ",
      id: "CLkxRnRQtDE",
      description:
        "The keynote from Tailwind Connect 2023, our first-ever live event that took place on June 20th, 2023, featuring presentations from ...",
      publishedAt: "2023-07-06T14:39:36Z",
      channelTitle: "Tailwind Labs",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Tailwind Crash Course | Project From Scratch",
      imgUrl: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
      channelId: "UC29ju8bIPH5as8OGnQzwJyA",
      id: "dFgzHOX84xQ",
      description:
        "In this video, we will set up Tailwind CLI and create a landing page from start to finish, going over many of the common utility ...",
      publishedAt: "2022-04-05T13:00:20Z",
      channelTitle: "Traversy Media",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
    {
      title: "Watching Tailwind Tutorials Is A Waste Of Time",
      imgUrl: "https://i.ytimg.com/vi/Ksn1tThNTjI/hqdefault.jpg",
      channelId: "UCFbNIlppjAuEX4znoulh0Cw",
      id: "Ksn1tThNTjI",
      description:
        "Learn CSS Today Course: https://courses.webdevsimplified.com/learn-css-today I love Tailwind. It is one of (if not) my favorite ...",
      publishedAt: "2023-04-25T16:00:12Z",
      channelTitle: "Web Dev Simplified",
      tags: [],
      statistics: {
        viewCount: Math.floor(Math.random() * 5000),
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 5000),
      },
    },
  ];

  return videos;
}
