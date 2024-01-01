import { error } from "console";

export async function getVideos(searchQuery: string) {
  const { YOUTUBE_API_KEY, YOUTUBE_BASE_URL } = process.env;
  try {
    const response = await fetch(
      `${YOUTUBE_BASE_URL}search?
key=${YOUTUBE_API_KEY}&
part=snippet&
q=${searchQuery}&
safeSearch=strict&
chart=mostPopular&
maxResults=10`,
    );
    const data = await response.json();

    if (data?.error) {
      error("YouTube Api Error", searchQuery, data?.error);
      return [];
    }

    const videos = data.items.map((item: any) => {
      // console.log({ item });
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        channelId: item.snippet.channelId,
        id: item?.id?.videoId || Math.round(Math.random() * 1000),
      };
    });
    return videos;
  } catch (err) {
    error("Error in getting", searchQuery, err);
    return [];
  }
}
