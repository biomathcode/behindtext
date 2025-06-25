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

      {/* Saturation */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Saturation: <span className="text-purple-400">{backgroundSettings.saturation}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={backgroundSettings.saturation}
          onChange={(e) => onUpdate({ saturation: parseInt(e.target.value) })}
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

      {/* Drop Shadow Section */}
      <div className="space-y-4 p-4 bg-black/20 rounded-xl border border-purple-400/30">
        <h4 className="text-lg font-medium text-white flex items-center gap-2">
          Subject Drop Shadow
        </h4>
        
        {/* Enable Drop Shadow */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dropShadowEnabled"
            checked={backgroundSettings.dropShadowEnabled}
            onChange={(e) => onUpdate({ dropShadowEnabled: e.target.checked })}
            className="w-4 h-4 text-purple-600 bg-black/20 border-purple-400/30 rounded focus:ring-purple-500 focus:ring-2"
          />
          <label htmlFor="dropShadowEnabled" className="text-sm font-medium text-gray-200">
            Enable Subject Highlighting
          </label>
        </div>

        {backgroundSettings.dropShadowEnabled && (
          <>
            {/* Shadow Blur */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">
                Shadow Blur: <span className="text-purple-400">{backgroundSettings.dropShadowBlur}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={backgroundSettings.dropShadowBlur}
                onChange={(e) => onUpdate({ dropShadowBlur: parseInt(e.target.value) })}
                className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
              />
            </div>

            {/* Shadow Opacity */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">
                Shadow Opacity: <span className="text-purple-400">{backgroundSettings.dropShadowOpacity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={backgroundSettings.dropShadowOpacity}
                onChange={(e) => onUpdate({ dropShadowOpacity: parseInt(e.target.value) })}
                className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
              />
            </div>

            {/* Shadow Color */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">Shadow Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={backgroundSettings.dropShadowColor}
                  onChange={(e) => onUpdate({ dropShadowColor: e.target.value })}
                  className="w-12 h-12 bg-black/20 border border-white/20 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={backgroundSettings.dropShadowColor}
                  onChange={(e) => onUpdate({ dropShadowColor: e.target.value })}
                  className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-purple-400/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Shadow Offset */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">
                  Shadow X: <span className="text-purple-400">{backgroundSettings.dropShadowOffsetX}px</span>
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={backgroundSettings.dropShadowOffsetX}
                  onChange={(e) => onUpdate({ dropShadowOffsetX: parseInt(e.target.value) })}
                  className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">
                  Shadow Y: <span className="text-purple-400">{backgroundSettings.dropShadowOffsetY}px</span>
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={backgroundSettings.dropShadowOffsetY}
                  onChange={(e) => onUpdate({ dropShadowOffsetY: parseInt(e.target.value) })}
                  className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider-purple"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onUpdate({ 
          brightness: 100, 
          contrast: 100, 
          blur: 0, 
          saturation: 100,
          dropShadowEnabled: false,
          dropShadowBlur: 10,
          dropShadowColor: '#000000',
          dropShadowOffsetX: 5,
          dropShadowOffsetY: 5,
          dropShadowOpacity: 50
        })}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl transition-all duration-300 border border-purple-400/30 text-white font-medium"
      >
        Reset to Default
      </button>
    </div>
  );
};

export default BackgroundControls;