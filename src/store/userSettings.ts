import { create } from 'zustand';

export type ThemeOption = 'system' | 'light' | 'dark';

interface UserSettingsState {
  showGrid: boolean;
  toggleGrid: () => void;
  theme: ThemeOption;
  setTheme: (t: ThemeOption) => void;
  fontSize: number;
  toggleFontSize: () => void;
}

const STORAGE_KEY = 'theme-preference';

function readStoredTheme(): ThemeOption {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return (raw as ThemeOption) || 'system';
  } catch {
    return 'system';
  }
}

export const useUserSettings = create<UserSettingsState>(set => ({
  showGrid: true,
  toggleGrid: () => set(state => ({ showGrid: !state.showGrid })),
  theme: typeof window !== 'undefined' ? readStoredTheme() : 'system',
  setTheme: t => set(() => ({ theme: t })),
  fontSize: 16,
  toggleFontSize: () => set(state => ({ fontSize: state.fontSize === 16 ? 20 : 16 })),
}));

// Keep theme in sync: apply class to <html> and persist to localStorage
if (typeof window !== 'undefined') {
  const apply = (t: ThemeOption) => {
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = t === 'dark' || (t === 'system' && prefersDark);
    const html = document.documentElement;
    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch (err) {
      console.error('Failed to save theme preference:', err);
    }
  };

  // apply initially
  apply(useUserSettings.getState().theme);

  // subscribe to changes
  useUserSettings.subscribe(state => {
    apply(state.theme);
  });
}
