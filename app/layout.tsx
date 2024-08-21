import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'
import { Analytics } from '@vercel/analytics/react'
import { UserProvider } from '@/lib/user-context'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = '解惑AI - 你的生活好帮手'
const description = '基于AI的搜索引擎.'

export const metadata: Metadata = {
  metadataBase: new URL('https://jiehuo.ai'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@miiura'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <UserProvider>
            <AppStateProvider>
              <Header />
              {children}
              <Toaster />
            </AppStateProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}