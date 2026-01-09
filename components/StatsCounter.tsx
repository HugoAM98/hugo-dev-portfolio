'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect, useState } from 'react'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView: isInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.5 
  })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const stats: Stat[] = [
    { value: 4, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 10, suffix: '+', label: 'Technologies Mastered' },
    { value: 3, suffix: '', label: 'Countries Served' },
  ]

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center glass-strong p-6 sm:p-8 rounded-xl border-2 border-neon-purple/30 hover:border-neon-cyan/50 transition-all group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-sm sm:text-base text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

