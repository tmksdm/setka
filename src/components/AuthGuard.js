// src/components/AuthGuard.js
// Защита маршрутов — перенаправляет на /login если не авторизован

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Когда загрузка завершена и пользователя нет — перенаправляем
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // Пока проверяем авторизацию — показываем индикатор загрузки
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          backgroundColor: 'var(--color-screen-bg)',
        }}
      >
        <Loader2
          size={32}
          style={{ color: 'var(--color-primary-light)', animation: 'spin 1s linear infinite' }}
        />
      </div>
    );
  }

  // Если пользователь не авторизован — не показываем контент (идёт редирект)
  if (!user) {
    return null;
  }

  // Пользователь авторизован — показываем страницу
  return children;
}
