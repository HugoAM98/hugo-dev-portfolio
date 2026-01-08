'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type ProjectCategory = 'all' | 'portfolio' | 'saas' | 'ecommerce' | 'mobile' | 'other'

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  color: string
  category: ProjectCategory
}

/**
 * Portfolio Projects Data
 * 
 * IMPORTANT: Update these projects with your actual work
 * Include real project links, descriptions, and technologies used
 * This showcases your expertise and real-world experience
 */
const projects: Project[] = [
  {
    title: 'E-commerce Platform #1',
    description:
      'Plataforma ecommerce desarrollada con Laravel y Vue.js. Integración de APIs de pago, Google Analytics y sistema de gestión de inventario completo.',
    technologies: ['Laravel', 'Vue.js', 'TypeScript', 'APIs', 'Google Analytics'],
    image: '🛒',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-blue-500 to-cyan-500',
    category: 'ecommerce',
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
    category: 'ecommerce',
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
    category: 'ecommerce',
  },
  {
    title: 'Dashboard Analytics SaaS',
    description:
      'Dashboard interactivo con visualización de datos en tiempo real y múltiples métricas empresariales. Plataforma SaaS completa con suscripciones.',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Stripe'],
    image: '📈',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-orange-500 to-red-500',
    category: 'saas',
  },
  {
    title: 'CRM SaaS Platform',
    description:
      'Sistema de gestión de relaciones con clientes completo. Incluye gestión de leads, pipeline de ventas, automatizaciones y reportes avanzados.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'WebSockets'],
    image: '💼',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-indigo-500 to-purple-500',
    category: 'saas',
  },
  {
    title: 'Project Management SaaS',
    description:
      'Herramienta de gestión de proyectos con tableros Kanban, seguimiento de tiempo, colaboración en equipo y reportes detallados.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    image: '📋',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-cyan-500 to-blue-500',
    category: 'saas',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Portfolio personal desarrollado con Next.js, diseño moderno y responsive. Incluye secciones de proyectos, habilidades y contacto.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '🎨',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-pink-500 to-rose-500',
    category: 'portfolio',
  },
  {
    title: 'Developer Portfolio',
    description:
      'Sitio web portfolio para desarrollador con animaciones suaves, diseño minimalista y optimizado para SEO y rendimiento.',
    technologies: ['React', 'Gatsby', 'GraphQL', 'Styled Components'],
    image: '💻',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-violet-500 to-purple-500',
    category: 'portfolio',
  },
  {
    title: 'App Móvil Multiplataforma',
    description:
      'Aplicación móvil desarrollada con React Native para iOS y Android con sincronización en tiempo real y notificaciones push.',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
    image: '📱',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-yellow-500 to-orange-500',
    category: 'mobile',
  },
  {
    title: 'Fitness Mobile App',
    description:
      'Aplicación móvil de fitness con seguimiento de ejercicios, rutinas personalizadas, progreso y integración con wearables.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Expo'],
    image: '🏋️',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-red-500 to-pink-500',
    category: 'mobile',
  },
  {
    title: 'Plataforma de Aprendizaje',
    description:
      'Sistema de gestión de aprendizaje online con cursos, certificados y seguimiento de progreso. Incluye video streaming y evaluaciones.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'FFmpeg'],
    image: '🎓',
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-teal-500 to-cyan-500',
    category: 'other',
  },
]

export default function Projects() {
  const t = useTranslations('projects')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t('categories.all') },
    { key: 'portfolio', label: t('categories.portfolio') },
    { key: 'saas', label: t('categories.saas') },
    { key: 'ecommerce', label: t('categories.ecommerce') },
    { key: 'mobile', label: t('categories.mobile') },
    { key: 'other', label: t('categories.other') },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-dark-card/30 relative overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
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
              <h2 
                id="projects-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4"
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
            </div>
            <p className="text-lg text-gray-300 max-w-md lg:text-right">
              {t('description')}
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card ${
                  selectedCategory === category.key
                    ? 'bg-neon-gradient text-white shadow-neon-lg'
                    : 'glass-strong text-gray-300 hover:text-white border-2 border-neon-purple/30 hover:border-neon-cyan/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Filter by ${category.label}`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              inView={inView}
              t={t}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">{t('noProjects')}</p>
          </motion.div>
        )}
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
  project: Project
  index: number
  inView: boolean
  t: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="project-card glass-strong rounded-xl p-6 border-2 border-neon-cyan/30 hover:border-neon-purple/50 transition-all relative overflow-hidden group h-full flex flex-col"
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

      <div className="p-6 relative z-10 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
            {t(`categories.${project.category}`)}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors gradient-text">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-5 leading-relaxed flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-dark-card/80 rounded text-xs text-gray-300 border border-neon-purple/20 hover:border-neon-cyan/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        {/* Optimized CTAs - More prominent and clear */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-neon-purple/20">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-dark-card/60 hover:bg-dark-card border border-neon-purple/20 hover:border-neon-cyan/50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card flex-1 justify-center"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            {t('viewCode')}
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neon-gradient/80 hover:bg-neon-gradient border border-transparent rounded-lg shadow-neon hover:shadow-neon-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card flex-1 justify-center"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
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
