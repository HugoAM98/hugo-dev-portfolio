'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Puedes editar estos proyectos con tus propios proyectos
const projects = [
  {
    title: 'E-commerce Platform #1',
    description:
      'Plataforma ecommerce desarrollada con Laravel y Vue.js. Integración de APIs de pago, Google Analytics y sistema de gestión de inventario completo.',
    technologies: ['Laravel', 'Vue.js', 'TypeScript', 'APIs', 'Google Analytics'],
    image: '🛒',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'E-commerce Platform #2',
    description:
      'Tienda online con panel de administración avanzado, integración de múltiples APIs, tracking con Google Analytics y optimización de rendimiento.',
    technologies: ['Laravel', 'Vue.js', 'TypeScript', 'REST APIs', 'MySQL'],
    image: '🛍️',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'E-commerce Platform #3',
    description:
      'Solución ecommerce escalable con arquitectura moderna, integración de servicios externos, analytics avanzado y experiencia de usuario optimizada.',
    technologies: ['Laravel', 'Vue.js', 'TypeScript', 'APIs', 'Google Analytics'],
    image: '💳',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Dashboard Analytics',
    description:
      'Dashboard interactivo con visualización de datos en tiempo real y múltiples métricas empresariales.',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
    image: '📈',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Plataforma de Aprendizaje',
    description:
      'Sistema de gestión de aprendizaje online con cursos, certificados y seguimiento de progreso.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
    image: '🎓',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'App Móvil Multiplataforma',
    description:
      'Aplicación móvil desarrollada con React Native para iOS y Android con sincronización en tiempo real.',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
    image: '📱',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-yellow-500 to-orange-500',
  },
]

export default function Projects() {
  const t = useTranslations('projects')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="projects"
      ref={ref}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-dark-card/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-neon-cyan text-sm font-semibold uppercase tracking-wider"
              >
                {t('title')}
              </motion.span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
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
            </div>
            <p className="text-lg text-gray-400 max-w-md lg:text-right">
              {t('description')}
            </p>
          </div>
        </motion.div>

        {/* Masonry-like Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Project - Large */}
          {projects.slice(0, 1).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <ProjectCard project={project} index={index} inView={inView} t={t} />
            </motion.div>
          ))}

          {/* Rest of Projects */}
          {projects.slice(1).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + 1}
              inView={inView}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  inView,
  t,
}: {
  project: typeof projects[0]
  index: number
  inView: boolean
  t: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="project-card glass-strong rounded-xl p-6 border-2 border-neon-cyan/30 hover:border-neon-purple/50 transition-all relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-neon-gradient opacity-5" />
      <div
        className={`relative z-10 flex items-center justify-center h-32 mb-6 text-6xl rounded-lg bg-gradient-to-br ${project.color} shadow-lg`}
      >
        <motion.span
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
            repeatType: 'loop' as const,
            times: [0, 0.33, 0.66, 1],
          }}
        >
          {project.image}
        </motion.span>
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-cyan transition-colors gradient-text">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-dark-card/80 rounded text-xs text-gray-300 border border-neon-purple/20 hover:border-neon-cyan/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            {t('viewCode')}
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            {t('viewDemo')}
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
