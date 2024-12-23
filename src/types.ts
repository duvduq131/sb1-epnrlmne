export interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  created_at: string;
  category: 'news' | 'activity' | 'menu' | 'event';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}