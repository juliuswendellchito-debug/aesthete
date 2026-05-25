import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar } from '@/components/layout/CartSidebar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AESTHETE | Silent Atelier',
    template: '%s | AESTHETE',
  },
  description: 'Quiet luxury. Considered design. Each piece made to outlast the season.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  )
}
