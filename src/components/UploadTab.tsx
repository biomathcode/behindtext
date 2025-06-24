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
      
      {/* SEO Content Section */}
      <div className="mt-8 p-6 bg-black/20 rounded-xl border border-white/10">
        <h4 className="text-lg font-semibold mb-4 text-white">How to Create Text Behind Image Effects</h4>
        <ol className="space-y-3 text-sm text-gray-300">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-400">1</span>
            <span><strong>Upload your image</strong> - Choose any photo where you want to create a text behind effect</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-400">2</span>
            <span><strong>AI removes background</strong> - Our AI automatically separates the subject from the background</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center text-xs font-bold text-pink-400">3</span>
            <span><strong>Add text between layers</strong> - Position your text behind the subject but in front of the background</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold text-green-400">4</span>
            <span><strong>Export your creation</strong> - Download as image or animated video for social media</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default UploadTab;