import React from 'react';
import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import type { ThemeMode } from '../types';

interface HeaderProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-100 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-10xl mx-auto px-6 sm:h-18 h-16 flex justify-between items-center">
        {/* Minimal Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <Layers className="w-5 h-5 text-gray-900 dark:text-gray-100" />
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100">
            My Portfolio
          </span>
        </Link>

        {/* Theme Toggle Only */}
        <ThemeToggle currentTheme={currentTheme} onThemeChange={onThemeChange} />
      </div>
    </header>
  );
};

export default Header;
