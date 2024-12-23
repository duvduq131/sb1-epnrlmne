import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Post } from '../types';
import { Calendar, MessageCircle, Share2 } from 'lucide-react';

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">{post.title}</span>
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('vi-VN')}
              </span>
            </div>
            <span className="inline-block px-2 py-1 text-sm text-pink-800 bg-pink-100 rounded-full mt-2">
              {post.category}
            </span>
          </div>
          
          <div className="p-4">
            <p className="text-gray-700 mb-4">{post.content}</p>
            
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full max-h-[500px] object-cover rounded-lg"
              />
            )}
            
            {post.video_url && (
              <video
                src={post.video_url}
                controls
                className="w-full max-h-[500px] object-cover rounded-lg"
              />
            )}
          </div>
          
          <div className="px-4 py-3 border-t flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.created_at).toLocaleDateString('vi-VN')}
              </span>
              <button className="flex items-center hover:text-pink-500">
                <MessageCircle className="w-4 h-4 mr-1" />
                Bình luận
              </button>
            </div>
            <button className="flex items-center hover:text-pink-500">
              <Share2 className="w-4 h-4 mr-1" />
              Chia sẻ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}