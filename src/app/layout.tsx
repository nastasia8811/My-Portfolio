import { ReactNode } from 'react'
import './globals.css'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Providers from './Providers'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Anastasiia Melnyk'
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='uk'>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout
