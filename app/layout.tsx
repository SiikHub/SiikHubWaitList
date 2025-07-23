import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SiikHub',
  description: 'Connect. Grow. Earn',
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
