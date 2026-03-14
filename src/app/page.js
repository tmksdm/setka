'use client';

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-screen-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-header-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          color: 'var(--color-header-text)',
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        С
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Сетка
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
        Учёт клиентов зала
      </p>
      <p
        style={{
          marginTop: '40px',
          color: 'var(--color-text-secondary)',
          fontSize: '13px',
        }}
      >
        Шаг 1 завершён — проект настроен!
      </p>
    </div>
  );
}
