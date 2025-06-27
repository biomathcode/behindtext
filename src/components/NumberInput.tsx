import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(Math.min(Math.max(newValue, min || -Infinity), max || Infinity));
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-full h-8 px-3 pr-8 bg-black/20 border border-white/20 rounded-lg text-white text-sm backdrop-blur-sm focus:border-purple-400/50 focus:outline-none transition-colors"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberInput;