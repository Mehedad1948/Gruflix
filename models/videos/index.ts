export interface YoutubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: YoutubeThumbnail;
    medium: YoutubeThumbnail;
    high: YoutubeThumbnail;
    standard: YoutubeThumbnail;
    maxres: YoutubeThumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

export interface YoutubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeVideoSnippet;
}

export interface YoutubeVideoListResponse {
  kind: string;
  etag: string;
  items: YoutubeVideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoData {
  title: string;
  imgUrl: string;
  channelId: string;
  id: string;
  description: string;
  publishedAt: string; // You might want to use a more specific type like Date
  channelTitle: string;
  tags: string[];
  statistics: { viewCount: number; likeCount: number; commentCount: number };
}
