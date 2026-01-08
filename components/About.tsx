'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Building2, GraduationCap } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('about')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experience = [
    {
      company: t('experience.bitbox.company'),
      position: t('experience.bitbox.position'),
      period: t('experience.bitbox.period'),
      description: t('experience.bitbox.description'),
      technologies: ['Laravel', 'PHP', 'TypeScript', 'Vue.js', 'APIs REST', 'MySQL'],
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
    },
    {
      company: t('experience.mbc.company'),
      position: t('experience.mbc.position'),
      period: t('experience.mbc.period'),
      description: t('experience.mbc.description'),
      technologies: ['Java', 'CRM', 'Automatización', 'Web Development'],
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-500',
    },
  ]

  const education = [
    {
      title: t('education.daw.title'),
      institution: t('education.daw.institution'),
      icon: GraduationCap,
    },
    {
      title: t('education.dam.title'),
      institution: t('education.dam.institution'),
      icon: GraduationCap,
    },
    {
      title: t('education.bachillerato.title'),
      institution: t('education.bachillerato.institution'),
      icon: GraduationCap,
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-dark-card/30 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-cyan text-sm font-semibold uppercase tracking-wider">
            {t('title')}
          </span>
          <h2 
            id="about-heading"
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

        {/* Experience Timeline */}
        <div className="space-y-6 mb-16">
          {experience.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="glass-strong p-8 rounded-xl border-2 border-neon-purple/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center shadow-neon flex-shrink-0`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 gradient-text">{exp.company}</h3>
                      <p className="text-neon-cyan font-semibold mb-2">{exp.position}</p>
                      <p className="text-gray-400 text-sm">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-card/80 rounded-full text-sm text-gray-300 border border-neon-purple/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8 gradient-text text-center">{t('education.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => {
              const Icon = edu.icon
              return (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="glass-strong p-6 rounded-xl border-2 border-neon-cyan/30 hover:border-neon-purple/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-neon-gradient rounded-lg flex items-center justify-center mb-4 shadow-neon">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{edu.title}</h4>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
