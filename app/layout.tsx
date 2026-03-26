import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Deponti Commercial OS',
  description: 'Il tuo cockpit commerciale personale',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Commercial OS',
  },
};

export const viewport: Viewport = {
  themeColor: '#f5f5f7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
