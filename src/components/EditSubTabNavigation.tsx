import React from 'react';
import { Type, Image as ImageIcon, Video } from 'lucide-react';

interface EditSubTabNavigationProps {
  editSubTab: 'text' | 'image' | 'video';
  setEditSubTab: (tab: 'text' | 'image' | 'video') => void;
}

const EditSubTabNavigation: React.FC<EditSubTabNavigationProps> = ({
  editSubTab,
  setEditSubTab
}) => {
  return (
    <div className="flex rounded-xl bg-black/20 p-1 border border-white/10">
      <button
        onClick={() => setEditSubTab('text')}
        className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          editSubTab === 'text'
            ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Type className="w-4 h-4" />
        Text
      </button>
      <button
        onClick={() => setEditSubTab('image')}
        className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          editSubTab === 'image'
            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        Image
      </button>
      <button
        onClick={() => setEditSubTab('video')}
        className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          editSubTab === 'video'
            ? 'bg-gradient-to-r from-pink-500/30 to-orange-500/30 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Video className="w-4 h-4" />
        Video
      </button>
    </div>
  );
};

export default EditSubTabNavigation;