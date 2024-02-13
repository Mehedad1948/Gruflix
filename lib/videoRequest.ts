import { VideoData } from "@/models/videos";

export async function videoRequest(address: string): Promise<VideoData[]> {
  
  const NEXT_PUBLIC_YOUTUBE_API_KEY= process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const NEXT_PUBLIC_YOUTUBE_BASE_URL= process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL;
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_YOUTUBE_BASE_URL}${address}&key=${NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    );
    const data = await response.json();
    // console.log({ response });

    if (data?.error) {
      console.error("YouTube Api Error", address, data?.error);
      return [];
    }

    const videos = data.items.map((item: any) => {
      const snippet = item.snippet;
      const statistics = item.statistics;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        channelId: snippet.channelId,
        id: item?.id?.videoId || Math.round(Math.random() * 1000),
        description: snippet.description,
        publishedAt: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        tags: snippet.tags || [],
        statistics: statistics
          ? {
              likeCount: statistics.likeCount || 0,
              viewCount: statistics.viewCount || 0,
              commentCount: statistics.commentCount || 0,
            }
          : { viewCount: 0, likeCount: 0, commentCount: 0 },
      };
    });

    return videos;
  } catch (err) {
    console.error("Error in getting", address, err);
    return [];
  }
}
