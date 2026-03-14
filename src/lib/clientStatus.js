// src/lib/clientStatus.js
// Определение статуса клиента и сортировка по срочности

import { getDaysRemaining } from './dateHelpers';

/**
 * Определяет статус клиента на основе даты окончания, заморозки и архива.
 *
 * Возвращает объект:
 * {
 *   status: 'overdue' | 'urgent' | 'soon' | 'normal' | 'good' | 'frozen' | 'archived',
 *   label: 'Просрочен' | 'Срочно' | ...,
 *   color: '#B05A5A' | ...,        ← цвет для светлой темы (CSS-переменная лучше, но для сортировки нужен ключ)
 *   cssColor: 'var(--color-status-overdue)' | ...,
 *   sortOrder: 0–6,                ← меньше = выше в списке
 *   daysRemaining: число
 * }
 */
export function getClientStatus(expirationDateString, freeze, archived) {
  // Архивный клиент
  if (archived) {
    return {
      status: 'archived',
      label: 'Архив',
      color: '#8D90A1',
      cssColor: 'var(--color-status-archived)',
      sortOrder: 6,
      daysRemaining: null
    };
  }

  // Замороженный клиент (заморозка активна)
  if (freeze && freeze.startDate && freeze.endDate) {
    const today = new Date(new Date().toISOString().split('T')[0] + 'T00:00:00');
    const freezeEnd = new Date(freeze.endDate + 'T00:00:00');

    if (freezeEnd >= today) {
      return {
        status: 'frozen',
        label: 'Заморозка',
        color: '#5A9BAD',
        cssColor: 'var(--color-status-frozen)',
        sortOrder: 5,
        daysRemaining: null
      };
    }
  }

  // Обычный клиент — считаем дни до окончания
  const days = getDaysRemaining(expirationDateString);

  if (days < 0) {
    return {
      status: 'overdue',
      label: 'Просрочен',
      color: '#B05A5A',
      cssColor: 'var(--color-status-overdue)',
      sortOrder: 0,
      daysRemaining: days
    };
  }

  if (days <= 3) {
    return {
      status: 'urgent',
      label: 'Срочно',
      color: '#C07A4E',
      cssColor: 'var(--color-status-urgent)',
      sortOrder: 1,
      daysRemaining: days
    };
  }

  if (days <= 7) {
    return {
      status: 'soon',
      label: 'Скоро',
      color: '#B89B4E',
      cssColor: 'var(--color-status-soon)',
      sortOrder: 2,
      daysRemaining: days
    };
  }

  if (days <= 14) {
    return {
      status: 'normal',
      label: 'Норма',
      color: '#5C6BC0',
      cssColor: 'var(--color-status-normal)',
      sortOrder: 3,
      daysRemaining: days
    };
  }

  return {
    status: 'good',
    label: 'Активен',
    color: '#5B8A72',
    cssColor: 'var(--color-status-good)',
    sortOrder: 4,
    daysRemaining: days
  };
}

/**
 * Сортирует массив клиентов по срочности.
 * Сначала просроченные (самые старые наверху),
 * потом срочные, скоро, норма, активные, замороженные.
 *
 * Внутри одного статуса — по возрастанию оставшихся дней
 * (т.е. кто ближе к окончанию — тот выше).
 *
 * Каждому клиенту добавляется поле _status с результатом getClientStatus.
 */
export function sortClientsByUrgency(clients) {
  return clients
    .map(client => ({
      ...client,
      _status: getClientStatus(client.expirationDate, client.freeze, client.archived)
    }))
    .sort((a, b) => {
      // Сначала по sortOrder (меньше = выше)
      if (a._status.sortOrder !== b._status.sortOrder) {
        return a._status.sortOrder - b._status.sortOrder;
      }

      // Внутри одной группы — по оставшимся дням (меньше = выше)
      const daysA = a._status.daysRemaining ?? 9999;
      const daysB = b._status.daysRemaining ?? 9999;

      if (daysA !== daysB) {
        return daysA - daysB;
      }

      // Если всё одинаково — по имени
      const nameA = `${a.lastName || ''} ${a.firstName || ''}`.trim().toLowerCase();
      const nameB = `${b.lastName || ''} ${b.firstName || ''}`.trim().toLowerCase();
      return nameA.localeCompare(nameB, 'ru');
    });
}

/**
 * Считает количество клиентов, требующих внимания
 * (просроченные + срочные), без замороженных и архивных.
 */
export function countUrgentClients(clients) {
  let overdue = 0;
  let urgent = 0;

  for (const client of clients) {
    if (client.archived) continue;

    const status = getClientStatus(client.expirationDate, client.freeze, client.archived);

    if (status.status === 'overdue') overdue++;
    else if (status.status === 'urgent') urgent++;
  }

  return { overdue, urgent, total: overdue + urgent };
}
