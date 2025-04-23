'use client'

import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
