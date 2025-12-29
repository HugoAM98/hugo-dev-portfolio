'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Code, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

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
    >
      {/* Animated background elements - Neon style */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="hero-bg-blur absolute top-20 left-10 w-96 h-96 bg-neon-cyan/30 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
        />
        <motion.div
          className="hero-bg-blur absolute bottom-20 right-10 w-[500px] h-[500px] bg-neon-purple/30 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
        />
        <motion.div
          className="hero-bg-blur absolute top-1/2 left-1/2 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              className="inline-block relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-neon-purple/50 blur-2xl rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'loop' as const,
                  times: [0, 0.5, 1],
                }}
              />
              <Code className="w-20 h-20 text-neon-cyan relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="gradient-text block">{t('greeting')}</span>
              <motion.span
                className="gradient-text block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t('name')}
              </motion.span>
            </h1>

            <div className="h-20">
              <AnimatedRole roles={roles} currentRole={currentRole} />
            </div>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t('description', {
                years: t('years'),
                ikea: t('ikea'),
              })}
            </motion.p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-neon-gradient rounded-lg font-semibold text-lg shadow-neon-lg relative overflow-hidden group text-center focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="View projects section"
              >
                <span className="relative z-10">{t('viewProjects')}</span>
                <div className="absolute inset-0 shine opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 glass-strong rounded-lg font-semibold text-lg border-2 border-neon-purple/50 hover:border-neon-pink/70 hover:shadow-neon-pink transition-all relative overflow-hidden group text-center focus:outline-none focus:ring-2 focus:ring-neon-pink focus:ring-offset-2 focus:ring-offset-dark-bg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go to contact section"
              >
                <span className="relative z-10">{t('contact')}</span>
                <motion.div
                  className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px] hidden lg:block"
          >
            {/* Floating Cards */}
            <motion.div
              className="absolute top-0 right-0 glass-strong p-6 rounded-xl border-2 border-neon-cyan/30 w-48 shadow-neon-cyan"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'loop' as const,
                times: [0, 0.5, 1],
              }}
            >
              <div className="text-4xl mb-2">💻</div>
              <div className="text-sm text-gray-300">Laravel</div>
              <div className="text-xs text-neon-cyan">Backend</div>
            </motion.div>

            <motion.div
              className="absolute top-32 left-0 glass-strong p-6 rounded-xl border-2 border-neon-purple/30 w-48 shadow-neon"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
                repeatType: 'loop' as const,
                times: [0, 0.5, 1],
              }}
            >
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-sm text-gray-300">Vue.js</div>
              <div className="text-xs text-neon-purple">Frontend</div>
            </motion.div>

            <motion.div
              className="absolute bottom-32 right-0 glass-strong p-6 rounded-xl border-2 border-neon-pink/30 w-48 shadow-neon-pink"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
                repeatType: 'loop' as const,
                times: [0, 0.5, 1],
              }}
            >
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm text-gray-300">TypeScript</div>
              <div className="text-xs text-neon-pink">Full Stack</div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-1/4 glass-strong p-6 rounded-xl border-2 border-neon-cyan/30 w-48 shadow-neon-cyan"
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
                repeatType: 'loop' as const,
                times: [0, 0.5, 1],
              }}
            >
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm text-gray-300">Analytics</div>
              <div className="text-xs text-neon-cyan">Data</div>
            </motion.div>

            {/* Central Glow Effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-gradient/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'loop' as const,
                times: [0, 0.5, 1],
              }}
            />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg rounded-full p-2"
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.5, 1],
          }}
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop' as const,
              times: [0, 0.5, 1],
            }}
          >
            <ArrowDown className="w-6 h-6 text-neon-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" aria-hidden="true" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}

function AnimatedRole({ roles, currentRole }: { roles: string[]; currentRole: number }) {
  return (
    <div className="relative">
      {roles.map((role, index) => (
        <motion.div
          key={role}
          className="absolute left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: currentRole === index ? 1 : 0,
            y: currentRole === index ? 0 : -20,
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="role-text text-2xl sm:text-3xl md:text-4xl font-bold gradient-text flex items-center gap-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            {role}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
