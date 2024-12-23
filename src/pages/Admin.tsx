import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

export default function Admin() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      fetchPosts();
    }
  }, [session, navigate]);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  }

  async function handleCreatePost(postData: Omit<Post, 'id' | 'created_at'>) {
    const { error } = await supabase.from('posts').insert([postData]);

    if (error) {
      console.error('Error creating post:', error);
    } else {
      fetchPosts();
    }
  }

  async function handleUpdatePost(postData: Omit<Post, 'id' | 'created_at'>) {
    if (!editingPost) return;

    const { error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', editingPost.id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      setEditingPost(null);
      fetchPosts();
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa bài viết này?');
    if (!confirmed) return;

    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      fetchPosts();
    }
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý nội dung</h1>
      </div>

      {editingPost ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa bài viết</h2>
          <PostForm
            onSubmit={handleUpdatePost}
            initialData={editingPost}
            buttonText="Cập nhật bài viết"
          />
          <button
            onClick={() => setEditingPost(null)}
            className="mt-4 text-gray-600 hover:text-gray-800"
          >
            Hủy chỉnh sửa
          </button>
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Thêm bài viết mới</h2>
          <PostForm onSubmit={handleCreatePost} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={setEditingPost}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}