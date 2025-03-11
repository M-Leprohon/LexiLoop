import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@components/Header';
import { MenuProvider } from '@context/MenuContext';
import { LoadingProvider } from '../context/LoadingContext';
import GlobalLoader from '@components/GlobalLoader';
import { Suspense } from 'react';
import Loading from './loading';
import { InverseProvider } from '@context/InverseContext';
import { ThemeProvider } from 'next-themes';

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
    <html suppressHydrationWarning className="h-full text-base" lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1"
        />
      </head>
      <body className={`h-full max-w-full ${inter.className}`}>
        <div className="h-full container mx-auto px-4 max-w-6xl">
          <LoadingProvider>
            <InverseProvider>
              <GlobalLoader />
              <MenuProvider>
                <ThemeProvider enableSystem={false} attribute="class">
                  <Header />
                  <Suspense fallback={<Loading />}>
                    <div className="h-full main-content">{children}</div>
                  </Suspense>
                </ThemeProvider>
              </MenuProvider>
            </InverseProvider>
          </LoadingProvider>
        </div>
      </body>
    </html>
  );
}
