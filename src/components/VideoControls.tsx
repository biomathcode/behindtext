import React from 'react';
import { Play, Pause } from 'lucide-react';
import { VideoSettings } from '../types';
import NumberInput from './NumberInput';

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
      {/* Animation Settings */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Animation</h4>
        
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">Type</label>
          <select
            value={videoSettings.animationType}
            onChange={(e) => onUpdate({ animationType: e.target.value as VideoSettings['animationType'] })}
            className="w-full h-8 px-3 bg-black/20 border border-white/20 rounded-lg text-white text-sm backdrop-blur-sm focus:border-orange-400/50 focus:outline-none transition-colors"
          >
            <option value="fade-in" className="bg-gray-800">Fade In</option>
            <option value="fade-out" className="bg-gray-800">Fade Out</option>
            <option value="zoom-in" className="bg-gray-800">Zoom In</option>
            <option value="zoom-out" className="bg-gray-800">Zoom Out</option>
          </select>
        </div>

        <NumberInput
          label="Duration"
          value={videoSettings.animationDuration}
          onChange={(value) => onUpdate({ animationDuration: value })}
          min={0.5}
          max={5}
          step={0.5}
          unit="s"
        />

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">Easing</label>
          <select
            value={videoSettings.easing}
            onChange={(e) => onUpdate({ easing: e.target.value as VideoSettings['easing'] })}
            className="w-full h-8 px-3 bg-black/20 border border-white/20 rounded-lg text-white text-sm backdrop-blur-sm focus:border-orange-400/50 focus:outline-none transition-colors"
          >
            <option value="ease-in" className="bg-gray-800">Ease In</option>
            <option value="ease-out" className="bg-gray-800">Ease Out</option>
            <option value="ease-in-out" className="bg-gray-800">Ease In-Out</option>
            <option value="linear" className="bg-gray-800">Linear</option>
          </select>
        </div>
      </div>

      {/* Video Settings */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Video</h4>
        
        <NumberInput
          label="Duration"
          value={videoSettings.videoDuration}
          onChange={(value) => onUpdate({ videoDuration: value })}
          min={5}
          max={30}
          unit="s"
        />
      </div>

      {/* Preview Controls */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Preview</h4>
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