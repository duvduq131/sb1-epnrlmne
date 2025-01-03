import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { School, Phone, Mail, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-pink-500" />
              <span>
                <a href="tel:0399667823" className="text-black-600 hover:underline">
                  039 966 78 23 (Cô Hạnh)
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-pink-500" />
              <span>
                <a href="mailto:contact@hami.edu.vn" className="text-black-600 hover:underline">
                  contact@hami.edu.vn
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2">
              <School className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold text-pink-500">Hạ Mi</span>
            </Link>

            {/* Hamburger Menu */}
            <button
              className="md:hidden text-pink-500"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-pink-500">Trang chủ</Link>
              <Link to="/about" className="text-gray-700 hover:text-pink-500">Giới thiệu</Link>
              <Link to="/activities" className="text-gray-700 hover:text-pink-500">Hoạt động</Link>
              <Link to="/news" className="text-gray-700 hover:text-pink-500">Tin tức</Link>
              <Link to="/contact" className="text-gray-700 hover:text-pink-500">Liên hệ</Link>
              {session ? (
                <>
                  <Link to="/admin" className="text-gray-700 hover:text-pink-500">Quản trị</Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                  <LogIn className="w-4 h-4 mr-2" />
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-lg py-4">
              <Link to="/" className="block px-4 py-2 text-gray-700 hover:text-pink-500">Trang chủ</Link>
              <Link to="/about" className="block px-4 py-2 text-gray-700 hover:text-pink-500">Giới thiệu</Link>
              <Link to="/activities" className="block px-4 py-2 text-gray-700 hover:text-pink-500">Hoạt động</Link>
              <Link to="/news" className="block px-4 py-2 text-gray-700 hover:text-pink-500">Tin tức</Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:text-pink-500">Liên hệ</Link>
              {session ? (
                <>
                  <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:text-pink-500">Quản trị</Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center bg-pink-500 text-white hover:bg-pink-600"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
