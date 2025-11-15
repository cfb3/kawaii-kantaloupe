'use client';

import { useState, useRef, useEffect } from 'react';
import { Series, getSeriesDisplayText } from '@/types';

interface SeriesDropdownProps {
  value: Series | 'all';
  onChange: (value: Series | 'all') => void;
}

export default function SeriesDropdown({ value, onChange }: SeriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get color classes for each series
  const getSeriesColor = (series: Series | 'all') => {
    if (series === 'all') return 'text-pink-500 border-pink-500';
    switch (series) {
      case Series.Halloween:
        return 'text-orange-500 border-orange-500';
      case Series.One:
        return 'text-fuchsia-500 border-fuchsia-500';
      case Series.Two:
        return 'text-rose-300 border-rose-300';
      default:
        return 'text-gray-600 border-gray-600';
    }
  };

  // Get hover color classes
  const getHoverColor = (series: Series | 'all') => {
    if (series === 'all') return 'hover:bg-pink-50';
    switch (series) {
      case Series.Halloween:
        return 'hover:bg-orange-50';
      case Series.One:
        return 'hover:bg-fuchsia-50';
      case Series.Two:
        return 'hover:bg-rose-50';
      default:
        return 'hover:bg-gray-50';
    }
  };

  const getDisplayLabel = (val: Series | 'all') => {
    if (val === 'all') return 'All Series';
    const displayText = getSeriesDisplayText(val);
    return displayText === val ? `Series: ${displayText}` : displayText;
  };

  const options: (Series | 'all')[] = ['all', Series.Halloween, Series.One, Series.Two];

  return (
    <div className="relative inline-block w-full max-w-xs" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-5 py-3 rounded-full font-semibold transition-all duration-300
          bg-white border-2 shadow-md
          flex items-center justify-between
          ${getSeriesColor(value)}
          hover:shadow-lg
        `}
      >
        <span>{getDisplayLabel(value)}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`
                w-full px-5 py-3 text-left font-semibold transition-all duration-200
                ${getSeriesColor(option)}
                ${getHoverColor(option)}
                ${value === option ? 'bg-gray-50' : ''}
                flex items-center justify-between
              `}
            >
              <span>{getDisplayLabel(option)}</span>
              {value === option && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
