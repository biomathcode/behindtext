import React from 'react';
import { Play, Pause } from 'lucide-react';
import { VideoSettings } from '../types';

interface VideoControlsProps {
  videoSettings: VideoSettings;
  onUpdate: (updates: Partial<VideoSettings>) => void;
  isAnimationPlaying: boolean;
  playAnimation: () => void;
  pauseAnimation: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  videoSettings, 
  onUpdate,
  isAnimationPlaying,
  playAnimation,
  pauseAnimation
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Animation Type</label>
        <select
          value={videoSettings.animationType}
          onChange={(e) => onUpdate({ animationType: e.target.value as VideoSettings['animationType'] })}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-orange-400/50 focus:outline-none transition-colors"
        >
          <option value="fade-in" className="bg-gray-800">Fade In</option>
          <option value="fade-out" className="bg-gray-800">Fade Out</option>
          <option value="zoom-in" className="bg-gray-800">Zoom In</option>
          <option value="zoom-out" className="bg-gray-800">Zoom Out</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Animation Duration: <span className="text-orange-400">{videoSettings.animationDuration}s</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.5"
          value={videoSettings.animationDuration}
          onChange={(e) => onUpdate({ animationDuration: parseFloat(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-orange"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Easing</label>
        <select
          value={videoSettings.easing}
          onChange={(e) => onUpdate({ easing: e.target.value as VideoSettings['easing'] })}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-orange-400/50 focus:outline-none transition-colors"
        >
          <option value="ease-in" className="bg-gray-800">Ease In</option>
          <option value="ease-out" className="bg-gray-800">Ease Out</option>
          <option value="ease-in-out" className="bg-gray-800">Ease In-Out</option>
          <option value="linear" className="bg-gray-800">Linear</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Video Duration: <span className="text-orange-400">{videoSettings.videoDuration}s</span>
        </label>
        <input
          type="range"
          min="5"
          max="30"
          value={videoSettings.videoDuration}
          onChange={(e) => onUpdate({ videoDuration: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-orange"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Animation Preview</h4>
        <div className="flex gap-3">
          <button
            onClick={playAnimation}
            disabled={isAnimationPlaying}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-xl text-white font-medium hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Play
          </button>
          <button
            onClick={pauseAnimation}
            disabled={!isAnimationPlaying}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl text-white font-medium hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;