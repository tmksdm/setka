// src/components/ui/Icon.js
// Обёртка для lucide-react иконок — единый размер и цвет

'use client';

/**
 * Компонент Icon
 * 
 * Использование:
 *   import { Icon } from '@/components/ui/Icon';
 *   import { Plus, Moon } from 'lucide-react';
 * 
 *   <Icon icon={Plus} />
 *   <Icon icon={Moon} size={20} color="var(--color-primary-light)" />
 * 
 * Props:
 *   icon       — компонент иконки из lucide-react (обязательный)
 *   size       — размер в пикселях (по умолчанию 20)
 *   color      — цвет (по умолчанию 'currentColor')
 *   strokeWidth — толщина линий (по умолчанию 2)
 *   className  — дополнительный CSS-класс
 *   style      — дополнительные inline-стили
 */
export default function Icon({
  icon: LucideIcon,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  style = {},
  ...rest
}) {
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ flexShrink: 0, ...style }}
      {...rest}
    />
  );
}
