import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface UploadTabProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadTab: React.FC<UploadTabProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Upload Your Image</h3>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400/50 transition-all duration-300 hover:bg-white/5 group"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-gray-200 mb-2 font-medium">Click to upload an image</p>
        <p className="text-sm text-gray-400">Supports JPG, PNG formats</p>
        <p className="text-xs text-gray-500 mt-2">Aspect ratio will be preserved</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default UploadTab;