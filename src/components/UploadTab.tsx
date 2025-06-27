import React, { useRef } from 'react';
import { Upload, MousePointer, Sparkles } from 'lucide-react';

interface UploadTabProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadTab: React.FC<UploadTabProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Upload Your Image</h3>
      
      {/* Enhanced Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400/50 transition-all duration-300 hover:bg-white/5 group relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-200 mb-2 font-medium">Click to upload an image</p>
          <p className="text-sm text-gray-400">Supports JPG, PNG, WebP formats</p>
          <p className="text-xs text-gray-500 mt-2">Aspect ratio will be preserved</p>
        </div>
      </div>

      {/* Drag and Drop Info */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-400/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
            <MousePointer className="w-4 h-4 text-purple-400" />
          </div>
          <h4 className="text-sm font-semibold text-white">💡 Pro Tip</h4>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          You can also <strong className="text-purple-300">drag and drop</strong> your image anywhere on this page! 
          Just drag your image file from your computer and drop it anywhere on the website.
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Works from desktop, file explorer, or any folder</span>
        </div>
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