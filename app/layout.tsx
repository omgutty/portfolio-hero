import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omgutty.vercel.app'

export const metadata: Metadata = {
  title: 'Om Gutty — Lead QA Engineer | SDET | Automation Architect',
  description:
    '13+ years of Quality Engineering, Test Automation, Playwright, Selenium, API Testing, CI/CD, Cloud Testing and AI-assisted QA. Portfolio of Om Gutty.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Om Gutty — Lead QA Engineer & Automation Architect',
    description:
      'Portfolio of Om Gutty. 13+ years building resilient automation frameworks and AI-driven test strategies.',
    url: siteUrl,
    siteName: 'Om Gutty Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Om Gutty — QA Automation Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Gutty — Lead QA Engineer',
    description:
      '13+ years of test automation, AI-assisted QA, and CI/CD pipeline expertise.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
