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
    title: {
      default: isSpanish
        ? 'Hugo - Desarrollador Full Stack | Portfolio Profesional'
        : 'Hugo - Full Stack Developer | Professional Portfolio',
      template: isSpanish
        ? '%s | Hugo - Desarrollador Full Stack'
        : '%s | Hugo - Full Stack Developer',
    },
    description: isSpanish
      ? 'Desarrollador Full Stack con 4+ años de experiencia. Especializado en Laravel, Vue.js, TypeScript y ecommerce. Trabajando en proyectos internacionales como IKEA para Hong Kong, Indonesia y Taiwán.'
      : 'Full Stack Developer with 4+ years of experience. Specialized in Laravel, Vue.js, TypeScript and ecommerce development. Working on international projects like IKEA for Hong Kong, Indonesia and Taiwan.',
    keywords: isSpanish
      ? 'desarrollador full stack, Laravel, Vue.js, TypeScript, ecommerce, portfolio, desarrollo web, Hugo, IKEA, Hong Kong, Indonesia, Taiwán, APIs REST, PHP, desarrollo backend, frontend'
      : 'full stack developer, Laravel, Vue.js, TypeScript, ecommerce, portfolio, web development, Hugo, IKEA, Hong Kong, Indonesia, Taiwan, REST APIs, PHP, backend development, frontend',
    authors: [{ name: 'Hugo', url: baseUrl }],
    creator: 'Hugo',
    publisher: 'Hugo',
    openGraph: {
      title: isSpanish
        ? 'Hugo - Desarrollador Full Stack | Portfolio Profesional'
        : 'Hugo - Full Stack Developer | Professional Portfolio',
      description: isSpanish
        ? 'Desarrollador Full Stack con 4+ años de experiencia especializado en Laravel, Vue.js, TypeScript y ecommerce. Trabajando en proyectos internacionales.'
        : 'Full Stack Developer with 4+ years of experience specialized in Laravel, Vue.js, TypeScript and ecommerce. Working on international projects.',
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_ES'],
      url: `${baseUrl}/${locale}`,
      siteName: 'Hugo Portfolio',
      images: [
        {
          url: new URL('/opengraph-image', baseUrl).toString(),
          width: 1200,
          height: 630,
          alt: isSpanish ? 'Hugo - Desarrollador Full Stack especializado en ecommerce y desarrollo web' : 'Hugo - Full Stack Developer specialized in ecommerce and web development',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish
        ? 'Hugo - Desarrollador Full Stack | Portfolio Profesional'
        : 'Hugo - Full Stack Developer | Professional Portfolio',
      description: isSpanish
        ? 'Desarrollador Full Stack especializado en Laravel, Vue.js, TypeScript y ecommerce. 4+ años de experiencia en proyectos internacionales.'
        : 'Full Stack Developer specialized in Laravel, Vue.js, TypeScript and ecommerce. 4+ years of experience in international projects.',
      images: [new URL('/opengraph-image', baseUrl).toString()],
      creator: '@hugo', // Update with actual Twitter handle
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
      <body className={`${inter.variable} font-sans dark`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
