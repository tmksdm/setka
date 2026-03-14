// src/lib/dateHelpers.js
// Утилиты для работы с датами

/**
 * Сегодняшняя дата в формате "YYYY-MM-DD"
 */
export function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Сколько дней осталось до даты окончания.
 * Положительное число = ещё есть время.
 * Отрицательное = просрочено.
 * 0 = сегодня последний день.
 */
export function getDaysRemaining(expirationDateString) {
  if (!expirationDateString) return -9999;

  const today = new Date(getTodayString() + 'T00:00:00');
  const expDate = new Date(expirationDateString + 'T00:00:00');

  const diffMs = expDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Форматирует дату "2026-03-15" → "15.03.2026"
 */
export function formatDate(dateString) {
  if (!dateString) return '—';

  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

/**
 * Форматирует дату коротко: "2026-03-15" → "15 мар"
 */
export function formatDateShort(dateString) {
  if (!dateString) return '—';

  const months = [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
  ];

  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const day = parseInt(parts[2], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;

  return `${day} ${months[monthIndex]}`;
}

/**
 * Вычисляет дату окончания: дата оплаты + N дней.
 * calculateExpirationDate("2026-03-01", 30) → "2026-03-31"
 */
export function calculateExpirationDate(paymentDateString, durationDays) {
  const date = new Date(paymentDateString + 'T00:00:00');
  date.setDate(date.getDate() + durationDays);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

/**
 * Добавляет (или вычитает) дни к дате.
 * addDaysToDate("2026-03-10", 5) → "2026-03-15"
 * addDaysToDate("2026-03-10", -3) → "2026-03-07"
 */
export function addDaysToDate(dateString, days) {
  return calculateExpirationDate(dateString, days);
}

/**
 * Склонение слова "день" по-русски.
 * declineDays(1) → "1 день"
 * declineDays(3) → "3 дня"
 * declineDays(5) → "5 дней"
 * declineDays(21) → "21 день"
 */
export function declineDays(n) {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const lastOne = abs % 10;

  let word;
  if (lastTwo >= 11 && lastTwo <= 19) {
    word = 'дней';
  } else if (lastOne === 1) {
    word = 'день';
  } else if (lastOne >= 2 && lastOne <= 4) {
    word = 'дня';
  } else {
    word = 'дней';
  }

  return `${n} ${word}`;
}

/**
 * Склонение слова "клиент" по-русски.
 * declineClients(1) → "1 клиент"
 * declineClients(3) → "3 клиента"
 * declineClients(5) → "5 клиентов"
 */
export function declineClients(n) {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const lastOne = abs % 10;

  let word;
  if (lastTwo >= 11 && lastTwo <= 19) {
    word = 'клиентов';
  } else if (lastOne === 1) {
    word = 'клиент';
  } else if (lastOne >= 2 && lastOne <= 4) {
    word = 'клиента';
  } else {
    word = 'клиентов';
  }

  return `${n} ${word}`;
}

/**
 * Форматирует сумму: 3000 → "3 000 ₽"
 */
export function formatAmount(amount) {
  if (amount == null) return '—';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}
