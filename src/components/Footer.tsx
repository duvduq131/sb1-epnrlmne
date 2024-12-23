import React from 'react';  
import { School, Phone, Mail, MapPin, Facebook } from 'lucide-react'; // Import the Facebook icon  

export default function Footer() {  
  return (  
    <footer className="bg-pink-50 pt-12 pb-8">  
      <div className="container mx-auto px-4">  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">  
          <div>  
            <div className="flex items-center space-x-2 mb-4">  
              <School className="h-8 w-8 text-pink-500" />  
              <span className="text-2xl font-bold text-pink-500">Hạ Mi</span>  
            </div>  
            <p className="text-gray-600 mb-4">  
              Nơi nuôi dưỡng và phát triển những mầm non tương lai  
            </p>  
          </div>  
          
          <div>  
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>  
            <div className="space-y-2">  
            <div className="flex items-center">  
                <Phone size={16} className="mr-2 text-pink-500" />  
                <span>  
                   <a href="tel:0399667823" className="text-black-600 hover:underline">039 966 78 23 (Cô Hạnh)</a>  
                </span>  
            </div>   
            <div className="flex items-center">  
                <Mail size={16} className="mr-2 text-pink-500" />  
                <span>  
                  <a href="mailto:contact@hami.edu.vn" className="text-black-600 hover:underline">contact@hami.edu.vn</a>  
                </span>  
            </div>   
            <div className="flex items-center">  
                <MapPin size={16} className="mr-2 text-pink-500" />  
                <span>  
                  <a   
                    href="https://maps.app.goo.gl/SHQMovP8CPMzkKAZ7?g_st=ic"   
                    target="_blank"   
                    rel="noopener noreferrer"   
                    className="text-black-600 hover:underline"  
                  >  
                  Đường Trì Bình Dung Quất, Bình Chánh, Bình Sơn, Quảng Ngãi.  
                  </a>  
                </span>  
            </div>  
              <div className="flex items-center">  
                <Facebook size={16} className="mr-2 text-pink-500" />  
                <span>  
                  <a href="https://www.facebook.com/vothi.hanh.77" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>  
                </span>  
              </div>  
            </div>  
          </div>  
          
          <div>  
            <h3 className="text-lg font-semibold mb-4">Giờ hoạt động</h3>  
            <div className="space-y-2 text-gray-600">  
              <p>Thứ 2 - Thứ 7: 7:00 - 17:30</p>  
              <p>Chủ nhật: Nghỉ</p>  
            </div>  
          </div>  
        </div>  
        
        <div className="border-t border-pink-200 mt-8 pt-8 text-center text-gray-600">  
          <p>&copy; 2024 Trường Mầm Non Hạ Mi. All rights reserved.</p>  
        </div>  
      </div>  
    </footer>  
  );  
}