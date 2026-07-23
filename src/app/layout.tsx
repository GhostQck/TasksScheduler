import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
