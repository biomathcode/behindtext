import React from 'react';
import { BackgroundSettings } from '../types';
import ColorPicker from './ColorPicker';
import NumberInput from './NumberInput';

interface SubjectControlsProps {
  backgroundSettings: BackgroundSettings;
  onUpdate: (updates: Partial<BackgroundSettings>) => void;
}

const SubjectControls: React.FC<SubjectControlsProps> = ({ backgroundSettings, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Subject Drop Shadow */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Subject Shadow</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={backgroundSettings.dropShadowEnabled}
              onChange={(e) => onUpdate({ dropShadowEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500 border border-white/20"></div>
          </label>
        </div>
        
        {backgroundSettings.dropShadowEnabled && (
          <div className="space-y-3">
            <NumberInput
              label="Blur"
              value={backgroundSettings.dropShadowBlur}
              onChange={(value) => onUpdate({ dropShadowBlur: value })}
              min={0}
              max={50}
              unit="px"
            />

            <NumberInput
              label="Opacity"
              value={backgroundSettings.dropShadowOpacity}
              onChange={(value) => onUpdate({ dropShadowOpacity: value })}
              min={0}
              max={100}
              unit="%"
            />

            <ColorPicker
              label="Color"
              color={backgroundSettings.dropShadowColor}
              onChange={(color) => onUpdate({ dropShadowColor: color })}
            />

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Offset X"
                value={backgroundSettings.dropShadowOffsetX}
                onChange={(value) => onUpdate({ dropShadowOffsetX: value })}
                min={-50}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Offset Y"
                value={backgroundSettings.dropShadowOffsetY}
                onChange={(value) => onUpdate({ dropShadowOffsetY: value })}
                min={-50}
                max={50}
                unit="px"
              />
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onUpdate({ 
          dropShadowEnabled: false,
          dropShadowBlur: 10,
          dropShadowColor: '#000000',
          dropShadowOffsetX: 5,
          dropShadowOffsetY: 5,
          dropShadowOpacity: 50
        })}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-green-500/20 hover:from-blue-500/30 hover:to-green-500/30 rounded-xl transition-all duration-300 border border-blue-400/30 text-white font-medium"
      >
        Reset Subject Settings
      </button>
    </div>
  );
};

export default SubjectControls;