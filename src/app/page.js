// src/app/page.js
// Главная страница — демо UI-компонентов (Шаг 4)

'use client';

import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import PageWrapper from '@/components/ui/PageWrapper';
import AppHeader from '@/components/ui/AppHeader';
import Card from '@/components/ui/Card';
import Button, { IconButton } from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import {
  Plus,
  EllipsisVertical,
  CreditCard,
  Snowflake,
  Trash2,
  Save,
  FileText,
  Users,
} from 'lucide-react';

export default function HomePage() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  );
}

function HomeContent() {
  const { user } = useAuth();

  // Демо-данные для карточек
  const demoCards = [
    {
      name: 'Иванов Алексей',
      color: 'var(--color-status-overdue)',
      status: 'Просрочен',
      info: '01.03.2026 · 3 000 ₽ · 30 дней',
    },
    {
      name: 'Петрова Мария',
      color: 'var(--color-status-urgent)',
      status: 'Срочно',
      info: '10.03.2026 · 2 500 ₽ · 30 дней',
    },
    {
      name: 'Сидоров Дмитрий',
      color: 'var(--color-status-soon)',
      status: 'Скоро',
      info: '08.03.2026 · 4 000 ₽ · 30 дней',
      notes: 'Травма колена, щадящий режим',
    },
    {
      name: 'Козлова Анна',
      color: 'var(--color-status-normal)',
      status: 'Норма',
      info: '01.03.2026 · 3 000 ₽ · 30 дней',
    },
    {
      name: 'Волков Сергей',
      color: 'var(--color-status-good)',
      status: 'Хорошо',
      info: '28.02.2026 · 5 000 ₽ · 60 дней',
    },
    {
      name: 'Морозов Павел',
      color: 'var(--color-status-frozen)',
      status: 'Заморожен',
      info: '15.02.2026 · 3 000 ₽ · 30 дней',
      frozen: true,
    },
  ];

  return (
    <PageWrapper>
      {/* Шапка главного экрана */}
      <AppHeader
        variant="main"
        title="Сетка"
        subtitle={`${user?.displayName || 'Пользователь'} · 6 клиентов`}
        rightActions={[
          { icon: Plus, onClick: () => alert('Добавить клиента'), label: 'Добавить' },
          { icon: EllipsisVertical, onClick: () => alert('Меню'), label: 'Меню' },
        ]}
      >
        {/* Заглушка для поиска — потом заменим на SearchBar */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-md)',
            padding: '9px 14px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          Поиск клиента...
        </div>
      </AppHeader>

      {/* Контент — список карточек */}
      <div
        style={{
          flex: 1,
          padding: '0 12px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {demoCards.map((card, i) => (
          <Card
            key={i}
            leftBorderColor={card.color}
            onClick={() => alert(`Открыть: ${card.name}`)}
          >
            {/* Строка 1: имя + статус */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}
              >
                {card.name}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: card.color,
                  backgroundColor: `color-mix(in srgb, ${card.color} 12%, transparent)`,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {card.frozen && <Icon icon={Snowflake} size={11} />}
                {card.status}
              </span>
            </div>

            {/* Строка 2: дата · сумма · срок */}
            <div
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                marginTop: '4px',
                lineHeight: 1.4,
              }}
            >
              {card.info}
            </div>

            {/* Строка 3: заметка (если есть) */}
            {card.notes && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '4px',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  fontStyle: 'italic',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon icon={FileText} size={12} />
                {card.notes}
              </div>
            )}
          </Card>
        ))}

        {/* Демо кнопок */}
        <div style={{ marginTop: '16px' }}>
          <Card>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Демо кнопок
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant="primary" icon={Save} size="sm">Сохранить</Button>
                <Button variant="success" icon={CreditCard} size="sm">Продлить</Button>
                <Button variant="danger" icon={Trash2} size="sm">Удалить</Button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="primary" size="sm" loading>Загрузка</Button>
              </div>
              <Button variant="primary" icon={Users} fullWidth>
                Полная ширина
              </Button>
            </div>
          </Card>
        </div>

        {/* Подпись */}
        <p
          style={{
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            fontSize: '12px',
            marginTop: '12px',
            paddingBottom: '8px',
          }}
        >
          Шаг 4 завершён — дизайн-система работает!
        </p>
      </div>
    </PageWrapper>
  );
}
