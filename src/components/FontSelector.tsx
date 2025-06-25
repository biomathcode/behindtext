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
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '4px 8px',
      color: 'white',
      minHeight: '48px',
      boxShadow: state.isFocused 
        ? '0 0 0 1px rgba(139, 92, 246, 0.5), 0 8px 32px rgba(139, 92, 246, 0.15)' 
        : '0 4px 16px rgba(0, 0, 0, 0.1)',
      borderColor: state.isFocused ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderColor: 'rgba(139, 92, 246, 0.4)',
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 24px rgba(139, 92, 246, 0.1)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      overflow: 'hidden',
      zIndex: 9999,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      animation: 'menuSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '8px',
      maxHeight: '320px',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.7))',
      },
    }),
    group: (provided) => ({
      ...provided,
      padding: 0,
      marginBottom: '8px',
    }),
    groupHeading: (provided) => ({
      ...provided,
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
      color: 'rgba(196, 181, 253, 1)',
      fontSize: '11px',
      fontWeight: '600',
      padding: '8px 12px',
      margin: '0 0 4px 0',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      borderRadius: '8px',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      backdropFilter: 'blur(8px)',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected 
        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))' 
        : state.isFocused 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'transparent',
      color: 'white',
      padding: '12px 16px',
      fontFamily: state.data.category === 'Google Fonts' ? state.data.value : 'inherit',
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '8px',
      margin: '2px 0',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: state.isSelected ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
      '&:hover': {
        background: state.isSelected 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))'
          : 'rgba(255, 255, 255, 0.12)',
        transform: 'translateX(4px)',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
      },
      '&:active': {
        transform: 'translateX(2px) scale(0.98)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
      fontFamily: value,
      fontWeight: '500',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(156, 163, 175, 0.8)',
      fontWeight: '400',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'rgba(139, 92, 246, 0.8)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: 'rgba(139, 92, 246, 1)',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: 'rgba(139, 92, 246, 1)',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
      '& input': {
        color: 'white !important',
      },
    }),
  };

  const selectedOption = fontOptions
    .flatMap(group => group.options)
    .find(option => option.value === value);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">Font Family</label>
      <div className="relative">
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
              <span className="text-xs opacity-60 bg-white/10 px-2 py-1 rounded-full">
                {group.options.length}
              </span>
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
          <div className="absolute top-full left-0 mt-2 text-xs text-purple-400 flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-400/30">
            <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            Loading font...
          </div>
        )}
      </div>
    </div>
  );
};

export default FontSelector;