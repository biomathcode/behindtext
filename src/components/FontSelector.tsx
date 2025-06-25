import React, { useState } from 'react';
import Select, { GroupBase, StylesConfig } from 'react-select';
import { loadFont, getFontOptions } from '../utils/fontLoader';

interface FontOption {
  value: string;
  label: string;
  category: string;
}

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fontOptions = getFontOptions();

  const handleFontChange = async (selectedOption: FontOption | null) => {
    if (!selectedOption) return;

    setIsLoading(true);
    try {
      await loadFont(selectedOption.value);
      onChange(selectedOption.value);
    } catch (error) {
      console.error('Error loading font:', error);
      // Still update the font even if loading fails (fallback will be used)
      onChange(selectedOption.value);
    } finally {
      setIsLoading(false);
    }
  };

  const customStyles: StylesConfig<FontOption, false, GroupBase<FontOption>> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '8px',
      color: 'white',
      backdropFilter: 'blur(4px)',
      borderColor: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.2)',
      boxShadow: state.isFocused ? '0 0 0 1px rgba(59, 130, 246, 0.5)' : 'none',
      '&:hover': {
        borderColor: 'rgba(59, 130, 246, 0.5)',
      },
      minHeight: '48px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      maxHeight: '300px',
    }),
    group: (provided) => ({
      ...provided,
      padding: 0,
    }),
    groupHeading: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      color: 'rgba(147, 197, 253, 1)',
      fontSize: '12px',
      fontWeight: '600',
      padding: '8px 12px',
      margin: 0,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'rgba(59, 130, 246, 0.3)' 
        : state.isFocused 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'transparent',
      color: 'white',
      padding: '12px 16px',
      fontFamily: state.data.category === 'Google Fonts' ? state.data.value : 'inherit',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
      fontFamily: value,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(156, 163, 175, 1)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'rgba(156, 163, 175, 1)',
      '&:hover': {
        color: 'white',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: 'rgba(59, 130, 246, 1)',
    }),
  };

  const selectedOption = fontOptions
    .flatMap(group => group.options)
    .find(option => option.value === value);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">Font Family</label>
      <Select<FontOption, false, GroupBase<FontOption>>
        value={selectedOption}
        onChange={handleFontChange}
        options={fontOptions}
        styles={customStyles}
        isLoading={isLoading}
        isSearchable
        placeholder="Search fonts..."
        className="font-selector"
        classNamePrefix="font-selector"
        formatGroupLabel={(group) => (
          <div className="flex items-center justify-between">
            <span>{group.label}</span>
            <span className="text-xs opacity-60">({group.options.length})</span>
          </div>
        )}
        filterOption={(option, inputValue) => {
          return option.label.toLowerCase().includes(inputValue.toLowerCase());
        }}
        noOptionsMessage={({ inputValue }) => 
          inputValue ? `No fonts found matching "${inputValue}"` : 'No fonts available'
        }
      />
      {isLoading && (
        <div className="text-xs text-blue-400 flex items-center gap-2">
          <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          Loading font...
        </div>
      )}
    </div>
  );
};

export default FontSelector;