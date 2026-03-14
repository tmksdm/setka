// src/context/ThemeContext.js
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Контекст темы
const ThemeContext = createContext(undefined);

const STORAGE_KEY = 'setka_theme';

export function ThemeProvider({ children }) {
  // Начальное значение — null, пока не прочитаем из localStorage
  // (блокирующий скрипт в <head> уже выставил класс .dark, 
  //  поэтому визуально тема правильная с первого кадра)
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // При монтировании читаем тему из localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    setMounted(true);
  }, []);

  // При изменении темы — обновляем класс на <html> и сохраняем
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  // Переключение темы
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Хук для использования темы в компонентах
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
