import { VideoData } from "@/models/videos";
import { getWatchedVideos } from "./db/hasura";
import { title } from "process";

interface WatchedVideosProps {
  userId: string;
  token: string;
}

export const watchedVideos = async ({
  userId,
  token,
}: WatchedVideosProps): Promise<VideoData[]> => {
  const videos = await getWatchedVideos({ userId, token });
  const videoData = videos.map((video) => ({
    id: video.videoId,
    imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    title: "",
    channelId: "",
    description: "",
    publishedAt: "",
    channelTitle: "",
    statistics: { viewCount: 0 },
  }));
  return videoData;
};
