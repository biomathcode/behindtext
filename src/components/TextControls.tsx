import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { TextSettings } from '../types';
import FontSelector from './FontSelector';

interface TextControlsProps {
  textSettings: TextSettings;
  onUpdate: (updates: Partial<TextSettings>) => void;
}

const TextControls: React.FC<TextControlsProps> = ({ textSettings, onUpdate }) => {
  const alignmentButtons = [
    { value: 'left' as const, icon: AlignLeft, tooltip: 'Align Left' },
    { value: 'center' as const, icon: AlignCenter, tooltip: 'Align Center' },
    { value: 'right' as const, icon: AlignRight, tooltip: 'Align Right' },
  ];

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
        <label className="block text-sm font-medium text-gray-200">
          Text Content
          <span className="text-xs text-gray-400 ml-2">(Use commas to create multiple lines)</span>
        </label>
        <textarea
          value={textSettings.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors resize-vertical min-h-[80px]"
          placeholder="Enter your text here... (e.g., Hello, World, Amazing)"
        />
        <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-3 border border-white/10">
          <strong>💡 Tip:</strong> Use commas to separate text into multiple lines. 
          <br />
          Example: "Hello, World, Amazing" becomes:
          <div className="mt-1 pl-4 text-blue-300">
            Hello<br />World<br />Amazing
          </div>
        </div>
      </div>

      {/* Text Alignment */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-200">Text Alignment</label>
        <div className="flex rounded-xl bg-black/20 p-1 border border-white/10">
          {alignmentButtons.map(({ value, icon: Icon, tooltip }) => (
            <div key={value} className="relative group flex-1">
              <button
                onClick={() => onUpdate({ textAlign: value })}
                className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative ${
                  textSettings.textAlign === value
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg border border-blue-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={tooltip}
              >
                <Icon className="w-4 h-4" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-sm border border-white/10">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Font Family Selector */}
      <FontSelector 
        value={textSettings.fontFamily}
        onChange={(font) => onUpdate({ fontFamily: font })}
      />

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