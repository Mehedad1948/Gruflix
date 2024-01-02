import { videoRequest } from "./videoRequest";

export async function videoById(videoId: string) {
  const url = `/videos?part=snippet&part=statistics&id=${videoId}`;
  const video = await videoRequest(url);
  return video[0];
}
