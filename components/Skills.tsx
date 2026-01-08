'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Code,
  Database,
  Globe,
  Zap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Skills() {
  const t = useTranslations('skills')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    {
      category: t('categories.backend'),
      icon: Code,
      technologies: ['PHP', 'Laravel', 'TypeScript', 'Node.js', 'APIs REST', 'Automatización', 'Integraciones ERP (Navision)'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      category: t('categories.frontend'),
      icon: Code,
      technologies: ['Vue.js', 'JavaScript (ES6+)', 'Bootstrap', 'HTML5', 'CSS3', 'Optimización de rendimiento', 'Componentes reutilizables'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      category: t('categories.database'),
      icon: Database,
      technologies: ['MySQL', 'MariaDB', 'PostgreSQL', 'SQLite', 'Optimización de consultas'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      category: t('categories.analytics'),
      icon: Zap,
      technologies: ['Google Analytics (GA4)', 'Implementación de tracking', 'Análisis de datos'],
      color: 'from-yellow-500 to-orange-500',
    },
  ]

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-dark-bg/80 relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-pink text-sm font-semibold uppercase tracking-wider">
            {t('title')}
          </span>
          <h2 
            id="skills-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
          >
            {(() => {
              const subtitle = t('subtitle')
              const words = subtitle.split(' ')
              const firstWord = words[0]
              const rest = words.slice(1).join(' ')
              return (
                <>
                  <span className="gradient-text">{firstWord}</span>
                  {rest && (
                    <>
                      <br />
                      <span className="gradient-text">{rest}</span>
                    </>
                  )}
                </>
              )
            })()}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} skill={skill} index={index} inView={inView} />
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 glass-strong p-8 rounded-xl border-2 border-neon-cyan/30"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-neon-gradient rounded-lg flex items-center justify-center shadow-neon">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">{t('languages.title')}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-dark-card/50 rounded-lg">
              <span className="text-lg font-medium">{t('languages.spanish')}</span>
              <span className="text-neon-cyan">{t('languages.spanishLevel')}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-dark-card/50 rounded-lg">
              <span className="text-lg font-medium">{t('languages.english')}</span>
              <span className="text-neon-cyan">{t('languages.englishLevel')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: {
    category: string
    icon: any
    technologies: string[]
    color: string
  }
  index: number
  inView: boolean
}) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="skill-card glass-strong p-6 rounded-xl hover:scale-105 transition-all group relative overflow-hidden border-2 border-transparent hover:border-neon-purple/50"
    >
      <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
      <div
        className={`w-14 h-14 bg-neon-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-neon relative z-10`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
      <div className="flex flex-wrap gap-2">
        {skill.technologies.map((tech) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0.7, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="px-3 py-1 bg-dark-card/80 rounded-full text-sm text-gray-300 hover:bg-neon-purple/20 hover:text-neon-cyan border border-transparent hover:border-neon-purple/30 transition-all cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
