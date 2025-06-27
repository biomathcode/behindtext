import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { TextSettings } from '../types';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import NumberInput from './NumberInput';

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
      {/* Text Content */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Content</h4>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">
            Text Content
            <span className="text-xs text-gray-400 ml-2 normal-case">(Use commas for multiple lines)</span>
          </label>
          <textarea
            value={textSettings.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:border-purple-400/50 focus:outline-none transition-colors resize-vertical min-h-[60px] text-sm"
            placeholder="Enter your text here... (e.g., Hello, World, Amazing)"
          />
        </div>
      </div>

      {/* Position */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Position</h4>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="X"
            value={textSettings.x}
            onChange={(value) => onUpdate({ x: value })}
            min={0}
            max={100}
            unit="%"
          />
          <NumberInput
            label="Y"
            value={textSettings.y}
            onChange={(value) => onUpdate({ y: value })}
            min={0}
            max={100}
            unit="%"
          />
        </div>
        <NumberInput
          label="Rotation"
          value={textSettings.rotation}
          onChange={(value) => onUpdate({ rotation: value })}
          min={-180}
          max={180}
          unit="°"
        />
      </div>

      {/* Typography */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Typography</h4>
        
        <FontSelector 
          value={textSettings.fontFamily}
          onChange={(font) => onUpdate({ fontFamily: font })}
        />

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Size"
            value={textSettings.fontSize}
            onChange={(value) => onUpdate({ fontSize: value })}
            min={8}
            max={200}
            unit="px"
          />
          <NumberInput
            label="Weight"
            value={textSettings.fontWeight}
            onChange={(value) => onUpdate({ fontWeight: value })}
            min={100}
            max={900}
            step={100}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Letter Spacing"
            value={textSettings.letterSpacing}
            onChange={(value) => onUpdate({ letterSpacing: value })}
            min={-10}
            max={20}
            step={0.1}
            unit="px"
          />
          <NumberInput
            label="Word Spacing"
            value={textSettings.wordSpacing}
            onChange={(value) => onUpdate({ wordSpacing: value })}
            min={-10}
            max={50}
            step={0.1}
            unit="px"
          />
        </div>

        {/* Text Alignment */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">Alignment</label>
          <div className="flex rounded-lg bg-black/20 p-1 border border-white/10">
            {alignmentButtons.map(({ value, icon: Icon, tooltip }) => (
              <div key={value} className="relative group flex-1">
                <button
                  onClick={() => onUpdate({ textAlign: value })}
                  className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 relative ${
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
      </div>

      {/* Appearance */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Appearance</h4>
        
        <ColorPicker
          label="Fill"
          color={textSettings.color}
          onChange={(color) => onUpdate({ color })}
        />

        <NumberInput
          label="Opacity"
          value={textSettings.opacity}
          onChange={(value) => onUpdate({ opacity: value })}
          min={0}
          max={100}
          unit="%"
        />
      </div>

      {/* Stroke */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Stroke</h4>
        
        <NumberInput
          label="Width"
          value={textSettings.strokeWidth}
          onChange={(value) => onUpdate({ strokeWidth: value })}
          min={0}
          max={20}
          unit="px"
        />

        <ColorPicker
          label="Color"
          color={textSettings.strokeColor}
          onChange={(color) => onUpdate({ strokeColor: color })}
        />
      </div>

      {/* Effects */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Effects</h4>
        
        <NumberInput
          label="Shadow Blur"
          value={textSettings.shadowBlur}
          onChange={(value) => onUpdate({ shadowBlur: value })}
          min={0}
          max={50}
          unit="px"
        />

        <ColorPicker
          label="Shadow Color"
          color={textSettings.shadowColor}
          onChange={(color) => onUpdate({ shadowColor: color })}
        />

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Shadow X"
            value={textSettings.shadowOffsetX}
            onChange={(value) => onUpdate({ shadowOffsetX: value })}
            min={-50}
            max={50}
            unit="px"
          />
          <NumberInput
            label="Shadow Y"
            value={textSettings.shadowOffsetY}
            onChange={(value) => onUpdate({ shadowOffsetY: value })}
            min={-50}
            max={50}
            unit="px"
          />
        </div>
      </div>
    </div>
  );
};

export default TextControls;