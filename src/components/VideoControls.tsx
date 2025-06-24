import React from 'react';
import { VideoSettings } from '../types';

interface VideoControlsProps {
  videoSettings: VideoSettings;
  onUpdate: (updates: Partial<VideoSettings>) => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ videoSettings, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Animation Type */}
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

      {/* Animation Duration */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Animation Duration: <span className="text-orange-400">{videoSettings.duration}ms</span>
        </label>
        <input
          type="range"
          min="500"
          max="3000"
          step="100"
          value={videoSettings.duration}
          onChange={(e) => onUpdate({ duration: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-orange"
        />
      </div>

      {/* Easing */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Easing Effect</label>
        <select
          value={videoSettings.easing}
          onChange={(e) => onUpdate({ easing: e.target.value as VideoSettings['easing'] })}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-orange-400/50 focus:outline-none transition-colors"
        >
          <option value="ease-in" className="bg-gray-800">Ease In</option>
          <option value="ease-out" className="bg-gray-800">Ease Out</option>
          <option value="ease-in-out" className="bg-gray-800">Ease In-Out</option>
        </select>
      </div>

      {/* Video Duration */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Video Duration: <span className="text-orange-400">{videoSettings.videoDuration / 1000}s</span>
        </label>
        <input
          type="range"
          min="3000"
          max="60000"
          step="1000"
          value={videoSettings.videoDuration}
          onChange={(e) => onUpdate({ videoDuration: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-orange"
        />
      </div>
    </div>
  );
};

export default VideoControls;