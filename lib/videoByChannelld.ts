import { channelIds } from "./globals";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = process.env.YOUTUBE_BASE_URL;

export async function getVideosById(channelId: string) {
  // const params = {
  //   key: "AIzaSyDBVg5ALQF4sAP2f-nejWkfU18qd_TQP88",
  //   categoryId: channelIds[channelName],
  //   part: "snippet",
  // };

  try {
    console.log("******************************************************", {
      channelId,
    });
    const response = await fetch(
      `${YOUTUBE_BASE_URL}playlists?part=snippet%2CcontentDetails%2C%20player&
channelId=${channelId}&maxResults=10&
key=${YOUTUBE_API_KEY}`,
    );
    const data = await response.json();
    console.log({ data });
    if (data?.error) {
      console.log("Error", data.error);
      return [];
    }

    const videos = data.items.map((item :any) => {
      const id = item.id?.videoId || item.id;
      return {
        videoFrame: item.player.embedHtml,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
    return videos;
  } catch (err) {
    console.log(err);
    return [];
  }
}
