import { ReactNode } from 'react'
import './globals.css'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Providers from './Providers'
import type { Metadata, Viewport } from 'next'
import { portfolioData } from '@/lib/portfolio-data'

const { developer } = portfolioData

export const metadata: Metadata = {
  title: {
    default: developer.name,
    template: `%s | ${developer.name}`
  },
  description: developer.summary,
  keywords: [
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Web Developer',
    'Portfolio'
  ],
  authors: [{ name: developer.name }],
  creator: developer.name,
  metadataBase: new URL('https://portfolio-anastasiia.vercel.app'),
  openGraph: {
    title: `${developer.name} — ${developer.title}`,
    description: developer.summary,
    url: '/',
    siteName: developer.name,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${developer.name} — ${developer.title}`,
    description: developer.summary
  },
  alternates: {
    canonical: '/'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
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
