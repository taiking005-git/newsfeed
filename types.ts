export interface Comment {
  id: number;
  author: string;
  avatarUrl: string;
  text: string;
  timestamp: string;
}

export interface NewsArticle {
  id: number;
  headline: string;
  source: string;
  publishedAgo: string;
  publishedDate: string; // ISO 8601 format: "YYYY-MM-DDTHH:mm:ss.sssZ"
  imageUrl: string;
  videoUrl?: string;
  fullContent: string;
  articleUrl: string;
  likes: number;
  comments: Comment[];
}
