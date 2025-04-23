import { ClientProviders } from './ClientProviders/ClientProviders'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
