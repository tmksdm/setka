// src/components/ui/Button.js
// Универсальная кнопка — варианты, размеры, иконка, загрузка

'use client';

import { Loader2 } from 'lucide-react';

/**
 * Компонент Button
 *
 * Использование:
 *   import Button from '@/components/ui/Button';
 *   import { Plus, Save } from 'lucide-react';
 *
 *   <Button onClick={handleClick}>Сохранить</Button>
 *   <Button variant="danger" icon={Trash2}>Удалить</Button>
 *   <Button variant="outline" size="sm" icon={Plus}>Добавить</Button>
 *   <Button loading fullWidth>Загрузка...</Button>
 *
 * Props:
 *   variant    — 'primary' | 'success' | 'danger' | 'outline' | 'ghost' (по умолчанию 'primary')
 *   size       — 'sm' | 'md' | 'lg' (по умолчанию 'md')
 *   icon       — компонент иконки из lucide-react (необязательный)
 *   iconRight  — иконка справа от текста (необязательный)
 *   loading    — показывать спиннер и заблокировать кнопку
 *   disabled   — заблокировать кнопку
 *   fullWidth  — растянуть на всю ширину
 *   children   — текст кнопки
 *   onClick    — обработчик клика
 *   type       — тип кнопки ('button' | 'submit'), по умолчанию 'button'
 *   className  — дополнительный CSS-класс
 *   style      — дополнительные inline-стили
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon: IconLeft,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...rest
}) {
  const isDisabled = disabled || loading;

  // --- Размеры ---
  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: '13px',
      gap: '5px',
      iconSize: 15,
      borderRadius: 'var(--radius-sm)',
      minHeight: '32px',
    },
    md: {
      padding: '9px 18px',
      fontSize: '14px',
      gap: '7px',
      iconSize: 18,
      borderRadius: 'var(--radius-md)',
      minHeight: '40px',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '15px',
      gap: '8px',
      iconSize: 20,
      borderRadius: 'var(--radius-md)',
      minHeight: '48px',
    },
  };

  // --- Варианты (цвета) ---
  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary-light)',
      color: '#FFFFFF',
      border: 'none',
    },
    success: {
      backgroundColor: 'var(--color-success)',
      color: '#FFFFFF',
      border: 'none',
    },
    danger: {
      backgroundColor: 'var(--color-danger)',
      color: '#FFFFFF',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary-light)',
      border: '1.5px solid var(--color-primary-light)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 'none',
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 500,
    lineHeight: 1.2,
    minHeight: s.minHeight,
    borderRadius: s.borderRadius,
    backgroundColor: v.backgroundColor,
    color: v.color,
    border: v.border,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.55 : 1,
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    transition: 'opacity 0.15s ease, transform 0.1s ease',
    ...style,
  };

  // Иконка слева (или спиннер при загрузке)
  const renderLeftIcon = () => {
    if (loading) {
      return (
        <Loader2
          size={s.iconSize}
          style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}
        />
      );
    }
    if (IconLeft) {
      return <IconLeft size={s.iconSize} style={{ flexShrink: 0 }} />;
    }
    return null;
  };

  // Иконка справа
  const renderRightIcon = () => {
    if (IconRight && !loading) {
      return <IconRight size={s.iconSize} style={{ flexShrink: 0 }} />;
    }
    return null;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={className}
      style={buttonStyle}
      {...rest}
    >
      {renderLeftIcon()}
      {children}
      {renderRightIcon()}
    </button>
  );
}

/**
 * Кнопка-иконка (круглая, для шапки и действий)
 *
 * Использование:
 *   import { IconButton } from '@/components/ui/Button';
 *   import { Plus, Menu } from 'lucide-react';
 *
 *   <IconButton icon={Plus} onClick={handleAdd} />
 *   <IconButton icon={Menu} variant="header" onClick={openMenu} />
 *
 * Props:
 *   icon       — компонент иконки из lucide-react (обязательный)
 *   size       — размер кнопки в пикселях (по умолчанию 40)
 *   iconSize   — размер иконки (по умолчанию 20)
 *   variant    — 'header' (полупрозрачная белая) | 'default' (по цвету темы)
 *   onClick    — обработчик клика
 *   disabled   — заблокировать
 *   label      — aria-label для доступности
 */
export function IconButton({
  icon: LucideIcon,
  size = 40,
  iconSize = 20,
  variant = 'default',
  onClick,
  disabled = false,
  label = '',
  className = '',
  style = {},
  ...rest
}) {
  if (!LucideIcon) return null;

  const variants = {
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      color: 'var(--color-header-text)',
    },
    default: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
    },
  };

  const v = variants[variant] || variants.default;

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: 'var(--radius-full)',
    backgroundColor: v.backgroundColor,
    color: v.color,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
    WebkitTapHighlightColor: 'transparent',
    transition: 'opacity 0.15s ease, background-color 0.15s ease',
    ...style,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={className}
      style={buttonStyle}
      {...rest}
    >
      <LucideIcon size={iconSize} />
    </button>
  );
}
