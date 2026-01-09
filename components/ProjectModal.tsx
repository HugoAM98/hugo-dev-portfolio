'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  color: string
  category: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const t = useTranslations('projects')

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-[101] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-strong rounded-2xl border-2 border-neon-purple/30 max-w-4xl w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 glass-strong rounded-lg border border-neon-purple/30 hover:border-neon-cyan/50 transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Content */}
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Header with Image */}
                  <div className="mb-6">
                    <div
                      className={`w-full h-48 sm:h-64 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-8xl sm:text-9xl mb-6 shadow-neon-lg`}
                    >
                      {project.image}
                    </div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
                            {t(`categories.${project.category}`)}
                          </span>
                        </div>
                        <h2
                          id="project-modal-title"
                          className="text-3xl sm:text-4xl font-bold gradient-text mb-2"
                        >
                          {project.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neon-cyan mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      About this project
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neon-cyan mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-dark-card/80 rounded-lg text-sm text-gray-300 border border-neon-purple/20 hover:border-neon-cyan/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neon-purple/20">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white bg-dark-card/60 hover:bg-dark-card border border-neon-purple/20 hover:border-neon-cyan/50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan flex-1"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-5 h-5" />
                      {t('viewCode')}
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-neon-gradient/80 hover:bg-neon-gradient border border-transparent rounded-lg shadow-neon hover:shadow-neon-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan flex-1"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      {t('viewDemo')}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

