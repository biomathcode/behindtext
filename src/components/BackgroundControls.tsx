import React from 'react';
import { BackgroundSettings } from '../types';

interface BackgroundControlsProps {
  backgroundSettings: BackgroundSettings;
  onUpdate: (updates: Partial<BackgroundSettings>) => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({ backgroundSettings, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Brightness */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Brightness: <span className="text-purple-400">{backgroundSettings.brightness}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={backgroundSettings.brightness}
          onChange={(e) => onUpdate({ brightness: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
        />
      </div>

      {/* Contrast */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Contrast: <span className="text-purple-400">{backgroundSettings.contrast}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={backgroundSettings.contrast}
          onChange={(e) => onUpdate({ contrast: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
        />
      </div>

      {/* Blur */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Blur: <span className="text-purple-400">{backgroundSettings.blur}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={backgroundSettings.blur}
          onChange={(e) => onUpdate({ blur: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onUpdate({ brightness: 100, contrast: 100, blur: 0 })}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl transition-all duration-300 border border-purple-400/30 text-white font-medium"
      >
        Reset to Default
      </button>
    </div>
  );
};

export default BackgroundControls;