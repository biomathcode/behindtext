import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full h-8 rounded-lg border border-white/20 bg-black/20 backdrop-blur-sm flex items-center gap-3 px-3 hover:border-purple-400/50 transition-colors"
        >
          <div 
            className="w-4 h-4 rounded border border-white/30 flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-white font-mono uppercase">{color}</span>
        </button>
        
        {showPicker && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setShowPicker(false)}
            />
            <div className="absolute top-full left-0 mt-2 z-50">
              <SketchPicker
                color={color}
                onChange={(colorResult) => onChange(colorResult.hex)}
                styles={{
                  default: {
                    picker: {
                      background: 'rgba(17, 24, 39, 0.95)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;