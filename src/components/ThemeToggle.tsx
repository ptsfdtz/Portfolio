import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import type { ThemeMode } from '../types';

interface ThemeToggleProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <Sun className="w-6 h-6" />;
      case 'dark':
        return <Moon className="w-6 h-6" />;
      case 'system':
        return <Monitor className="w-6 h-6" />;
    }
  };

  const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'light', icon: <Sun className="w-6 h-6" /> },
    { value: 'dark', label: 'dark', icon: <Moon className="w-6 h-6" /> },
    { value: 'system', label: 'system', icon: <Monitor className="w-6 h-6" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        aria-label="Toggle theme"
      >
        {getIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-50 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-100 dark:border-neutral-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onThemeChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors
                ${currentTheme === option.value ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'}
              `}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <span>{option.label}</span>
              </div>
              {currentTheme === option.value && <Check className="w-5 h-5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
