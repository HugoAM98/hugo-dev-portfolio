'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Code, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Hero() {
  const t = useTranslations('hero')
  const [currentRole, setCurrentRole] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  const roles = [
    t('roles.fullstack'),
    t('roles.frontend'),
    t('roles.backend'),
    t('roles.problem'),
  ]

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  // Rotate roles every 3 seconds for dynamic presentation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden animated-gradient"
      aria-label="Hero section - Introduction"
    >
      {/* Optimized background elements - Reduced and more subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="hero-bg-blur absolute top-20 left-10 w-96 h-96 bg-neon-cyan/15 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="hero-bg-blur absolute bottom-20 right-10 w-[400px] h-[400px] bg-neon-purple/15 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh] py-20">
          {/* Left Column - Text Content - Optimized for 5-second understanding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Simplified icon - Less distracting */}
            <motion.div
              className="inline-block relative mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Code 
                className="w-16 h-16 lg:w-20 lg:h-20 text-neon-cyan relative z-10" 
                aria-hidden="true"
              />
            </motion.div>

            {/* Optimized typography hierarchy - Clear value proposition */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="gradient-text block mb-2">{t('greeting')}</span>
              <motion.span
                className="gradient-text block mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                {t('name')}
              </motion.span>
            </h1>

            {/* Optimized role display - More compact */}
            <div className="h-16 lg:h-20">
              <AnimatedRole roles={roles} currentRole={currentRole} />
            </div>

            {/* Clear value proposition - Optimized description */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('description', {
                years: t('years'),
                ikea: t('ikea'),
              })}
            </motion.p>

            {/* Optimized CTAs - More prominent and clear */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-neon-gradient rounded-lg font-semibold text-base lg:text-lg shadow-neon-lg relative overflow-hidden group text-center focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View my projects"
              >
                <span className="relative z-10">{t('viewProjects')}</span>
                <div className="absolute inset-0 shine opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 glass-strong rounded-lg font-semibold text-base lg:text-lg border-2 border-neon-purple/40 hover:border-neon-cyan/70 hover:bg-neon-purple/10 transition-all relative overflow-hidden group text-center focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Contact me"
              >
                <span className="relative z-10">{t('contact')}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements - Optimized for performance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative h-[400px] lg:h-[500px] hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Parallax Image Container */}
            <motion.div
              style={{ y, opacity, scale }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Glow effect behind image */}
              <motion.div
                className="absolute inset-0 bg-neon-gradient/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'loop' as const,
                }}
              />
              
              {/* Image with parallax effect */}
              <motion.div
                className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-neon-cyan/40 shadow-neon-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-purple/20 z-10 pointer-events-none" />
                
                <Image
                  src="/profile.jpg"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 256px, 320px"
                />
              </motion.div>

              {/* Floating decorative elements around image */}
              <motion.div
                className="absolute top-0 right-0 glass-strong p-4 rounded-xl border-2 border-neon-cyan/30 w-32 shadow-neon-cyan"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'loop' as const,
                }}
              >
                <div className="text-2xl mb-1">💻</div>
                <div className="text-xs text-gray-300">Dev</div>
              </motion.div>

              <motion.div
                className="absolute top-32 left-0 glass-strong p-4 rounded-xl border-2 border-neon-purple/30 w-32 shadow-neon"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                  repeatType: 'loop' as const,
                }}
              >
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-gray-300">Code</div>
              </motion.div>

              <motion.div
                className="absolute bottom-32 right-0 glass-strong p-4 rounded-xl border-2 border-neon-pink/30 w-32 shadow-neon-pink"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                  repeatType: 'loop' as const,
                }}
              >
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-xs text-gray-300">Build</div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-1/4 glass-strong p-4 rounded-xl border-2 border-neon-cyan/30 w-32 shadow-neon-cyan"
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                  repeatType: 'loop' as const,
                }}
              >
                <div className="text-2xl mb-1">✨</div>
                <div className="text-xs text-gray-300">Create</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Optimized scroll indicator - More subtle */}
        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg rounded-full p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop' as const,
              times: [0, 0.5, 1],
            }}
          >
            <ArrowDown className="w-5 h-5 lg:w-6 lg:h-6 text-neon-cyan" aria-hidden="true" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}

// Optimized AnimatedRole component - Better performance and accessibility
function AnimatedRole({ roles, currentRole }: { roles: string[]; currentRole: number }) {
  return (
    <div className="relative h-full flex items-center">
      {roles.map((role, index) => (
        <motion.div
          key={role}
          className="absolute left-0 w-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: currentRole === index ? 1 : 0,
            y: currentRole === index ? 0 : -15,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="role-text text-xl sm:text-2xl lg:text-3xl font-bold gradient-text flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            {role}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
