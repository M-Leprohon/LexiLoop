import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@components/Header';
import { MenuProvider } from '@context/MenuContext';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'LexiLoop',
  description: 'Practice your finnish vocabulary!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`h-full ${inter.className}`}>
        <div className="h-full container mx-auto px-4 max-w-6xl">
          <MenuProvider>
            <Header />
            <div className="h-full main-content">{children}</div>
          </MenuProvider>
        </div>
      </body>
    </html>
  );
}
