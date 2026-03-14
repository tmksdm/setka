// src/context/AuthContext.js
// Контекст авторизации — отслеживает состояние входа, проверяет whitelist

'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';

// Создаём контекст
const AuthContext = createContext(null);

// Проверяем, есть ли email пользователя в списке разрешённых
async function checkAllowedUser(email) {
  try {
    const docRef = doc(db, 'allowedUsers', email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Ошибка проверки доступа:', error);
    return false;
  }
}

// Провайдер — оборачивает всё приложение
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Данные пользователя Firebase
  const [loading, setLoading] = useState(true);  // Загрузка (проверяем авторизацию)
  const [error, setError] = useState(null);      // Ошибка (доступ запрещён и т.д.)

  // Слушаем изменения состояния авторизации Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Пользователь вошёл — проверяем whitelist
        const isAllowed = await checkAllowedUser(firebaseUser.email);
        if (isAllowed) {
          setUser(firebaseUser);
          setError(null);
        } else {
          // Email не в списке — выходим и показываем ошибку
          await firebaseSignOut(auth);
          setUser(null);
          setError('Доступ запрещён. Ваш email не в списке разрешённых.');
        }
      } else {
        // Пользователь не авторизован
        setUser(null);
      }
      setLoading(false);
    });

    // Отписываемся при размонтировании
    return () => unsubscribe();
  }, []);

  // Функция входа через Google
  const signIn = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      // Пробуем popup (работает на десктопе и части мобильных)
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged обработает результат
    } catch (popupError) {
      // Если popup заблокирован — пробуем redirect (надёжнее на мобильных)
      if (
        popupError.code === 'auth/popup-blocked' ||
        popupError.code === 'auth/popup-closed-by-user' ||
        popupError.code === 'auth/cancelled-popup-request'
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
          // После redirect пользователь вернётся на страницу,
          // и onAuthStateChanged подхватит результат
        } catch (redirectError) {
          console.error('Ошибка входа (redirect):', redirectError);
          setError('Не удалось войти. Попробуйте ещё раз.');
          setLoading(false);
        }
      } else {
        console.error('Ошибка входа (popup):', popupError);
        setError('Не удалось войти. Попробуйте ещё раз.');
        setLoading(false);
      }
    }
  }, []);

  // Функция выхода
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Ошибка выхода:', err);
    }
  }, []);

  const value = { user, loading, error, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Хук для использования в компонентах
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}
