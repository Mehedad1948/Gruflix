import { VideoData } from "@/models/videos";
import { error } from "console";

export async function videoRequest(address: string): Promise<VideoData[]> {
  const { YOUTUBE_API_KEY, YOUTUBE_BASE_URL } = process.env;
  try {
    const response = await fetch(
      `${YOUTUBE_BASE_URL}${address}&key=${YOUTUBE_API_KEY}`,
    );
    const data = await response.json();

    if (data?.error) {
      error("YouTube Api Error", address, data?.error);
      return [];
    }

    const videos = data.items.map((item: any) => {
      const snippet = item.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        channelId: snippet.channelId,
        id: item?.id?.videoId || Math.round(Math.random() * 1000),
        description: snippet.description,
        publishedAt: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: snippet.statistics
          ? item.statistics.viewCount
          : { viewCount: 0 },
      };
    });

    return videos;
  } catch (err) {
    error("Error in getting", address, err);
    return [];
  }
}
