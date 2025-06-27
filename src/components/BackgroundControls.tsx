import React from 'react';
import { BackgroundSettings } from '../types';
import NumberInput from './NumberInput';
import ColorPicker from './ColorPicker';

interface BackgroundControlsProps {
  backgroundSettings: BackgroundSettings;
  onUpdate: (updates: Partial<BackgroundSettings>) => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({ backgroundSettings, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Image Opacity */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Image Opacity</h4>
        
        <NumberInput
          label="Opacity"
          value={backgroundSettings.opacity}
          onChange={(value) => onUpdate({ opacity: value })}
          min={0}
          max={100}
          unit="%"
        />
      </div>

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

      {/* Shadow */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Shadow</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={backgroundSettings.shadowEnabled}
              onChange={(e) => onUpdate({ shadowEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500 border border-white/20"></div>
          </label>
        </div>
        
        {backgroundSettings.shadowEnabled && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Blur"
                value={backgroundSettings.shadowBlur}
                onChange={(value) => onUpdate({ shadowBlur: value })}
                min={0}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Opacity"
                value={backgroundSettings.shadowOpacity}
                onChange={(value) => onUpdate({ shadowOpacity: value })}
                min={0}
                max={100}
                unit="%"
              />
            </div>

            <ColorPicker
              label="Color"
              color={backgroundSettings.shadowColor}
              onChange={(color) => onUpdate({ shadowColor: color })}
            />

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Offset X"
                value={backgroundSettings.shadowOffsetX}
                onChange={(value) => onUpdate({ shadowOffsetX: value })}
                min={-50}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Offset Y"
                value={backgroundSettings.shadowOffsetY}
                onChange={(value) => onUpdate({ shadowOffsetY: value })}
                min={-50}
                max={50}
                unit="px"
              />
            </div>
          </div>
        )}
      </div>

      {/* Transformations */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Transformations</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Rotate"
            value={backgroundSettings.rotation}
            onChange={(value) => onUpdate({ rotation: value })}
            min={-180}
            max={180}
            unit="°"
          />
          <NumberInput
            label="Scale"
            value={backgroundSettings.scale}
            onChange={(value) => onUpdate({ scale: value })}
            min={0.1}
            max={3}
            step={0.1}
            unit="x"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onUpdate({ 
          opacity: 100,
          brightness: 100, 
          contrast: 100, 
          blur: 0, 
          saturation: 100,
          shadowEnabled: false,
          shadowBlur: 10,
          shadowColor: '#000000',
          shadowOffsetX: 15,
          shadowOffsetY: 15,
          shadowOpacity: 100,
          rotation: 0,
          scale: 1
        })}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl transition-all duration-300 border border-purple-400/30 text-white font-medium"
      >
        Reset Background Settings
      </button>
    </div>
  );
};

export default BackgroundControls;