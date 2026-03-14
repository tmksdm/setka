// src/components/ui/PageWrapper.js
// Обёртка страницы — фон, минимальная высота, анимация появления

'use client';

/**
 * Компонент PageWrapper
 *
 * Использование:
 *   import PageWrapper from '@/components/ui/PageWrapper';
 *
 *   export default function SomePage() {
 *     return (
 *       <PageWrapper>
 *         <AppHeader title="Заголовок" />
 *         <div>Контент страницы</div>
 *       </PageWrapper>
 *     );
 *   }
 *
 * Props:
 *   children  — содержимое страницы (шапка + контент)
 *   animate   — включить анимацию появления (по умолчанию true)
 *   className — дополнительный CSS-класс
 *   style     — дополнительные inline-стили
 */
export default function PageWrapper({
  children,
  animate = true,
  className = '',
  style = {},
}) {
  const wrapperStyle = {
    minHeight: '100dvh',
    backgroundColor: 'var(--color-screen-bg)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    animation: animate ? 'fadeIn 0.2s ease' : 'none',
    ...style,
  };

  return (
    <div className={className} style={wrapperStyle}>
      {children}
    </div>
  );
}
