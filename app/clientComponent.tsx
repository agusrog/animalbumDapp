'use client'
import { Web3ReactProvider } from '@web3-react/core'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import { getLibrary } from '@/config/web3'

 
export default function ClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navbar />
      {children}
    </Web3ReactProvider>
  </Providers>
  )
}