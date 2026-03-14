// src/components/ui/AppHeader.js
// Шапка приложения — два режима: главная (main) и внутренняя (sub)

'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { IconButton } from '@/components/ui/Button';

/**
 * Компонент AppHeader
 *
 * Режим "main" (главный экран):
 *   <AppHeader
 *     variant="main"
 *     title="Сетка"
 *     subtitle="12 клиентов"
 *     rightActions={[
 *       { icon: Plus, onClick: handleAdd, label: 'Добавить' },
 *       { icon: EllipsisVertical, onClick: openMenu, label: 'Меню' },
 *     ]}
 *   >
 *     <SearchBar />
 *     <UrgencyBanner />
 *   </AppHeader>
 *
 * Режим "sub" (внутренние страницы):
 *   <AppHeader
 *     variant="sub"
 *     title="Добавить клиента"
 *     onBack={() => router.back()}
 *     rightActions={[
 *       { icon: Check, onClick: handleSave, label: 'Сохранить' },
 *     ]}
 *   />
 *
 * Props:
 *   variant      — 'main' | 'sub' (по умолчанию 'sub')
 *   title        — заголовок (обязательный)
 *   subtitle     — подзаголовок (только для main)
 *   onBack       — обработчик кнопки «Назад» (только для sub; если не указан — router.back())
 *   rightActions — массив кнопок справа: [{ icon, onClick, label, disabled }]
 *   children     — слот под шапкой (поиск, баннер — только для main)
 */
export default function AppHeader({
  variant = 'sub',
  title,
  subtitle,
  onBack,
  rightActions = [],
  children,
}) {
  if (variant === 'main') {
    return (
      <MainHeader
        title={title}
        subtitle={subtitle}
        rightActions={rightActions}
      >
        {children}
      </MainHeader>
    );
  }

  return (
    <SubHeader
      title={title}
      onBack={onBack}
      rightActions={rightActions}
    />
  );
}

/* ==========================================
   MainHeader — шапка главного экрана
   ========================================== */

function MainHeader({ title, subtitle, rightActions, children }) {
  return (
    <div style={{ flexShrink: 0 }}>
      {/* Цветной блок шапки */}
      <div
        style={{
          backgroundColor: 'var(--color-header-bg)',
          color: 'var(--color-header-text)',
          paddingTop: 'max(env(safe-area-inset-top), 12px)',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: '0',
        }}
      >
        {/* Верхняя строка: заголовок + кнопки */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '44px',
          }}
        >
          {/* Заголовок и подзаголовок */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  opacity: 0.7,
                  margin: '2px 0 0 0',
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Кнопки справа */}
          {rightActions.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '12px',
                flexShrink: 0,
              }}
            >
              {rightActions.map((action, index) => (
                <IconButton
                  key={index}
                  icon={action.icon}
                  variant="header"
                  size={38}
                  iconSize={20}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  label={action.label || ''}
                />
              ))}
            </div>
          )}
        </div>

        {/* Слот для дочерних элементов (поиск, баннер) */}
        {children && (
          <div style={{ paddingTop: '10px', paddingBottom: '14px' }}>
            {children}
          </div>
        )}

        {/* Если нет children, добавляем небольшой отступ снизу */}
        {!children && <div style={{ height: '14px' }} />}
      </div>

      {/* Плавный переход — скруглённый «язычок» */}
      <div
        style={{
          height: '16px',
          backgroundColor: 'var(--color-screen-bg)',
          marginTop: '-1px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-16px',
            left: 0,
            right: 0,
            height: '16px',
            backgroundColor: 'var(--color-header-bg)',
            borderBottomLeftRadius: 'var(--radius-xl)',
            borderBottomRightRadius: 'var(--radius-xl)',
          }}
        />
      </div>
    </div>
  );
}

/* ==========================================
   SubHeader — шапка внутренних страниц
   ========================================== */

function SubHeader({ title, onBack, rightActions }) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div
      style={{
        flexShrink: 0,
        backgroundColor: 'var(--color-header-bg)',
        color: 'var(--color-header-text)',
        paddingTop: 'max(env(safe-area-inset-top), 8px)',
        paddingLeft: '6px',
        paddingRight: '10px',
        paddingBottom: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '44px',
        }}
      >
        {/* Кнопка «Назад» */}
        <IconButton
          icon={ChevronLeft}
          variant="header"
          size={38}
          iconSize={24}
          onClick={handleBack}
          label="Назад"
        />

        {/* Заголовок — по центру доступного пространства */}
        <h1
          style={{
            flex: 1,
            fontSize: '17px',
            fontWeight: 600,
            lineHeight: 1.2,
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: '4px',
            paddingRight: rightActions.length > 0 ? '4px' : '38px',
          }}
        >
          {title}
        </h1>

        {/* Кнопки справа (или пустой блок для центрирования заголовка) */}
        {rightActions.length > 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            {rightActions.map((action, index) => (
              <IconButton
                key={index}
                icon={action.icon}
                variant="header"
                size={38}
                iconSize={20}
                onClick={action.onClick}
                disabled={action.disabled}
                label={action.label || ''}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
