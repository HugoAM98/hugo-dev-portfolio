export function generateSchema(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hugo-portfolio.vercel.app'
  const isSpanish = locale === 'es'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Hugo',
        jobTitle: isSpanish ? 'Desarrollador Full Stack' : 'Full Stack Developer',
        description: isSpanish
          ? 'Desarrollador Full Stack con más de 4 años de experiencia especializado en Laravel, Vue.js, TypeScript y desarrollo de plataformas ecommerce.'
          : 'Full Stack Developer with over 4 years of experience specialized in Laravel, Vue.js, TypeScript and ecommerce platform development.',
        url: `${baseUrl}/${locale}`,
        sameAs: [
          'https://github.com',
          'https://linkedin.com',
          'https://twitter.com',
        ],
        knowsAbout: [
          'Laravel',
          'Vue.js',
          'TypeScript',
          'React',
          'Next.js',
          'E-commerce Development',
          'Web Development',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}`,
        name: isSpanish ? 'Portfolio de Hugo' : "Hugo's Portfolio",
        description: isSpanish
          ? 'Portfolio profesional de desarrollador Full Stack'
          : 'Professional Full Stack Developer Portfolio',
        inLanguage: locale,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/${locale}#webpage`,
        url: `${baseUrl}/${locale}`,
        name: isSpanish
          ? 'Hugo - Desarrollador Full Stack | Portfolio'
          : 'Hugo - Full Stack Developer | Portfolio',
        description: isSpanish
          ? 'Portfolio de Hugo - Desarrollador Full Stack con más de 4 años de experiencia.'
          : "Hugo's Portfolio - Full Stack Developer with over 4 years of experience.",
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${baseUrl}/#person`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${baseUrl}/og-image.png`,
        },
      },
    ],
  }
}

