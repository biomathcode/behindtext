import React from 'react';
import { Download, Sliders, Loader2 } from 'lucide-react';

interface ExportTabProps {
  canvasDimensions: { width: number; height: number };
  isExporting: boolean;
  onDownloadImage: (format: 'png' | 'jpeg') => void;
  onDownloadVideo: () => void;
}

const ExportTab: React.FC<ExportTabProps> = ({
  canvasDimensions,
  isExporting,
  onDownloadImage,
  onDownloadVideo
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Export Your Creation</h3>
      
      <div className="space-y-4">
        <button
          onClick={() => onDownloadImage('png')}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-blue-400/30 text-white font-medium group"
        >
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Download as PNG
        </button>
        
        <button
          onClick={() => onDownloadImage('jpeg')}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-green-400/30 text-white font-medium group"
        >
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Download as JPEG
        </button>

        <button
          onClick={onDownloadVideo}
          disabled={isExporting}
          className="w-full px-6 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 disabled:from-gray-500/20 disabled:to-gray-500/20 disabled:cursor-not-allowed rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-orange-400/30 disabled:border-gray-400/30 text-white font-medium group"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Video...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Download Animated Video
            </>
          )}
        </button>
      </div>

      <div className="backdrop-blur-sm bg-black/20 rounded-xl p-4 text-sm text-gray-300 border border-white/10">
        <h4 className="font-medium mb-3 text-white flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          Export Information
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            PNG: Transparent background support
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            JPEG: Smaller file size
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            WebM: Animated video with text effects
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            Resolution: {canvasDimensions.width}×{canvasDimensions.height}px
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
            Original aspect ratio preserved
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExportTab;