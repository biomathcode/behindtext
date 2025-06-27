import React from 'react';
import { Layers, User } from 'lucide-react';

interface ImageSubTabNavigationProps {
  imageSubTab: 'background' | 'subject';
  setImageSubTab: (tab: 'background' | 'subject') => void;
}

const ImageSubTabNavigation: React.FC<ImageSubTabNavigationProps> = ({
  imageSubTab,
  setImageSubTab
}) => {
  return (
    <div className="flex rounded-lg bg-black/20 p-1 border border-white/10 mb-4">
      <button
        onClick={() => setImageSubTab('background')}
        className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
          imageSubTab === 'background'
            ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Layers className="w-4 h-4" />
        Background
      </button>
      <button
        onClick={() => setImageSubTab('subject')}
        className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
          imageSubTab === 'subject'
            ? 'bg-gradient-to-r from-blue-500/30 to-green-500/30 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <User className="w-4 h-4" />
        Subject
      </button>
    </div>
  );
};

export default ImageSubTabNavigation;