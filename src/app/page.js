// src/app/page.js
// Главная страница — пока заглушка, обёрнута в AuthGuard

'use client';

import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function HomePage() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  );
}

function HomeContent() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-screen-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-header-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          color: 'var(--color-header-text)',
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        С
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Сетка
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
        Учёт клиентов зала
      </p>

      {/* Информация о пользователе */}
      <div
        style={{
          marginTop: '32px',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-card-bg)',
          boxShadow: '0 2px 8px var(--color-shadow)',
          border: '1px solid var(--color-card-border)',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 4px' }}>
          Вы вошли как
        </p>
        <p style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 2px', color: 'var(--color-text-primary)' }}>
          {user?.displayName || 'Пользователь'}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>
          {user?.email}
        </p>
      </div>

      {/* Кнопка переключения темы — временная, потом переедет в dropdown-меню */}
      <button
        onClick={toggleTheme}
        style={{
          marginTop: '20px',
          padding: '10px 24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-primary-light)',
          backgroundColor: 'transparent',
          color: 'var(--color-primary-light)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      </button>

      {/* Кнопка выхода — временная, потом будет в меню */}
      <button
        onClick={signOut}
        style={{
          marginTop: '12px',
          padding: '10px 24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-status-overdue)',
          backgroundColor: 'transparent',
          color: 'var(--color-status-overdue)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Выйти
      </button>

      <p
        style={{
          marginTop: '40px',
          color: 'var(--color-text-secondary)',
          fontSize: '13px',
        }}
      >
        Шаг 3 завершён — тема работает!
      </p>
    </div>
  );
}
