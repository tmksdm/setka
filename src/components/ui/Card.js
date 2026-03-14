// src/components/ui/Card.js
// Универсальная карточка — цветная полоска слева, тень/рамка по теме

'use client';

/**
 * Компонент Card
 *
 * Использование:
 *   import Card from '@/components/ui/Card';
 *
 *   <Card>Простая карточка с отступами</Card>
 *   <Card leftBorderColor="var(--color-status-overdue)">Красная полоска</Card>
 *   <Card noPadding>Контент без отступов</Card>
 *   <Card onClick={handleClick}>Кликабельная карточка</Card>
 *
 * Props:
 *   leftBorderColor — цвет левой полоски (3px), если не указан — нет полоски
 *   noPadding       — убрать внутренние отступы (для кастомной вёрстки внутри)
 *   onClick         — обработчик клика (карточка становится кликабельной)
 *   children        — содержимое карточки
 *   className       — дополнительный CSS-класс
 *   style           — дополнительные inline-стили
 */
export default function Card({
  leftBorderColor,
  noPadding = false,
  onClick,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const isClickable = typeof onClick === 'function';

  const cardStyle = {
    position: 'relative',
    backgroundColor: 'var(--color-card-bg)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--color-card-border)',
    borderLeft: leftBorderColor
      ? `3px solid ${leftBorderColor}`
      : '1px solid var(--color-card-border)',
    padding: noPadding ? '0' : '12px 14px',
    overflow: 'hidden',
    cursor: isClickable ? 'pointer' : 'default',
    WebkitTapHighlightColor: 'transparent',
    transition: 'transform 0.1s ease, box-shadow 0.15s ease',
    ...style,
  };

  // Обработка нажатия с микро-анимацией
  const handleTouchStart = (e) => {
    if (isClickable) {
      e.currentTarget.style.transform = 'scale(0.985)';
    }
  };

  const handleTouchEnd = (e) => {
    if (isClickable) {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  // Используем <div>, а не <button>, чтобы внутри можно было размещать кнопки
  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={className}
      style={cardStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
