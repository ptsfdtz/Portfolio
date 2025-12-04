import { useEffect, useState, useCallback } from 'react';
import type { ThemeMode } from '../types';

const STORAGE_KEY = 'theme-preference';

const prefersDark = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch {
    // ignore storage errors
  }
  return 'system';
};

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredTheme());

  const apply = useCallback((m: ThemeMode) => {
    const isDark = m === 'dark' || (m === 'system' && prefersDark());
    const html = document.documentElement;
    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');

    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      // ignore write errors
    }
  }, []);

  useEffect(() => {
    apply(mode);

    const mq =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    if (!mq) return;

    const onChange = () => {
      if (mode === 'system') apply('system');
    };

    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [mode, apply]);

  const setTheme = useCallback((t: ThemeMode) => setMode(t), []);

  return { theme: mode, setTheme } as const;
}
