import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "../atoms/spinner";
import { VideoData } from "@/models/videos";
import SectionCard from "../SectionCard";

const staticItems = [
  {
    title: "Vue.js",
    videos: [
      {
        title: "Vue.js Explained in 100 Seconds",
        imgUrl: "https://i.ytimg.com/vi/nhBVL41-_Cw/hqdefault.jpg",
        channelId: "UCsBjURrPoezykLs9EqgamOA",
        id: "nhBVL41-_Cw",
        description:
          "What is Vue.js? Learn the basics of Vue and build your first reactive UI component in just 100 seconds ...",
        publishedAt: "2020-04-03T16:50:03Z",
        channelTitle: "Fireship",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Vue.js 3 Tutorial",
        imgUrl: "https://i.ytimg.com/vi/YrxBCBibVo0/hqdefault.jpg",
        channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
        id: 'YrxBCBibVo0',
        description: "",
        publishedAt: "2020-12-02T07:33:14Z",
        channelTitle: "Net Ninja",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Vue JS Crash Course",
        imgUrl: "https://i.ytimg.com/vi/qZXt1Aom3Cs/hqdefault.jpg",
        channelId: "UC29ju8bIPH5as8OGnQzwJyA",
        id: "qZXt1Aom3Cs",
        description:
          "Learn the fundamentals of Vue JS (v3) in this project-based crash course Task Tracker: ...",
        publishedAt: "2021-02-24T16:36:53Z",
        channelTitle: "Traversy Media",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Vue.js Course for Beginners [2021 Tutorial]",
        imgUrl: "https://i.ytimg.com/vi/FXpIoQ_rT_c/hqdefault.jpg",
        channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
        id: "FXpIoQ_rT_c",
        description:
          "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building ...",
        publishedAt: "2021-09-07T12:58:33Z",
        channelTitle: "freeCodeCamp.org",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Vue JS 3 Tutorial for Beginners",
        imgUrl: "https://i.ytimg.com/vi/ccsz9FRy-nk/hqdefault.jpg",
        channelId: "UC80PWRj_ZU8Zu0HSMNVwKWw",
        id: 'ccsz9FRy-nk',
        description:
          "Vue JS is a popular javascript framework for building user interfaces. The core Vue library is focussed on doing one thing and ...",
        publishedAt: "2020-12-11T17:30:29Z",
        channelTitle: "Codevolution",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title:
          "Vue JS Tutorial für Anfänger: Lerne Vue JS in 60 Minuten (deutsch)",
        imgUrl: "https://i.ytimg.com/vi/UDWfize-zIE/hqdefault.jpg",
        channelId: "UCp3qCNTjy-UZy7HbTpZqR4w",
        id: "UDWfize-zIE",
        description: "Kostenloses Beratungsgespräch: ...",
        publishedAt: "2023-12-23T17:00:18Z",
        channelTitle: "Programmieren lernen",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "What is Vue.js? | Vue.js Explained in 2 Minutes For BEGINNERS.",
        imgUrl: "https://i.ytimg.com/vi/53kB0GKAd2k/hqdefault.jpg",
        channelId: "UCt7T2EvYBqvlxNU3fbE4Y7g",
        id: "53kB0GKAd2k",
        description:
          "What is Vue? What is Vue used for? Why should you learn this JavaScript framework? We'll get you caught up in under 2 minutes.",
        publishedAt: "2022-10-13T15:00:03Z",
        channelTitle: "Zero To Mastery",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Vue.js Tutorial: Beginner to Front-End Developer",
        imgUrl: "https://i.ytimg.com/vi/1GNsWa_EZdw/hqdefault.jpg",
        channelId: "UC8lxnUR_CzruT2KA6cb7p0Q",
        id: "1GNsWa_EZdw",
        description:
          "In this comprehensive course, Jeremy McPeak will teach you the fundamental concepts you need to start building applications ...",
        publishedAt: "2023-01-25T16:00:11Z",
        channelTitle: "Envato Tuts+",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Are You Following This Vue Best Practice?",
        imgUrl: "https://i.ytimg.com/vi/S2wj8VX9O0M/hqdefault.jpg",
        channelId: "UCgmcPHueYRarnCkihtNIRlw",
        id: "S2wj8VX9O0M",
        description:
          "Prop stability is an important concept in Vue. By eliminating unnecessary updates, we can improve the performance of our app.",
        publishedAt: "2022-04-20T12:00:26Z",
        channelTitle: "LearnVue",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      // {
      //   title: "Vue Mastery",
      //   imgUrl:
      //     "https://yt3.ggpht.com/ytc/AIf8zZQFHUHzg9Q0PiolF2H3ktkKqPA8xPZT1xCnFWjI=s800-c-k-c0xffffffff-no-rj-mo",
      //   channelId: "UCa1zuotKU4Weuw_fLRnPv0A",
      //   id: '385',
      //   description:
      //     "Vue Mastery is the ultimate learning resource for Vue.js developers. We release content weekly to deliver you fresh lessons and ...",
      //   publishedAt: "2017-01-11T05:47:01Z",
      //   channelTitle: "Vue Mastery",
      //   tags: [],
      //   statistics: {
      //     viewCount: 0,
      //     likeCount: 0,
      //     commentCount: 0,
      //   },
      // },
    ],
  },
  {
    title: "Nuxt.js",
    videos: [
      {
        title: "Nuxt in 100 Seconds",
        imgUrl: "https://i.ytimg.com/vi/dCxSsr5xuL8/hqdefault.jpg",
        channelId: "UCsBjURrPoezykLs9EqgamOA",
        id: "dCxSsr5xuL8",
        description:
          "Nuxt is a full-stack JavaScript framework based on Vue.js that provides server-side rendering, data fetching, state management, ...",
        publishedAt: "2023-06-13T14:16:21Z",
        channelTitle: "Fireship",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Nuxt 3 Tutorial",
        imgUrl: "https://i.ytimg.com/vi/GBdO5myZNsQ/hqdefault.jpg",
        channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
        id: '805',
        description: "",
        publishedAt: "2022-10-31T09:40:18Z",
        channelTitle: "Net Ninja",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "The Nuxt big thing in web development?",
        imgUrl: "https://i.ytimg.com/vi/noq-ZHTD2Cg/hqdefault.jpg",
        channelId: "UCsBjURrPoezykLs9EqgamOA",
        id: "noq-ZHTD2Cg",
        description:
          "Nuxt3, an SSR framework for Vue, just hit release candidate last week. Let's take a first look at its most powerful features and ...",
        publishedAt: "2022-04-25T16:02:29Z",
        channelTitle: "Fireship",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Nuxt 3 — Course for Beginners",
        imgUrl: "https://i.ytimg.com/vi/fTPCKnZZ2dk/hqdefault.jpg",
        channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
        id: "fTPCKnZZ2dk",
        description:
          "Learn how to use Next 3 in this full tutorial for beginners. Nuxt.js is a progressive JavaScript framework for building user interfaces ...",
        publishedAt: "2023-09-26T14:19:39Z",
        channelTitle: "freeCodeCamp.org",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Nuxt JS Crash Course",
        imgUrl: "https://i.ytimg.com/vi/ltzlhAxJr74/hqdefault.jpg",
        channelId: "UC29ju8bIPH5as8OGnQzwJyA",
        id: "ltzlhAxJr74",
        description:
          "In this video we will look at Vue.js server side rendering with Nuxt.js. We will build a dadjokes app. This requires at least minimal ...",
        publishedAt: "2019-05-01T17:31:26Z",
        channelTitle: "Traversy Media",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "The Nuxt Video",
        imgUrl: "https://i.ytimg.com/vi/xv9m3XZgV7I/hqdefault.jpg",
        channelId: "UCXzw-OdotBUcNA9yhuYQBwA",
        id: "xv9m3XZgV7I",
        description:
          "A quick look at NuxtJS. Topics: - VueJS Meta Framework; - Advantages of Nuxt; - What is the Composition API; - Tailsind CSS ...",
        publishedAt: "2023-08-11T20:53:01Z",
        channelTitle: "Awesome",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title:
          "Nuxt.js (O Melhor Companheiro do Vue.js) // Dicionário do Programador",
        imgUrl: "https://i.ytimg.com/vi/l2y8oYqNV8I/hqdefault.jpg",
        channelId: "UCFuIUoyHB12qpYa8Jpxoxow",
        id: "l2y8oYqNV8I",
        description:
          "HOSTGATOR → https://codft.me/HGl2y8oYqNV8I Muito mais que um outro framework JavaScript da moda, o Nuxt.js é o ...",
        publishedAt: "2021-07-05T13:45:04Z",
        channelTitle: "Código Fonte TV",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Nuxt 3 Crash Course #1 - What is Nuxt?",
        imgUrl: "https://i.ytimg.com/vi/GBdO5myZNsQ/hqdefault.jpg",
        channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
        id: "GBdO5myZNsQ",
        description:
          "In this Nuxt 3 crash course, you'll learn what Nuxt is & how to use it to make web applications with Vue. In this lesson, I'll talk about ...",
        publishedAt: "2022-10-31T09:51:10Z",
        channelTitle: "Net Ninja",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Output Parser in LangChain Javascript",
        imgUrl: "https://i.ytimg.com/vi/y0767WUU4ZM/hqdefault.jpg",
        channelId: "UCc5FkTYiWH5L3Gk5IyW6Rmw",
        id: "y0767WUU4ZM",
        description: "Output Parser in LangChain Javascript LangChain JS ...",
        publishedAt: "2024-02-11T05:42:18Z",
        channelTitle: "Geeky Shows",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "My 5 Favorite Nuxt Features",
        imgUrl: "https://i.ytimg.com/vi/NXTQbU7WmDk/hqdefault.jpg",
        channelId: "UCgmcPHueYRarnCkihtNIRlw",
        id: "NXTQbU7WmDk",
        description:
          "GO CHECK OUT THE SECOND HALF OF THIS VIDEO OVER ON FULLSTACK JACK: https://youtu.be/Tqe2KS9NuRY ✓ Join the ...",
        publishedAt: "2022-12-19T17:00:20Z",
        channelTitle: "LearnVue",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
    ],
  },
  {
    title: "Node.js",
    videos: [
      {
        title: "Node.js Crash Course Tutorial",
        imgUrl: "https://i.ytimg.com/vi/zb3Qk8SG5Ms/hqdefault.jpg",
        channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
        id: 'zb3Qk8SG5Ms',
        description:
          "Hey gang, in this Node.js tutorial series you'll learn node from the ground up - what it is, how to use it and how to make dynamic ...",
        publishedAt: "2020-06-15T07:22:00Z",
        channelTitle: "Net Ninja",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Node.js Ultimate Beginner’s Guide in 7 Easy Steps",
        imgUrl: "https://i.ytimg.com/vi/ENrzD9HAZK4/hqdefault.jpg",
        channelId: "UCsBjURrPoezykLs9EqgamOA",
        id: "ENrzD9HAZK4",
        description:
          "Why learn Node.js in 2020? Master the fundamentals of Node in 7 easy steps, then build a fullstack web app and deploy it to a ...",
        publishedAt: "2020-05-21T17:16:56Z",
        channelTitle: "Fireship",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Node.js and Express.js - Full Course",
        imgUrl: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
        channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
        id: "Oe421EPjeBE",
        description:
          "Learn how to use Node and Express in this comprehensive course. First, you will learn the fundamentals of Node and Express.",
        publishedAt: "2021-04-01T12:37:58Z",
        channelTitle: "freeCodeCamp.org",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
        imgUrl: "https://i.ytimg.com/vi/TlB_eWDSMt4/hqdefault.jpg",
        channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
        id: "TlB_eWDSMt4",
        description:
          "Node.js Tutorial for Beginners: Learn Node in 1 Hour Get the complete Node course: http://bit.ly/2NfkpOC Subscribe for more ...",
        publishedAt: "2018-02-21T23:57:12Z",
        channelTitle: "Programming with Mosh",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "What is Node js? | Simplified Explanation",
        imgUrl: "https://i.ytimg.com/vi/yEHCfRWz-EI/hqdefault.jpg",
        channelId: "UC59K-uG2A5ogwIrHw4bmlEg",
        id: "yEHCfRWz-EI",
        description:
          "Java Simplified LiveCourse : https://bit.ly/java-pro-telusko Advance Java with Spring Boot Live Course ...",
        publishedAt: "2020-04-20T15:57:01Z",
        channelTitle: "Telusko",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Node.js is a serious thing now… (2023)",
        imgUrl: "https://i.ytimg.com/vi/_Im4_3Z1NxQ/hqdefault.jpg",
        channelId: "UCX2U8kCH2EzKSeaTIJBtkkQ",
        id: "_Im4_3Z1NxQ",
        description:
          "Javascript is single-threaded, so we normally have to do weird tricks to have Node.js fully utilize multicore CPUs. With worker ...",
        publishedAt: "2023-05-29T15:48:03Z",
        channelTitle: "Code With Ryan",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Was ist Node.js? Einfach erklärt!",
        imgUrl: "https://i.ytimg.com/vi/_Vmp6coPavw/hqdefault.jpg",
        channelId: "UCp3qCNTjy-UZy7HbTpZqR4w",
        id: "_Vmp6coPavw",
        description:
          "Du willst Programmierer werden? Informiere dich auf: https://weiterbildung.developerakademie.com/y Mit Node.js kannst du einen ...",
        publishedAt: "2020-07-06T12:00:08Z",
        channelTitle: "Programmieren lernen",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Node.js: The Documentary [OFFICIAL TRAILER]",
        imgUrl: "https://i.ytimg.com/vi/SfWPqr04srM/hqdefault.jpg",
        channelId: "UCsUalyRg43M8D60mtHe6YcA",
        id: "SfWPqr04srM",
        description:
          "Back in the 2000s, websites looked quite different. They were less dynamic, didn't permit much interaction, and JavaScript was ...",
        publishedAt: "2024-02-08T14:01:36Z",
        channelTitle: "Honeypot",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Retrieve Root Directory in Node.js",
        imgUrl: "https://i.ytimg.com/vi/lAkIiwIF0ek/hqdefault.jpg",
        channelId: "UCzFkbKNrzBRTAauZvpHNWCg",
        id: "lAkIiwIF0ek",
        description:
          "Retrieving the root directory of your project in Node.js. No matter where your script is executed from, this method ensures correct ...",
        publishedAt: "2024-02-11T15:20:00Z",
        channelTitle: "Aleksander Roztropiński",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
      {
        title: "Node.js Crash Course",
        imgUrl: "https://i.ytimg.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
        channelId: "UC29ju8bIPH5as8OGnQzwJyA",
        id: "fBNz5xF-Kx4",
        description:
          "In this crash course we will explore Node.js fundamentals including modules such as path, url, fs, events and we will create an ...",
        publishedAt: "2019-02-06T20:10:58Z",
        channelTitle: "Traversy Media",
        tags: [],
        statistics: {
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
        },
      },
    ],
  },
  // {
  //   title: "Websocket",
  //   videos: [],
  // },
];

type ItemType = {
  title: string;
  videos: VideoData[];
};

export function LoadMore() {
  const [item, setItem] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  const loadMoreBeers = async () => {
    // Once the page 8 is reached repeat the process all over again.
    setIsLoading(true);
    // const vueVideos = await getVideos("Vue js");
    // const nuxtVideos = await getVideos("Nuxt js");
    // const nodeVideos = await getVideos("Node js");
    // const websocketVideos = await getVideos("websocket");
    // setItem([
    //   { title: "Vue.js", videos: vueVideos },
    //   { title: "Nuxt.js", videos: nuxtVideos },
    //   { title: "Node.js", videos: nodeVideos },
    //   { title: "Websocket", videos: websocketVideos },
    // ]);

    //  For Economic request valume
    setTimeout(() => {
      setItem(staticItems);
      setIsLoading(false);
    }, 1500);
  };
  // console.log({ item });

  useEffect(() => {}, []);

  useEffect(() => {
    if (inView) {
      // console.log("in View");

      loadMoreBeers();
    }
  }, [inView]);

  return (
    <>
      {item.length > 0
        ? item.map((part) => (
            <SectionCard
              key={part.title}
              title={part.title}
              // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
              videos={part.videos}
              size="large"
            />
          ))
        : isLoading && (
            <div className="flex items-center justify-center my-4">
              {" "}
              <Spinner />
            </div>
          )}
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      ></div>
    </>
  );
}
