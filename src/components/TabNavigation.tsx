import React from 'react';
import { Upload, Download, Settings } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'upload' | 'edit' | 'export';
  setActiveTab: (tab: 'upload' | 'edit' | 'export') => void;
  hasImage: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  hasImage
}) => {
  return (
    <div className="flex border-b border-white/20">
      <button
        onClick={() => setActiveTab('upload')}
        className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
          activeTab === 'upload'
            ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border-b-2 border-blue-400'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Upload className="w-4 h-4 mx-auto mb-1" />
        Upload
      </button>
      <button
        onClick={() => setActiveTab('edit')}
        className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
          activeTab === 'edit'
            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-b-2 border-purple-400'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
        disabled={!hasImage}
      >
        <Settings className="w-4 h-4 mx-auto mb-1" />
        Edit
      </button>
      <button
        onClick={() => setActiveTab('export')}
        className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
          activeTab === 'export'
            ? 'bg-gradient-to-r from-pink-500/30 to-blue-500/30 text-white border-b-2 border-pink-400'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
        disabled={!hasImage}
      >
        <Download className="w-4 h-4 mx-auto mb-1" />
        Export
      </button>
    </div>
  );
};

export default TabNavigation;