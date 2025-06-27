import React from 'react';
import { SubjectSettings } from '../types';
import ColorPicker from './ColorPicker';
import NumberInput from './NumberInput';

interface SubjectControlsProps {
  subjectSettings: SubjectSettings;
  onUpdate: (updates: Partial<SubjectSettings>) => void;
  onCreateSticker?: () => void;
  isStickerProcessing?: boolean;
}

const SubjectControls: React.FC<SubjectControlsProps> = ({ 
  subjectSettings, 
  onUpdate, 
  onCreateSticker,
  isStickerProcessing = false
}) => {
  return (
    <div className="space-y-6">
      {/* Sticker Effect */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Sticker Effect</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={subjectSettings.stickerEnabled}
              onChange={(e) => onUpdate({ stickerEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 border border-white/20"></div>
          </label>
        </div>
        
        {subjectSettings.stickerEnabled && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Border Width"
                value={subjectSettings.stickerBorderWidth}
                onChange={(value) => onUpdate({ stickerBorderWidth: value })}
                min={0}
                max={20}
                unit="px"
              />
              <ColorPicker
                label="Border Color"
                color={subjectSettings.stickerBorderColor}
                onChange={(color) => onUpdate({ stickerBorderColor: color })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Shadow Blur"
                value={subjectSettings.stickerShadowBlur}
                onChange={(value) => onUpdate({ stickerShadowBlur: value })}
                min={0}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Shadow Opacity"
                value={subjectSettings.stickerShadowOpacity}
                onChange={(value) => onUpdate({ stickerShadowOpacity: value })}
                min={0}
                max={100}
                unit="%"
              />
            </div>

            <ColorPicker
              label="Shadow Color"
              color={subjectSettings.stickerShadowColor}
              onChange={(color) => onUpdate({ stickerShadowColor: color })}
            />

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Shadow X"
                value={subjectSettings.stickerShadowOffsetX}
                onChange={(value) => onUpdate({ stickerShadowOffsetX: value })}
                min={-50}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Shadow Y"
                value={subjectSettings.stickerShadowOffsetY}
                onChange={(value) => onUpdate({ stickerShadowOffsetY: value })}
                min={-50}
                max={50}
                unit="px"
              />
            </div>

            {onCreateSticker && (
              <button
                onClick={onCreateSticker}
                disabled={isStickerProcessing}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 disabled:from-gray-500/20 disabled:to-gray-500/20 disabled:cursor-not-allowed rounded-xl transition-all duration-300 border border-purple-400/30 disabled:border-gray-400/30 text-white font-medium flex items-center justify-center gap-2"
              >
                {isStickerProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Sticker...
                  </>
                ) : (
                  'Apply Sticker Effect'
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Image Opacity */}
      <div className="space-y-3 p-4 bg-black/10 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Image Opacity</h4>
        
        <NumberInput
          label="Opacity"
          value={subjectSettings.opacity}
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
            value={subjectSettings.brightness}
            onChange={(value) => onUpdate({ brightness: value })}
            min={0}
            max={200}
            unit="%"
          />
          <NumberInput
            label="Contrast"
            value={subjectSettings.contrast}
            onChange={(value) => onUpdate({ contrast: value })}
            min={0}
            max={200}
            unit="%"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Saturation"
            value={subjectSettings.saturation}
            onChange={(value) => onUpdate({ saturation: value })}
            min={0}
            max={200}
            unit="%"
          />
          <NumberInput
            label="Blur"
            value={subjectSettings.blur}
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
              checked={subjectSettings.shadowEnabled}
              onChange={(e) => onUpdate({ shadowEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 border border-white/20"></div>
          </label>
        </div>
        
        {subjectSettings.shadowEnabled && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Blur"
                value={subjectSettings.shadowBlur}
                onChange={(value) => onUpdate({ shadowBlur: value })}
                min={0}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Opacity"
                value={subjectSettings.shadowOpacity}
                onChange={(value) => onUpdate({ shadowOpacity: value })}
                min={0}
                max={100}
                unit="%"
              />
            </div>

            <ColorPicker
              label="Color"
              color={subjectSettings.shadowColor}
              onChange={(color) => onUpdate({ shadowColor: color })}
            />

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Offset X"
                value={subjectSettings.shadowOffsetX}
                onChange={(value) => onUpdate({ shadowOffsetX: value })}
                min={-50}
                max={50}
                unit="px"
              />
              <NumberInput
                label="Offset Y"
                value={subjectSettings.shadowOffsetY}
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
            value={subjectSettings.rotation}
            onChange={(value) => onUpdate({ rotation: value })}
            min={-180}
            max={180}
            unit="°"
          />
          <NumberInput
            label="Scale"
            value={subjectSettings.scale}
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
          scale: 1,
          stickerEnabled: false,
          stickerBorderWidth: 5,
          stickerBorderColor: '#ffffff',
          stickerShadowBlur: 10,
          stickerShadowColor: '#000000',
          stickerShadowOffsetX: 5,
          stickerShadowOffsetY: 5,
          stickerShadowOpacity: 50
        })}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-green-500/20 hover:from-blue-500/30 hover:to-green-500/30 rounded-xl transition-all duration-300 border border-blue-400/30 text-white font-medium"
      >
        Reset Subject Settings
      </button>
    </div>
  );
};

export default SubjectControls;