'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import StatsCounter from '@/components/StatsCounter'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import Analytics from '@/components/Analytics'
import SEO from '@/components/SEO'

// Lazy load components for better performance
const LazyProjects = dynamic(() => import('@/components/Projects'), {
  loading: () => <ProjectsSkeleton />,
})

const LazyContact = dynamic(() => import('@/components/Contact'), {
  loading: () => <ContactSkeleton />,
})

function ProjectsSkeleton() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="h-20 bg-dark-card/50 rounded-lg mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-dark-card/50 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSkeleton() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-dark-bg/80">
      <div className="max-w-7xl mx-auto">
        <div className="h-20 bg-dark-card/50 rounded-lg mb-8 animate-pulse" />
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 h-64 bg-dark-card/50 rounded-xl animate-pulse" />
          <div className="lg:col-span-3 h-64 bg-dark-card/50 rounded-xl animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [particles, setParticles] = useState<Array<{
    left: string
    animationDelay: string
    animationDuration: string
  }>>([])

  useEffect(() => {
    // Reduced particle count for better performance - Only generate on client
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      setParticles(
        Array.from({ length: 10 }).map(() => ({
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 20}s`,
          animationDuration: `${15 + Math.random() * 10}s`,
        }))
      )
    }
  }, [])


  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-dark-bg via-[#0a0a12] to-dark-bg text-white relative overflow-hidden"
      role="main"
    >
      {/* Optimized animated grid background - More subtle */}
      <div className="fixed inset-0 animated-grid pointer-events-none z-0" aria-hidden="true" />
      
      {/* Floating particles - Only render on client, reduced count for performance */}
      {particles.length > 0 && (
        <div className="fixed inset-0 particles z-0" aria-hidden="true">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: particle.left,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            />
          ))}
        </div>
      )}

      <ErrorBoundary>
        <div className="relative z-10">
          <SEO />
          <Analytics />
          <ScrollProgress />
          <Navigation />
          <Hero />
          <StatsCounter />
          <About />
          <Skills />
          <Suspense fallback={<ProjectsSkeleton />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<ContactSkeleton />}>
            <Contact />
          </Suspense>
          <BackToTop />
          <KeyboardShortcuts />
        </div>
      </ErrorBoundary>
    </main>
  )
}

