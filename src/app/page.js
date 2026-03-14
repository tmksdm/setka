// src/app/page.js
// Главная страница — демо UI + проверка бизнес-логики (Шаг 5)

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

import { getClientStatus, sortClientsByUrgency, countUrgentClients } from '@/lib/clientStatus';
import { formatDate, formatAmount, declineDays, declineClients, getTodayString, calculateExpirationDate } from '@/lib/dateHelpers';

export default function HomePage() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  );
}

function HomeContent() {
  const { user } = useAuth();

  // Тестовые клиенты — имитируем данные из Firestore
  const today = getTodayString();
  const fakeClients = [
    {
      id: '1',
      firstName: 'Алексей',
      lastName: 'Иванов',
      currentPayment: { date: '2026-02-01', amount: 3000, durationDays: 30 },
      expirationDate: '2026-03-03', // просрочен
      freeze: null,
      archived: false,
    },
    {
      id: '2',
      firstName: 'Мария',
      lastName: 'Петрова',
      currentPayment: { date: '2026-02-20', amount: 2500, durationDays: 30 },
      expirationDate: calculateExpirationDate(today, 2), // через 2 дня — срочно
      freeze: null,
      archived: false,
    },
    {
      id: '3',
      firstName: 'Дмитрий',
      lastName: 'Сидоров',
      currentPayment: { date: '2026-02-25', amount: 4000, durationDays: 30 },
      expirationDate: calculateExpirationDate(today, 6), // через 6 дней — скоро
      freeze: null,
      archived: false,
      notes: 'Травма колена, щадящий режим',
    },
    {
      id: '4',
      firstName: 'Анна',
      lastName: 'Козлова',
      currentPayment: { date: '2026-03-01', amount: 3000, durationDays: 30 },
      expirationDate: calculateExpirationDate(today, 12), // через 12 дней — норма
      freeze: null,
      archived: false,
    },
    {
      id: '5',
      firstName: 'Сергей',
      lastName: 'Волков',
      currentPayment: { date: '2026-02-28', amount: 5000, durationDays: 60 },
      expirationDate: calculateExpirationDate(today, 25), // через 25 дней — хорошо
      freeze: null,
      archived: false,
    },
    {
      id: '6',
      firstName: 'Павел',
      lastName: 'Морозов',
      currentPayment: { date: '2026-02-15', amount: 3000, durationDays: 30 },
      expirationDate: '2026-03-25',
      freeze: {
        startDate: '2026-03-10',
        days: 10,
        endDate: calculateExpirationDate(today, 5), // заморозка ещё активна
        originalExpiration: '2026-03-17',
      },
      archived: false,
    },
  ];

  // Сортировка по срочности (функция из clientStatus.js)
  const sortedClients = sortClientsByUrgency(fakeClients);

  // Подсчёт срочных (функция из clientStatus.js)
  const urgency = countUrgentClients(fakeClients);

  return (
    <PageWrapper>
      {/* Шапка главного экрана */}
      <AppHeader
        variant="main"
        title="Сетка"
        subtitle={`${user?.displayName || 'Пользователь'} · ${declineClients(fakeClients.length)}`}
        rightActions={[
          { icon: Plus, onClick: () => alert('Добавить клиента'), label: 'Добавить' },
          { icon: EllipsisVertical, onClick: () => alert('Меню'), label: 'Меню' },
        ]}
      >
        {/* Баннер срочности (заглушка — потом будет отдельный компонент) */}
        {urgency.total > 0 && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
            }}
          >
            ⚠ Требуют внимания: {declineClients(urgency.total)}
            {urgency.overdue > 0 && ` (просрочено: ${urgency.overdue})`}
          </div>
        )}

        {/* Заглушка для поиска */}
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

      {/* Контент — список карточек, отсортированных по срочности */}
      <div
        style={{
          flex: 1,
          padding: '0 12px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {sortedClients.map(client => {
          const s = client._status;
          const p = client.currentPayment;

          return (
            <Card
              key={client.id}
              leftBorderColor={s.cssColor}
              onClick={() => alert(`Открыть: ${client.lastName} ${client.firstName}`)}
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
                  {client.lastName} {client.firstName}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: s.cssColor,
                    backgroundColor: `color-mix(in srgb, ${s.cssColor} 12%, transparent)`,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {s.status === 'frozen' && <Icon icon={Snowflake} size={11} />}
                  {s.label}
                  {s.daysRemaining != null && s.status !== 'overdue' && ` · ${declineDays(s.daysRemaining)}`}
                  {s.status === 'overdue' && ` · ${declineDays(Math.abs(s.daysRemaining))} назад`}
                </span>
              </div>

              {/* Строка 2: дата · сумма · срок · дата окончания */}
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  marginTop: '4px',
                  lineHeight: 1.4,
                }}
              >
                {formatDate(p.date)} · {formatAmount(p.amount)} · {declineDays(p.durationDays)} · до {formatDate(client.expirationDate)}
              </div>

              {/* Строка 3: заметка (если есть) */}
              {client.notes && (
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
                  {client.notes}
                </div>
              )}
            </Card>
          );
        })}

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
          Шаг 5 завершён — бизнес-логика работает!
        </p>
      </div>
    </PageWrapper>
  );
}
