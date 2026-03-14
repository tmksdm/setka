// src/app/login/page.js
// Страница входа — логотип + кнопка Google Sign-In

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Loader2, ShieldX } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, error, signIn } = useAuth();
  const router = useRouter();

  // Если пользователь уже авторизован — перенаправляем на главную
  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  // Пока проверяем — показываем загрузку
  if (loading) {
    return (
      <div className="login-container">
        <Loader2
          size={32}
          style={{ color: 'var(--color-primary-light)', animation: 'spin 1s linear infinite' }}
        />
      </div>
    );
  }

  // Если уже вошёл — не показываем форму (идёт редирект)
  if (user) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Логотип */}
        <div className="login-logo">
          <div className="login-logo-icon">С</div>
          <h1 className="login-title">Сетка</h1>
          <p className="login-subtitle">Учёт клиентов спортзала</p>
        </div>

        {/* Ошибка (например, «Доступ запрещён») */}
        {error && (
          <div className="login-error">
            <ShieldX size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Кнопка входа */}
        <button onClick={signIn} className="login-button">
          <LogIn size={20} />
          <span>Войти через Google</span>
        </button>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100dvh;
          padding: 24px;
          background-color: var(--color-screen-bg);
        }

        .login-card {
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .login-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .login-logo-icon {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-xl);
          background-color: var(--color-primary);
          color: var(--color-header-text);
          font-size: 36px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px var(--color-shadow);
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0;
        }

        .login-subtitle {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background-color: color-mix(in srgb, var(--color-status-overdue) 12%, transparent);
          color: var(--color-status-overdue);
          font-size: 14px;
          width: 100%;
          text-align: left;
        }

        .login-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: var(--radius-md);
          background-color: var(--color-primary);
          color: var(--color-header-text);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }

        .login-button:active {
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}
