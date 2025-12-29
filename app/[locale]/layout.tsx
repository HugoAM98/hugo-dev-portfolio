import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { routing } from '@/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSpanish = locale === 'es'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hugo-portfolio.vercel.app'
  
  return {
    metadataBase: new URL(baseUrl),
    title: isSpanish
      ? 'Hugo - Desarrollador Full Stack | Portfolio'
      : 'Hugo - Full Stack Developer | Portfolio',
    description: isSpanish
      ? 'Portfolio de Hugo - Desarrollador Full Stack con más de 4 años de experiencia. Especializado en Laravel, Vue.js, TypeScript y desarrollo de plataformas ecommerce.'
      : 'Hugo\'s Portfolio - Full Stack Developer with over 4 years of experience. Specialized in Laravel, Vue.js, TypeScript and ecommerce platform development.',
    keywords: isSpanish
      ? 'desarrollador full stack, Laravel, Vue.js, TypeScript, ecommerce, portfolio, desarrollo web, Hugo'
      : 'full stack developer, Laravel, Vue.js, TypeScript, ecommerce, portfolio, web development, Hugo',
    authors: [{ name: 'Hugo', url: baseUrl }],
    creator: 'Hugo',
    publisher: 'Hugo',
    openGraph: {
      title: isSpanish
        ? 'Hugo - Desarrollador Full Stack'
        : 'Hugo - Full Stack Developer',
      description: isSpanish
        ? 'Portfolio de desarrollador Full Stack especializado en ecommerce'
        : 'Full Stack Developer portfolio specialized in ecommerce',
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'es' ? 'en' : 'es',
      url: `${baseUrl}/${locale}`,
      siteName: 'Hugo Portfolio',
      images: [
        {
          url: new URL('/opengraph-image', baseUrl).toString(),
          width: 1200,
          height: 630,
          alt: isSpanish ? 'Hugo - Desarrollador Full Stack' : 'Hugo - Full Stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish
        ? 'Hugo - Desarrollador Full Stack'
        : 'Hugo - Full Stack Developer',
      description: isSpanish
        ? 'Portfolio de desarrollador Full Stack especializado en ecommerce'
        : 'Full Stack Developer portfolio specialized in ecommerce',
      images: [new URL('/opengraph-image', baseUrl).toString()],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'es': `${baseUrl}/es`,
        'en': `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#080810" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} dark`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
