import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SiikHub',
  description: 'Where professionals meet opportunities',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
