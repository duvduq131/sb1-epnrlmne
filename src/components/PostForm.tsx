import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import FileUpload from './FileUpload';
import { Post } from '../types';

interface PostFormProps {
  onSubmit: (postData: Omit<Post, 'id' | 'created_at'>) => Promise<void>;
  initialData?: Partial<Post>;
  buttonText?: string;
}

export default function PostForm({ onSubmit, initialData, buttonText = 'Thêm bài viết' }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState<Post['category']>(initialData?.category || 'news');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      title,
      content,
      category,
      image_url: imageUrl,
      video_url: videoUrl,
    });
    
    if (!initialData) {
      setTitle('');
      setContent('');
      setCategory('news');
      setImageUrl('');
      setVideoUrl('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tiêu đề
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nội dung
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Danh mục
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Post['category'])}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="news">Tin tức</option>
          <option value="activity">Hoạt động</option>
          <option value="menu">Thực đơn</option>
          <option value="event">Sự kiện</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Hình ảnh
        </label>
        {imageUrl ? (
          <div className="mt-2">
            <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="mt-2 text-red-500 text-sm"
            >
              Xóa ảnh
            </button>
          </div>
        ) : (
          <FileUpload type="image" onUploadComplete={setImageUrl} />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Video
        </label>
        {videoUrl ? (
          <div className="mt-2">
            <video src={videoUrl} className="w-32 h-32 object-cover rounded" controls />
            <button
              type="button"
              onClick={() => setVideoUrl('')}
              className="mt-2 text-red-500 text-sm"
            >
              Xóa video
            </button>
          </div>
        ) : (
          <FileUpload type="video" onUploadComplete={setVideoUrl} />
        )}
      </div>

      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 flex items-center"
      >
        <PlusCircle className="mr-2" />
        {buttonText}
      </button>
    </form>
  );
}