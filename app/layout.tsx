import Web3ContextProvider from '@/context/Web3ContextProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
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
        <Web3ContextProvider>
          {children}
        </Web3ContextProvider>
      </body>
    </html>
  )
}
