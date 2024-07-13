import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopButton from '@/components/TopButton';
import QueryProvider from './provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '책in',
  description: '도서 정보 관람이 가능하고, 사용자 간 의견 공유 커뮤니티가 마련되어있는 도서 관련 사이트',
  icons: {
    icon: '/projectbookin.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer autoClose={1500} stacked draggable />
        <QueryProvider>
          <NextUIProvider>
            <Header />
            {children}
            <TopButton />
            <Footer />
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
