import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  type: 'image' | 'video';
}

export default function FileUpload({ onUploadComplete, type }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vui lòng chọn file để tải lên');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Tải file lên không thành công');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-2">
      <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
        <Upload className="w-5 h-5 mr-2 text-gray-500" />
        {uploading ? 'Đang tải lên...' : `Tải ${type === 'image' ? 'ảnh' : 'video'} lên`}
        <input
          type="file"
          className="hidden"
          accept={type === 'image' ? 'image/*' : 'video/*'}
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}