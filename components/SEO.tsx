'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SEO() {
  const pathname = usePathname()

  useEffect(() => {
    // Add structured data (Schema.org) for better SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Hugo',
      jobTitle: 'Full Stack Developer',
      description: 'Full Stack Developer with 4+ years of experience. Specialized in Laravel, Vue.js, TypeScript and ecommerce development.',
      url: typeof window !== 'undefined' ? window.location.origin : '',
      sameAs: [
        'https://github.com',
        'https://linkedin.com',
        'https://hugoamdeveloper.com',
      ],
      knowsAbout: [
        'Laravel',
        'Vue.js',
        'TypeScript',
        'PHP',
        'JavaScript',
        'E-commerce',
        'REST APIs',
        'MySQL',
        'Full Stack Development',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'CIFP Villa de Agüimes',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Bitbox S.L.',
      },
    }

    // Remove existing script if any
    const existingScript = document.getElementById('structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new script
    const script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [pathname])

  return null
}

