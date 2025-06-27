import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface DragDropOverlayProps {
  isDragging: boolean;
}

const DragDropOverlay: React.FC<DragDropOverlayProps> = ({ isDragging }) => {
  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border-2 border-dashed border-purple-400/50 rounded-3xl p-12 text-center max-w-md mx-4 shadow-2xl">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 flex items-center justify-center animate-pulse">
            <Upload className="w-10 h-10 text-purple-300" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/40 to-green-500/40 flex items-center justify-center animate-bounce">
            <ImageIcon className="w-4 h-4 text-green-300" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Drop Your Image Here
        </h3>
        
        <p className="text-gray-300 mb-4">
          Release to upload and start creating amazing text behind image effects
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>Supports JPG, PNG, WebP formats</span>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default DragDropOverlay;