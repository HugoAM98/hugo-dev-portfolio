'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Only load analytics in production
    if (process.env.NODE_ENV !== 'production') return

    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics ID not found')
      return
    }

    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag as any

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
    })
  }, [pathname])

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}

// Helper function to track events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

