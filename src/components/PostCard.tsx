import React from 'react';
import { Post } from '../types';
import { Pencil, Trash2, Image, Video } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(post)}
            className="text-blue-500 hover:text-blue-600"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        {post.image_url && <Image size={16} />}
        {post.video_url && <Video size={16} />}
        <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">
          {post.category}
        </span>
      </div>
    </div>
  );
}