'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Search, X, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import ProjectModal from './ProjectModal'
import Tooltip from './Tooltip'
import ViewToggle from './ViewToggle'
import { trackEvent } from './Analytics'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('projectViewMode') as 'grid' | 'list' | null
    if (savedViewMode) {
      setViewMode(savedViewMode)
    }
  }, [])

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('projectViewMode', viewMode)
  }, [viewMode])

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t('categories.all') },
    { key: 'portfolio', label: t('categories.portfolio') },
    { key: 'saas', label: t('categories.saas') },
    { key: 'ecommerce', label: t('categories.ecommerce') },
    { key: 'mobile', label: t('categories.mobile') },
    { key: 'other', label: t('categories.other') },
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="projects"
      ref={ref}
      className="py-12 sm:py-16 lg:py-28 px-4 sm:px-6 lg:px-8 bg-dark-card/30 relative overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-8">
            <div className="text-center lg:text-left w-full lg:w-auto">
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-neon-cyan text-xs sm:text-sm font-semibold uppercase tracking-wider"
              >
                {t('title')}
              </motion.span>
              <h2 
                id="projects-heading"
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-2 sm:mt-4"
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
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-md mx-auto lg:mx-0 text-center lg:text-right">
              {t('description')}
            </p>
          </div>
        </motion.div>

        {/* Search and Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 sm:mb-12 space-y-4"
        >
          {/* Search Bar and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  trackEvent('search', 'projects', e.target.value)
                }}
                placeholder={t('searchPlaceholder') || 'Search projects...'}
                className="w-full pl-12 pr-10 py-3 bg-dark-card/60 border-2 border-neon-purple/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-cyan transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <ViewToggle
              viewMode={viewMode}
              onViewModeChange={(mode) => {
                setViewMode(mode)
                trackEvent('view_toggle', 'projects', mode)
              }}
            />
          </div>

          {/* Category Filter - Mobile horizontal scroll */}
          <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 sm:pb-0 sm:flex-wrap sm:justify-center lg:justify-start hide-scrollbar scroll-smooth">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => {
                  setSelectedCategory(category.key)
                  trackEvent('filter_category', 'projects', category.key)
                }}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.key
                    ? 'bg-neon-gradient text-white shadow-neon-lg scale-105'
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

        {/* Projects Grid/List - Mobile single column with better spacing */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
              : 'flex flex-col gap-4 sm:gap-6'
          }
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              inView={inView}
              t={t}
              viewMode={viewMode}
              onViewDetails={(project) => {
                setSelectedProject(project)
                setIsModalOpen(true)
                trackEvent('view_project', 'projects', project.title)
              }}
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

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProject(null)
        }}
      />
    </section>
  )
}

function ProjectCard({
  project,
  index,
  inView,
  t,
  viewMode,
  onViewDetails,
}: {
  project: Project
  index: number
  inView: boolean
  t: any
  viewMode: 'grid' | 'list'
  onViewDetails: (project: Project) => void
}) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0.3, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        className="project-card glass-strong rounded-xl p-6 border-2 border-neon-cyan/30 hover:border-neon-purple/50 transition-all relative overflow-hidden group flex flex-row gap-6 cursor-pointer"
        whileHover={{ x: 4 }}
        onClick={() => onViewDetails(project)}
      >
        <div className="absolute inset-0 bg-neon-gradient opacity-5" />
        
        {/* List View Layout */}
        <div className={`flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 text-5xl sm:text-6xl rounded-xl bg-gradient-to-br ${project.color} shadow-lg flex items-center justify-center`}>
          {project.image}
        </div>
        
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30 mb-2">
                {t(`categories.${project.category}`)}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-neon-cyan transition-colors gradient-text">
                {project.title}
              </h3>
            </div>
          </div>
          
          <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-dark-card/80 rounded-md text-xs text-gray-300 border border-neon-purple/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2 py-1 bg-dark-card/80 rounded-md text-xs text-gray-400">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>
          
          <div className="flex gap-3 mt-auto">
            <Tooltip content="View project details" position="top">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails(project)
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neon-gradient/80 hover:bg-neon-gradient border border-transparent rounded-lg shadow-neon transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4" />
                Details
              </motion.button>
            </Tooltip>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-dark-card/60 hover:bg-dark-card border border-neon-purple/20 hover:border-neon-cyan/50 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4" />
              {t('viewCode')}
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neon-gradient/80 hover:bg-neon-gradient border border-transparent rounded-lg shadow-neon transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              {t('viewDemo')}
            </motion.a>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0.3, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="project-card glass-strong rounded-2xl sm:rounded-xl p-4 sm:p-6 border-2 border-neon-cyan/30 hover:border-neon-purple/50 transition-all relative overflow-hidden group h-full flex flex-col cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={() => onViewDetails(project)}
    >
      <div className="absolute inset-0 bg-neon-gradient opacity-5" />
      
      {/* Mobile: Compact header with image and category */}
      <div className="relative z-10 flex items-start gap-4 mb-4 sm:mb-6">
        <div
          className={`flex items-center justify-center h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0 text-4xl sm:text-6xl rounded-xl sm:rounded-lg bg-gradient-to-br ${project.color} shadow-lg`}
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
        
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
              {t(`categories.${project.category}`)}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-neon-cyan transition-colors gradient-text line-clamp-2">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow px-0 sm:px-6">
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-5 leading-relaxed flex-grow line-clamp-3 sm:line-clamp-none">
          {project.description}
        </p>
        
        {/* Technologies - Mobile optimized */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-dark-card/80 rounded-md text-xs text-gray-300 border border-neon-purple/20 hover:border-neon-cyan/50 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-dark-card/80 rounded-md text-xs text-gray-400 border border-neon-purple/20">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        
        {/* Optimized CTAs - Mobile stacked */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4 border-t border-neon-purple/20">
          <Tooltip content="View project details" position="top">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails(project)
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium text-white bg-neon-gradient/80 hover:bg-neon-gradient border border-transparent rounded-lg shadow-neon hover:shadow-neon-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card flex-1"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              aria-label="View project details"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              Details
            </motion.button>
          </Tooltip>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-300 hover:text-white bg-dark-card/60 hover:bg-dark-card border border-neon-purple/20 hover:border-neon-cyan/50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card flex-1"
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
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium text-white bg-neon-gradient/80 hover:bg-neon-gradient border border-transparent rounded-lg shadow-neon hover:shadow-neon-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-card flex-1"
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
