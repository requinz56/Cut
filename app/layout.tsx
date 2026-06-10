import type { Metadata, Viewport } from 'next'
import './globals.css'
import { BookingProvider } from '@/context/BookingContext'

export const metadata: Metadata = {
  title: 'TOR5 — הזמנת תורים',
  description: 'פלטפורמת הזמנת תורים לעסקים ישראליים',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TOR5',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1B4FD8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-hebrew bg-surface antialiased">
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  )
}
