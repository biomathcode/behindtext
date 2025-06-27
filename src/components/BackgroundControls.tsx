import React from 'react';
import { BackgroundSettings } from '../types';
import NumberInput from './NumberInput';

interface BackgroundControlsProps {
  backgroundSettings: BackgroundSettings;
  onUpdate: (updates: Partial<BackgroundSettings>) => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({ backgroundSettings, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Image Filters */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Image Filters</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Brightness"
            value={backgroundSettings.brightness}
            onChange={(value) => onUpdate({ brightness: value })}
            min={0}
            max={200}
            unit="%"
          />
          <NumberInput
            label="Contrast"
            value={backgroundSettings.contrast}
            onChange={(value) => onUpdate({ contrast: value })}
            min={0}
            max={200}
            unit="%"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Saturation"
            value={backgroundSettings.saturation}
            onChange={(value) => onUpdate({ saturation: value })}
            min={0}
            max={200}
            unit="%"
          />
          <NumberInput
            label="Blur"
            value={backgroundSettings.blur}
            onChange={(value) => onUpdate({ blur: value })}
            min={0}
            max={20}
            unit="px"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onUpdate({ 
          brightness: 100, 
          contrast: 100, 
          blur: 0, 
          saturation: 100
        })}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl transition-all duration-300 border border-purple-400/30 text-white font-medium"
      >
        Reset Background Settings
      </button>
    </div>
  );
};

export default BackgroundControls;