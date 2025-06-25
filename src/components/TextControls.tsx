import React from 'react';
import { TextSettings } from '../types';

interface TextControlsProps {
  textSettings: TextSettings;
  onUpdate: (updates: Partial<TextSettings>) => void;
}

const TextControls: React.FC<TextControlsProps> = ({ textSettings, onUpdate }) => {
  const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact', 'Trebuchet MS'];

  return (
    <div className="space-y-6">
      {/* Position */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-200">
            Horizontal: <span className="text-blue-400">{textSettings.x}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={textSettings.x}
            onChange={(e) => onUpdate({ x: parseInt(e.target.value) })}
            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-200">
            Vertical: <span className="text-blue-400">{textSettings.y}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={textSettings.y}
            onChange={(e) => onUpdate({ y: parseInt(e.target.value) })}
            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Opacity */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Opacity: <span className="text-blue-400">{textSettings.opacity}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={textSettings.opacity}
          onChange={(e) => onUpdate({ opacity: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Text Content */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Text Content</label>
        <textarea
          value={textSettings.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors resize-vertical min-h-[80px]"
          placeholder="Enter your text here..."
        />
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Font Family</label>
        <select
          value={textSettings.fontFamily}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
        >
          {fontFamilies.map(font => (
            <option key={font} value={font} className="bg-gray-800">{font}</option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Font Size: <span className="text-blue-400">{textSettings.fontSize}px</span>
        </label>
        <input
          type="range"
          min="12"
          max="120"
          value={textSettings.fontSize}
          onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Font Weight */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Font Weight: <span className="text-blue-400">{textSettings.fontWeight}</span>
        </label>
        <input
          type="range"
          min="100"
          max="900"
          step="100"
          value={textSettings.fontWeight}
          onChange={(e) => onUpdate({ fontWeight: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Color */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Text Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={textSettings.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="w-12 h-12 bg-black/20 border border-white/20 rounded-xl cursor-pointer"
          />
          <input
            type="text"
            value={textSettings.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Stroke */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Stroke Width: <span className="text-blue-400">{textSettings.strokeWidth}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={textSettings.strokeWidth}
          onChange={(e) => onUpdate({ strokeWidth: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Stroke Color */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Stroke Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={textSettings.strokeColor}
            onChange={(e) => onUpdate({ strokeColor: e.target.value })}
            className="w-12 h-12 bg-black/20 border border-white/20 rounded-xl cursor-pointer"
          />
          <input
            type="text"
            value={textSettings.strokeColor}
            onChange={(e) => onUpdate({ strokeColor: e.target.value })}
            className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Shadow */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Shadow Blur: <span className="text-blue-400">{textSettings.shadowBlur}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={textSettings.shadowBlur}
          onChange={(e) => onUpdate({ shadowBlur: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Shadow Color */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Shadow Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={textSettings.shadowColor}
            onChange={(e) => onUpdate({ shadowColor: e.target.value })}
            className="w-12 h-12 bg-black/20 border border-white/20 rounded-xl cursor-pointer"
          />
          <input
            type="text"
            value={textSettings.shadowColor}
            onChange={(e) => onUpdate({ shadowColor: e.target.value })}
            className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Shadow Offset */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-200">
            Shadow X: <span className="text-blue-400">{textSettings.shadowOffsetX}px</span>
          </label>
          <input
            type="range"
            min="-20"
            max="20"
            value={textSettings.shadowOffsetX}
            onChange={(e) => onUpdate({ shadowOffsetX: parseInt(e.target.value) })}
            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-200">
            Shadow Y: <span className="text-blue-400">{textSettings.shadowOffsetY}px</span>
          </label>
          <input
            type="range"
            min="-20"
            max="20"
            value={textSettings.shadowOffsetY}
            onChange={(e) => onUpdate({ shadowOffsetY: parseInt(e.target.value) })}
            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Rotation */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">
          Rotation: <span className="text-blue-400">{textSettings.rotation}°</span>
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={textSettings.rotation}
          onChange={(e) => onUpdate({ rotation: parseInt(e.target.value) })}
          className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
};

export default TextControls;