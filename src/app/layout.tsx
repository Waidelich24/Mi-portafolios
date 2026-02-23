import './globals.css';
import en from '../../locales/en.json';
import { AppProviders } from '@/providers/AppProviders';

export const metadata = {
  title: en.meta.title,
  description: en.meta.description,
  icons: {
    icon: [
      '/favicon.ico',
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
    ],
    shortcut: ['/favicon.png'],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}