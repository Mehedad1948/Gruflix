import { VideoData } from "@/models/videos";
import { getFavouritedVideos } from "./db/hasura";
import { title } from "process";

interface FavouritedVideosProps {
  userId: string;
  token: string;
}

export const favouritedVideos = async ({
  userId,
  token,
}: FavouritedVideosProps): Promise<VideoData[]> => {
  const videos = await getFavouritedVideos({ userId, token });
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
