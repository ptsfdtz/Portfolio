import React, { useRef, useState, useEffect, type JSX } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaDownload } from 'react-icons/fa6';

interface DropdownProps {
  assets: { name: string; url: string }[];
  recommendedAsset?: { name: string; url: string };
  getAssetIcon: (name: string) => JSX.Element;
  isCompatible: (name: string) => boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  assets,
  recommendedAsset,
  getAssetIcon,
  isCompatible,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 transition-all text-left min-w-[200px]"
      >
        <span className="text-gray-500 dark:text-gray-400 shrink-0">
          {recommendedAsset ? (
            getAssetIcon(recommendedAsset.name)
          ) : (
            <FaDownload className="w-4 h-4" />
          )}
        </span>
        <div className="flex flex-col overflow-hidden flex-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate leading-none">
            {recommendedAsset ? recommendedAsset.name : 'Download'}
          </span>
          {recommendedAsset && (
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 truncate leading-none mt-0.5">
              Recommended
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-20 top-full left-0 mt-2 w-72 py-1 rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl max-h-64 overflow-y-auto">
          {assets.map(asset => {
            const compatible = isCompatible(asset.name);
            return (
              <a
                key={asset.url}
                href={asset.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors ${
                  compatible ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                <span
                  className={
                    compatible
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }
                >
                  {getAssetIcon(asset.name)}
                </span>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-sm font-medium truncate ${
                      compatible
                        ? 'text-indigo-900 dark:text-indigo-100'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {asset.name}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
