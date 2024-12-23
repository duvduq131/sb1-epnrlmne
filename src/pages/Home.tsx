import React from 'react';
import { Heart, Book, Users, Award } from 'lucide-react';
import PostFeed from '../components/PostFeed';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="h-[600px] bg-cover bg-center relative" 
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/08/7b/01/087b0119f8251c1008eed9419b47428a.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Chào mừng đến với Trường Mầm Non Hạ Mi</h1>
            <p className="text-xl mb-8">Nơi nuôi dưỡng và phát triển những mầm non tương lai</p>
            <a href="https://facebook.com/vothi.hanh.77" target="_blank" rel="noopener noreferrer">
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-600">
              Tìm hiểu thêm
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Môi trường an toàn</h3>
              <p className="text-gray-600">Không gian học tập và vui chơi an toàn, thân thiện</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chương trình học</h3>
              <p className="text-gray-600">Phương pháp giáo dục tiên tiến, phát triển toàn diện</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đội ngũ giáo viên</h3>
              <p className="text-gray-600">Giáo viên nhiệt tình, có trình độ chuyên môn cao</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất lượng</h3>
              <p className="text-gray-600">Cam kết chất lượng giáo dục hàng đầu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Feed Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tin tức & Hoạt động</h2>
          <div className="max-w-3xl mx-auto">
            <PostFeed />
          </div>
        </div>
      </section>
    </div>
  );
}