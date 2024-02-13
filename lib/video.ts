import { videoRequest } from "./videoRequest";

export async function getVideos(searchQuery: string) {
  console.log({ searchQuery });

  const url = `/search?part=snippet&q=${searchQuery}&safeSearch=strict&chart=latest&maxResults=10`;
  const videos = await videoRequest(url);
  // console.log({ videos });


  // const videos = [
  //   {
  //     title: "ReactJS Course For Beginners 2023",
  //     imgUrl: "https://i.ytimg.com/vi/U2Wltnv-doo/hqdefault.jpg",
  //     channelId: "UC8S4rDRZn6Z_StJ-hh7ph8g",
  //     id: '843',
  //     description:
  //       "In this course you will learn everything you need to know to go from a beginner react developer to an advanced one. Course ...",
  //     publishedAt: "2022-07-11T05:16:23Z",
  //     channelTitle: "PedroTech",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title:
  //       "React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]",
  //     imgUrl: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
  //     channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
  //     id: "bMknfKXIFA8",
  //     description:
  //       "Learn React by building eight real-world projects and solving 140+ coding challenges. You can also follow this course ...",
  //     publishedAt: "2022-01-10T14:47:57Z",
  //     channelTitle: "freeCodeCamp.org",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title: "React Tutorial for Beginners",
  //     imgUrl: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg",
  //     channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
  //     id: "SqcY0GlETPk",
  //     description:
  //       "React JS Tutorial for Beginners - Learn React 18 with TypeScript and build awesome frontend app! - Want to learn more? Get my ...",
  //     publishedAt: "2023-03-12T08:00:07Z",
  //     channelTitle: "Programming with Mosh",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title: "5 Best FREE React Online Courses",
  //     imgUrl: "https://i.ytimg.com/vi/13PRKOCJg_Y/hqdefault.jpg",
  //     channelId: "UCVyTG4sCw-rOvB9oHkzZD1w",
  //     id: "13PRKOCJg_Y",
  //     description:
  //       "Start learning today! For more #webdesign & #development resources: ➢ Visit Creative Tim Courses: https://bit.ly/3s4llfw ...",
  //     publishedAt: "2022-12-14T22:00:00Z",
  //     channelTitle: "Creative Tim Tutorials",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title: "Complete React course with projects | part 1",
  //     imgUrl: "https://i.ytimg.com/vi/FxgM9k1rg0Q/hqdefault.jpg",
  //     channelId: "UCNQ6FEtztATuaVhZKCY28Yw",
  //     id: "FxgM9k1rg0Q",
  //     description:
  //       "00:00:00 React Roadmap 00:30:17 Create React Projects 01:05:32 Understand the react flow and structure 01:41:30 Create your ...",
  //     publishedAt: "2023-09-11T13:30:08Z",
  //     channelTitle: "Chai aur Code",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title: "How I Would Learn React From Scratch In 2023",
  //     imgUrl: "https://i.ytimg.com/vi/a7YYJVGBy6A/hqdefault.jpg",
  //     channelId: "UCFbNIlppjAuEX4znoulh0Cw",
  //     id: "a7YYJVGBy6A",
  //     description: "React Simplified Course: ...",
  //     publishedAt: "2023-08-01T16:00:01Z",
  //     channelTitle: "Web Dev Simplified",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title:
  //       "99% React Courses Miss These Essential Real-World Skills | Tanay Pratap Hindi",
  //     imgUrl: "https://i.ytimg.com/vi/cTXn8VsgzTM/hqdefault.jpg",
  //     channelId: "UCNFmBuclxQPe57orKiQbyfA",
  //     id: "cTXn8VsgzTM",
  //     description:
  //       "Meetup link: https://lu.ma/tanaypratap Discover the crucial skills that most React courses overlook and learn how to differentiate ...",
  //     publishedAt: "2023-05-14T14:30:11Z",
  //     channelTitle: "Tanay Pratap",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title: "ReactJS Tutorial for Beginners",
  //     imgUrl: "https://i.ytimg.com/vi/QFaFIcGhPoM/hqdefault.jpg",
  //     channelId: "UC80PWRj_ZU8Zu0HSMNVwKWw",
  //     id: '860',
  //     description:
  //       "React is an open source javascript library for building user interfaces. React is a project created and maintained by Facebook.",
  //     publishedAt: "2018-10-29T12:01:47Z",
  //     channelTitle: "Codevolution",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title:
  //       "React JS Full Course 2023 | Build an App and Master React in 1 Hour",
  //     imgUrl: "https://i.ytimg.com/vi/b9eMGE7QtTk/hqdefault.jpg",
  //     channelId: "UCmXmlB4-HJytD7wek0Uo97A",
  //     id: "b9eMGE7QtTk",
  //     description:
  //       "After building this simple, half-hour movie application, imagine what a long and comprehensive 20-hour Next.js course would look ...",
  //     publishedAt: "2022-03-04T11:06:59Z",
  //     channelTitle: "JavaScript Mastery",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  //   {
  //     title:
  //       "How to learn ReactJS in 30 Days 👩‍💻 #technology #programming #software #react #career",
  //     imgUrl: "https://i.ytimg.com/vi/m1_ppy3HOEU/hqdefault.jpg",
  //     channelId: "UCWI-ohtRu8eEeDj93hmUsUQ",
  //     id: "m1_ppy3HOEU",
  //     description: "",
  //     publishedAt: "2022-05-27T17:04:51Z",
  //     channelTitle: "Coding with Lewis",
  //     tags: [],
  //     statistics: {
  //       viewCount: 0,
  //       likeCount: 0,
  //       commentCount: 0,
  //     },
  //   },
  // ];
  return videos;
}
