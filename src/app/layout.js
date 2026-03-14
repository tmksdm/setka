import './globals.css';

export const metadata = {
  title: 'Сетка — учёт клиентов зала',
  description: 'Управление абонементами и платежами клиентов спортзала',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Сетка',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#4A5578',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Блокирующий скрипт: ставит тему ДО рендера, чтобы не было мигания */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('setka_theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* PWA: иконки для Apple */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="no-transitions" suppressHydrationWarning>
        {/* Убираем класс no-transitions после первого рендера */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              requestAnimationFrame(function() {
                document.body.classList.remove('no-transitions');
              });
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
