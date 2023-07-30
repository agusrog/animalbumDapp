'use client'
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from '@/config/web3';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Animalbum Dapp',
  description: 'Animal blockchain cards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Navbar />
            {children}
          </Web3ReactProvider>
        </Providers>
      </body>
    </html>
  )
}
