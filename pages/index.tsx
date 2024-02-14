import Head from "next/head";
import useColorMode from "@/hooks/useColorMode";
import Banner from "@/components/Banner";
import SectionCard from "@/components/SectionCard";
import { getVideos } from "@/lib/video";
import { queryHasuraGQL } from "@/lib/db/hasura";
import { ReactElement, useEffect, useState } from "react";
import { watchedVideos } from "@/lib/watchedVideos";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
} from "next";
import { VideoData } from "@/models/videos";
import { verifyToken } from "@/lib/utils/verifiyToken";
import Slider from "@/components/Slider";
import { NextPageWithLayout } from "./_app";
import Default from "@/components/layouts/default";
import { LoadMore } from "@/components/molecules/load-more";
import { getSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const staticValues = {
  reactVideos: [
    {
      title: "ReactJS Course For Beginners 2023",
      imgUrl: "https://i.ytimg.com/vi/U2Wltnv-doo/hqdefault.jpg",
      channelId: "UC8S4rDRZn6Z_StJ-hh7ph8g",
      id: 398,
      description:
        "In this course you will learn everything you need to know to go from a beginner react developer to an advanced one. Course ...",
      publishedAt: "2022-07-11T05:16:23Z",
      channelTitle: "PedroTech",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]",
      imgUrl: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
      channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
      id: "bMknfKXIFA8",
      description:
        "Learn React by building eight real-world projects and solving 140+ coding challenges. You can also follow this course ...",
      publishedAt: "2022-01-10T14:47:57Z",
      channelTitle: "freeCodeCamp.org",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "5 Best FREE React Online Courses",
      imgUrl: "https://i.ytimg.com/vi/13PRKOCJg_Y/hqdefault.jpg",
      channelId: "UCVyTG4sCw-rOvB9oHkzZD1w",
      id: "13PRKOCJg_Y",
      description:
        "Start learning today! For more #webdesign & #development resources: ➢ Visit Creative Tim Courses: https://bit.ly/3s4llfw ...",
      publishedAt: "2022-12-14T22:00:00Z",
      channelTitle: "Creative Tim Tutorials",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Complete React course with projects | part 1",
      imgUrl: "https://i.ytimg.com/vi/FxgM9k1rg0Q/hqdefault.jpg",
      channelId: "UCNQ6FEtztATuaVhZKCY28Yw",
      id: "FxgM9k1rg0Q",
      description:
        "00:00:00 React Roadmap 00:30:17 Create React Projects 01:05:32 Understand the react flow and structure 01:41:30 Create your ...",
      publishedAt: "2023-09-11T13:30:08Z",
      channelTitle: "Chai aur Code",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "React Tutorial for Beginners",
      imgUrl: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg",
      channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
      id: "SqcY0GlETPk",
      description:
        "React JS Tutorial for Beginners - Learn React 18 with TypeScript and build awesome frontend app! - Want to learn more? Get my ...",
      publishedAt: "2023-03-12T08:00:07Z",
      channelTitle: "Programming with Mosh",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "How I Would Learn React From Scratch In 2023",
      imgUrl: "https://i.ytimg.com/vi/a7YYJVGBy6A/hqdefault.jpg",
      channelId: "UCFbNIlppjAuEX4znoulh0Cw",
      id: "a7YYJVGBy6A",
      description: "React Simplified Course: ...",
      publishedAt: "2023-08-01T16:00:01Z",
      channelTitle: "Web Dev Simplified",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "99% React Courses Miss These Essential Real-World Skills | Tanay Pratap Hindi",
      imgUrl: "https://i.ytimg.com/vi/cTXn8VsgzTM/hqdefault.jpg",
      channelId: "UCNFmBuclxQPe57orKiQbyfA",
      id: "cTXn8VsgzTM",
      description:
        "Meetup link: https://lu.ma/tanaypratap Discover the crucial skills that most React courses overlook and learn how to differentiate ...",
      publishedAt: "2023-05-14T14:30:11Z",
      channelTitle: "Tanay Pratap",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "ReactJS Tutorial for Beginners",
      imgUrl: "https://i.ytimg.com/vi/QFaFIcGhPoM/hqdefault.jpg",
      channelId: "UC80PWRj_ZU8Zu0HSMNVwKWw",
      id: 534,
      description:
        "React is an open source javascript library for building user interfaces. React is a project created and maintained by Facebook.",
      publishedAt: "2018-10-29T12:01:47Z",
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
        "React JS Full Course 2023 | Build an App and Master React in 1 Hour",
      imgUrl: "https://i.ytimg.com/vi/b9eMGE7QtTk/hqdefault.jpg",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      id: "b9eMGE7QtTk",
      description:
        "After building this simple, half-hour movie application, imagine what a long and comprehensive 20-hour Next.js course would look ...",
      publishedAt: "2022-03-04T11:06:59Z",
      channelTitle: "JavaScript Mastery",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "How to learn ReactJS in 30 Days 👩‍💻 #technology #programming #software #react #career",
      imgUrl: "https://i.ytimg.com/vi/m1_ppy3HOEU/hqdefault.jpg",
      channelId: "UCWI-ohtRu8eEeDj93hmUsUQ",
      id: "m1_ppy3HOEU",
      description: "",
      publishedAt: "2022-05-27T17:04:51Z",
      channelTitle: "Coding with Lewis",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
  ],
  nextjsVideos: [
    {
      title: "Next.js 14 Tutorial",
      imgUrl: "https://i.ytimg.com/vi/ZjAqacIC_3c/hqdefault.jpg",
      channelId: "UC80PWRj_ZU8Zu0HSMNVwKWw",
      id: 421,
      description:
        "Welcome to a new series on mastering Next.js, the React framework that's transforming web development! Are you ready to take ...",
      publishedAt: "2023-11-06T13:38:29Z",
      channelTitle: "Codevolution",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Next.js in 100 Seconds // Plus Full Beginner&#39;s Tutorial",
      imgUrl: "https://i.ytimg.com/vi/Sklc_fQBmcs/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "Sklc_fQBmcs",
      description:
        "Learn the basics of Next.js in 100 Seconds! Then build your first server-rendered react app with a full Next.js beginner's tutorial.",
      publishedAt: "2021-01-05T17:33:17Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Next.js 13… this changes everything",
      imgUrl: "https://i.ytimg.com/vi/_w0Ikk4JY7U/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "_w0Ikk4JY7U",
      description:
        "Next.js version 13 was announced yesterday and it brings huge changes to the framework. They collaborated directly with the ...",
      publishedAt: "2022-10-26T17:01:30Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Next.js 13 - The Basics",
      imgUrl: "https://i.ytimg.com/vi/__mSgDEOyv8/hqdefault.jpg",
      channelId: "UC2Xd-TjJByJyK2w1zNwY0zQ",
      id: "__mSgDEOyv8",
      description:
        "Learn about all the new features in Next.js version 13 with a full tutorial. We build a beginner-friendly CRUD app from scratch ...",
      publishedAt: "2022-11-01T19:59:20Z",
      channelTitle: "Beyond Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "Next js Tutorial for Beginners | Nextjs 13 (App Router) with TypeScript",
      imgUrl: "https://i.ytimg.com/vi/ZVnjOPwW4ZA/hqdefault.jpg",
      channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
      id: "ZVnjOPwW4ZA",
      description:
        "Next js 13 Tutorial for Beginners - Learn Nextjs 13 (App Router) with TypeScript and build awesome full-stack apps! - Want to ...",
      publishedAt: "2023-09-11T13:00:10Z",
      channelTitle: "Programming with Mosh",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "Next.js 14 Full Course 2024 | Build and Deploy a Full Stack App Using the Official React Framework",
      imgUrl: "https://i.ytimg.com/vi/wm5gMKuwSYk/hqdefault.jpg",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      id: "wm5gMKuwSYk",
      description:
        "Ultimate Next 14 Course: https://www.jsmastery.pro/next14 Next.js recently became the official React framework as outlined in ...",
      publishedAt: "2023-05-05T13:23:15Z",
      channelTitle: "JavaScript Mastery",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Next.js Tutorial for Beginners",
      imgUrl: "https://i.ytimg.com/vi/9P8mASSREYM/hqdefault.jpg",
      channelId: "UC80PWRj_ZU8Zu0HSMNVwKWw",
      id: 67,
      description:
        "Next.js is a react framework for production. Next.js gives you the best developer experience with all the features you need for ...",
      publishedAt: "2021-06-21T12:24:53Z",
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
        "Build a Modern Analytics Dashboard with Next.js 14, React, Tailwind - 2024",
      imgUrl: "https://i.ytimg.com/vi/MGjCIQh5Pkw/hqdefault.jpg",
      channelId: "UCvGwM5woTl13I-qThI4YMCg",
      id: "MGjCIQh5Pkw",
      description:
        "So I've always been a fan of beautiful dashboards, and what better way to build one together than building an analytics system for ...",
      publishedAt: "2024-02-11T17:15:00Z",
      channelTitle: "Josh tried coding",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "Next.js 14 App Router CRASH COURSE - Learn about Server Components and Next.js App Router",
      imgUrl: "https://i.ytimg.com/vi/VL7cCTfFRGs/hqdefault.jpg",
      channelId: "UC3UrEDB27fL3vbnt-tiMgoQ",
      id: "VL7cCTfFRGs",
      description:
        "Hello guys! Welcome to the Next.js 14 App Router crash course! In this crash course we will take a deep dive into Next.js 14 app ...",
      publishedAt: "2024-02-11T13:45:44Z",
      channelTitle: "Atharva Deosthale",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "NextJS Tutorial - All 12 Concepts You Need to Know",
      imgUrl: "https://i.ytimg.com/vi/vwSlYG7hFk0/hqdefault.jpg",
      channelId: "UCf6AGqO98eGk11nfazociVQ",
      id: "vwSlYG7hFk0",
      description:
        "Learn Next.js quickly... Also check out Hostinger's Black Friday deal at https://hostinger.com/bytegrad with discount code ...",
      publishedAt: "2023-11-15T14:10:17Z",
      channelTitle: "ByteGrad",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
  ],
  threejsVideos: [
    {
      title:
        "Build a Mindblowing 3D Portfolio Website // Three.js Beginner’s Tutorial",
      imgUrl: "https://i.ytimg.com/vi/Q7AOvWpIVHU/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "Q7AOvWpIVHU",
      description:
        "Learn the basics of Three.js - a tool for building amazing 3D graphics with JavaScript. In this tutorial, we create an animated 3D ...",
      publishedAt: "2021-05-21T16:36:40Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Three.js Tutorials",
      imgUrl: "https://i.ytimg.com/vi/xJAfLdUgdc4/hqdefault.jpg",
      channelId: "UC1q2FdkcQ4qIxXzj3KQ1HYA",
      id: 700,
      description: "",
      publishedAt: "2021-11-03T16:23:42Z",
      channelTitle: "Wael Yasmina",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "How to Learn Three.js in 2023 ( Full Guide )",
      imgUrl: "https://i.ytimg.com/vi/Xu6oHc_20ow/hqdefault.jpg",
      channelId: "UCDaja1uwOZcPu9eehTSlXTA",
      id: "Xu6oHc_20ow",
      description:
        "In this video we'll talk about the general Three.js Roadmap. You can find a technical roadmap in the pinned comment down below ...",
      publishedAt: "2023-04-13T19:37:49Z",
      channelTitle: "Visionary 3D",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Курс по three.js",
      imgUrl: "https://i.ytimg.com/vi/UJjzYK5pRcs/hqdefault.jpg",
      channelId: "UCQNqBFzal8nbmO7Y6TdRqXQ",
      id: 727,
      description:
        "Приветствуем вас в видео-курсе по началу работы с three.js. Здесь вы получите основы для начала своего приключения с ...",
      publishedAt: "2023-05-14T18:43:31Z",
      channelTitle: "Web Dev Sandbox",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Three.js explained in 100 seconds with example (2023)",
      imgUrl: "https://i.ytimg.com/vi/fNFkDc7WawQ/hqdefault.jpg",
      channelId: "UCQ_TmFbOkCyIfknGonSXEVQ",
      id: "fNFkDc7WawQ",
      description:
        "Dive into the basics of Three.js, a powerful JavaScript library for creating stunning 3D graphics on the web. Follow along as we ...",
      publishedAt: "2023-04-25T20:50:31Z",
      channelTitle: "xplodivity",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "Build and Deploy an Amazing 3D Developer Portfolio in React with Three.js",
      imgUrl: "https://i.ytimg.com/vi/FkowOdMjvYo/hqdefault.jpg",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      id: "FkowOdMjvYo",
      description:
        "Let's build a cool 3D website together! You'll learn how to make a portfolio with fun interactive parts, like a floating island and a fox ...",
      publishedAt: "2023-11-10T15:47:40Z",
      channelTitle: "JavaScript Mastery",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Three.js Optimization - Best Practices and Techniques",
      imgUrl: "https://i.ytimg.com/vi/dc5iJVInpPY/hqdefault.jpg",
      channelId: "UC5nZ3FYQEdR6rwQ9jQdpB1A",
      id: "dc5iJVInpPY",
      description:
        "Are you struggling to get your Three.js scenes running smoothly? Performance optimization can be a daunting task, but in this ...",
      publishedAt: "2023-04-18T06:30:10Z",
      channelTitle: "Valentin's coding book",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Three JS Explained in 10 Minutes | What is ThreeJS",
      imgUrl: "https://i.ytimg.com/vi/ZiT2tN2eEro/hqdefault.jpg",
      channelId: "UC1mBXiJnLtiDHMtpga0Ugaw",
      id: "ZiT2tN2eEro",
      description:
        "Three JS Explained in 10 Minutes | What is ThreeJS Rendering 3D graphics in-browser is a task that has plagued web developers ...",
      publishedAt: "2021-09-21T16:45:32Z",
      channelTitle: "Kofi Group",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title:
        "Build and Deploy an Amazing 3D Web Developer Portfolio in React JS | Beginner Three.js Tutorial",
      imgUrl: "https://i.ytimg.com/vi/0fYi8SGA20k/hqdefault.jpg",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      id: "0fYi8SGA20k",
      description:
        "The most impressive websites in the world use 3D graphics and animations to bring their content to life. Learn how to build your ...",
      publishedAt: "2023-03-03T11:04:36Z",
      channelTitle: "JavaScript Mastery",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Three.js Tutorial For Absolute Beginners",
      imgUrl: "https://i.ytimg.com/vi/xJAfLdUgdc4/hqdefault.jpg",
      channelId: "UC1q2FdkcQ4qIxXzj3KQ1HYA",
      id: "xJAfLdUgdc4",
      description:
        "This tutorial covers the basics of the 3D library Three.js. --- Timestamps 00:00 Introduction 00:44 Setting up 04:07 Coordinate ...",
      publishedAt: "2021-11-03T19:26:36Z",
      channelTitle: "Wael Yasmina",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
  ],
  typescriptVideos: [
    {
      title: "TypeScript Tutorial",
      imgUrl: "https://i.ytimg.com/vi/2pZmKW9-I_k/hqdefault.jpg",
      channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
      id: 471,
      description:
        "In this tutorial series we'll learn all about TypeScript - a superset of the JavaScript language.",
      publishedAt: "2020-05-07T07:08:50Z",
      channelTitle: "Net Ninja",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "TypeScript in 100 Seconds",
      imgUrl: "https://i.ytimg.com/vi/zQnBQ4tB3ZA/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "zQnBQ4tB3ZA",
      description:
        "Learn the basics if TypeScript in 100 Seconds! If you love TS, upgrade to Fireship PRO for 40% off using code mbus5Kcj at ...",
      publishedAt: "2020-11-25T15:28:06Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "TypeScript Tutorial for Beginners",
      imgUrl: "https://i.ytimg.com/vi/d56mG7DezGs/hqdefault.jpg",
      channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
      id: "d56mG7DezGs",
      description:
        "TypeScript Tutorial for Beginners. Learn TypeScript to write better large-scale JavaScript apps. This tutorial helps you get started ...",
      publishedAt: "2022-05-23T13:00:18Z",
      channelTitle: "Programming with Mosh",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "TypeScript - The Basics",
      imgUrl: "https://i.ytimg.com/vi/ahCwqrYpIuM/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "ahCwqrYpIuM",
      description:
        "TypeScript has forever altered the lives of JavaScript developers. Learn why TS is so awesome and the basic concepts required to ...",
      publishedAt: "2018-11-29T19:13:07Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "TypeScript: Should you use Types or Interfaces?",
      imgUrl: "https://i.ytimg.com/vi/zM9UPcIyyhQ/hqdefault.jpg",
      channelId: "UCswG6FSbgZjbWtdf_hMLaow",
      id: "zM9UPcIyyhQ",
      description:
        "Become a TypeScript Wizard with Matt's upcoming TypeScript Course: https://www.totaltypescript.com/ Follow Matt on Twitter ...",
      publishedAt: "2022-12-05T21:56:27Z",
      channelTitle: "Matt Pocock",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Learn TypeScript – Full Tutorial",
      imgUrl: "https://i.ytimg.com/vi/30LWjhZzg50/hqdefault.jpg",
      channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
      id: "30LWjhZzg50",
      description:
        "Learn how to program with TypeScript in this full course for beginners. TypeScript is a typed superset of JavaScript that compiles ...",
      publishedAt: "2022-11-10T16:03:31Z",
      channelTitle: "freeCodeCamp.org",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Big projects are ditching TypeScript… why?",
      imgUrl: "https://i.ytimg.com/vi/5ChkQKUzDCs/hqdefault.jpg",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      id: "5ChkQKUzDCs",
      description:
        "Why are some big open-source projects like Turbo and Svelte dropping TypeScript in favor of vanilla JavaScript? Learn about the ...",
      publishedAt: "2023-09-07T17:47:46Z",
      channelTitle: "Fireship",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "JSX.Element vs React.ReactNode #typescript #react",
      imgUrl: "https://i.ytimg.com/vi/Gz9xnlE6i98/hqdefault.jpg",
      channelId: "UCswG6FSbgZjbWtdf_hMLaow",
      id: "Gz9xnlE6i98",
      description: "",
      publishedAt: "2024-02-13T14:35:20Z",
      channelTitle: "Matt Pocock",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Личный проект. React, TypeScript, GitHub API. Отвечаю на вопросы",
      imgUrl: "https://i.ytimg.com/vi/d69QJee_MbA/hqdefault.jpg",
      channelId: "UCDLutdgsvm9mWfb17M7G_7g",
      id: "d69QJee_MbA",
      description:
        "Пилим проект на React и TypeScript. Танцы с бубнами с GitHub API. Чилим. ☕ Пьем горячий чай. Какой интересно дизайн ...",
      publishedAt: "2024-02-11T18:08:23Z",
      channelTitle: "maxwell coding",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
    {
      title: "Matt Pocock",
      imgUrl:
        "https://yt3.ggpht.com/RbinzR4AEg_qhUggLwZxYTgAM5o_AcdELqz8eYTb0qLQkWEkWAhlBXRmfg-aTF7hqp3U9izu=s800-c-k-c0xffffffff-no-rj-mo",
      channelId: "UCswG6FSbgZjbWtdf_hMLaow",
      id: 718,
      description:
        "Become a TypeScript wizard with tips, tricks and tutorials. Plus, updates from the latest TypeScript releases (and other open ...",
      publishedAt: "2017-03-14T12:21:09Z",
      channelTitle: "Matt Pocock",
      tags: [],
      statistics: {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      },
    },
  ],
};

export const getStaticProps: GetStaticProps = async () => {
  // const { token = null } = context.req.cookies;

  // const sessionToken = context.req.cookies["next-auth.session-token"];
  // let watchItAgain: VideoData[] = [];

  // if (sessionToken) {
  //   const userId = await verifyToken(sessionToken);
  //   if (userId) {
  //     watchItAgain = await watchedVideos({
  //       token: sessionToken,
  //       userId,
  //     });
  //   }
  // }
  // const reactVideos = await getVideos("best reactjs course");
  // const nextjsVideos = await getVideos("Next js");
  // const threejsVideos = await getVideos("three js");
  // const typescriptVideos = await getVideos("typescript");

  const reactVideos = await staticValues.reactVideos;
  const nextjsVideos = await staticValues.nextjsVideos
  const threejsVideos = await staticValues.threejsVideos
  const typescriptVideos = await staticValues.typescriptVideos

  return {
    props: {
      reactVideos,
      nextjsVideos,
      threejsVideos,
      typescriptVideos,
    },
    // Revalidate the page every 7 days (604800 seconds)
    revalidate: 604800 * 2, // 14 days in seconds
    // revalidate: 5, // development
  };
};

interface Props {
  reactVideos: VideoData[];
  nextjsVideos: VideoData[];
  threejsVideos: VideoData[];
  typescriptVideos: VideoData[];
}

const Home: NextPageWithLayout = ({
  reactVideos = [],
  nextjsVideos,
  threejsVideos,
  typescriptVideos,
}: Props) => {
  const [colorMode, setColorMode] = useColorMode();
  const [watchItAgain, setWatchItAgain] = useState([]);
  // const [cookies, setCookie] = useCookies(["next-auth.session-token"]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      const sessionToken = Cookies.get();

      console.log("sessionToken", { sessionToken });

      // if (session) {
      //   const userId = await verifyToken(session.token);
      //   if (userId) {
      //     const videos = await getWatchedVideos({ token: session.token, userId });
      //     setWatchItAgain(videos);
      //   }
      // }
    };
    fetchData();
  }, [router]);

  useEffect(() => {
    
    {
      async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const locomotive = new LocomotiveScroll();
      };
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Guruflix</title>
      </Head>

      <Banner
        videos={[reactVideos[0], nextjsVideos[0], threejsVideos[0]]}
        title="Jordan B Peterson"
        subtitle="Lecture in harvard university"
        imgUrl="https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg"
      />

      <SectionCard
        title="React"
        colorClass="bg-"
        // colorClass="bg-gradient-to-tr from-blue-950 to-slate-950"
        videos={reactVideos}
        size="small"
      />
      {watchItAgain.length > 0 && (
        <SectionCard
          title="ٌWatch Again"
          // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
          videos={watchItAgain}
          size="medium"
        />
      )}
      <SectionCard
        title="Next.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={nextjsVideos}
        size="medium"
      />
      <SectionCard
        title="Typescript"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={typescriptVideos}
        size="large"
      />
      <SectionCard
        title="Three.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />

      <LoadMore />

      {/* <SectionCard
        title="GSAP"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Vue.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Nuxt.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Clean Code"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      /> */}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};

export default Home;
