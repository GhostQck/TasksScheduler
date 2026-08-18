import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Notification from '@/components/ui/Notification';
import { ModalProvider } from '@/components/modals/ModalContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tasks Scheduler',
  description: 'Tasks Scheduler App',
  alternates: {
    canonical: 'http://localhost:3000/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${montserrat.className} text-txt h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-bg'>
        <ModalProvider>
          {children}
        </ModalProvider>

        <Suspense fallback={null}>
          <Notification />
        </Suspense>
      </body>
    </html>
  );
}
