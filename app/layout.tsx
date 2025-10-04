// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Portfolio | Creative Developer',
  description: 'Modern portfolio showcasing creative development projects',
  icons: {
    icon: '/favicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {/* Global Side Neon Edge Glows */}
          <div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 h-screen w-40 sm:w-56 md:w-72 lg:w-80 bg-gradient-to-r from-[#00ff00]/15 via-[#00ff00]/10 to-transparent blur-3xl opacity-70 mix-blend-screen z-0"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed right-0 top-0 h-screen w-40 sm:w-56 md:w-72 lg:w-80 bg-gradient-to-l from-[#00ff00]/15 via-[#00ff00]/10 to-transparent blur-3xl opacity-70 mix-blend-screen z-0"
          />
          {/* Content wrapper above glows */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}