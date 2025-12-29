'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Send,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com',
    color: 'hover:text-gray-400',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com',
    color: 'hover:text-cyan-400',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    color: 'hover:text-pink-400',
  },
  {
    name: 'Portfolio',
    icon: Mail,
    url: 'https://hugoamdeveloper.com',
    color: 'hover:text-cyan-400',
  },
]

interface FormData {
  name: string
  email: string
  message: string
  honeypot: string
}

export default function Contact() {
  const t = useTranslations('contact')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('emailInvalid')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('messageMinLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error(t('error'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(t('success'))
        setFormData({ name: '', email: '', message: '', honeypot: '' })
        setErrors({})
      } else {
        toast.error(data.message || t('error'))
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <section
        id="contact"
        ref={ref}
        className="py-32 px-4 sm:px-6 lg:px-8 bg-dark-bg/80 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-neon-pink text-sm font-semibold uppercase tracking-wider"
            >
              {t('title')}
            </motion.span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
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
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Social Links (2 columns) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  {t('connect')}
                </h3>
                <p className="text-gray-400 mb-6">
                  {t('connectDescription')}{' '}
                  <a
                    href="https://hugoamdeveloper.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-neon-pink transition-colors underline"
                  >
                    {t('connectDescriptionLink')}
                  </a>{' '}
                  {t('connectDescriptionEnd')}
                </p>
              </div>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 glass-strong rounded-lg group transition-all ${social.color} border-2 border-transparent hover:border-neon-purple/50 relative overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      aria-label={`Visit my ${social.name} profile`}
                    >
                      <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
                      <Icon className="w-6 h-6 relative z-10" />
                      <span className="text-lg font-medium relative z-10">
                        {social.name}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Contact Form (3 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-3 glass-strong p-8 rounded-xl border-2 border-neon-purple/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-neon-gradient opacity-5" />
              <h3 className="text-2xl font-bold mb-6 gradient-text relative z-10">
                {t('sendMessage')}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    {t('name')} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-card/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-neon-purple/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                    }`}
                    placeholder={t('namePlaceholder')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-sm text-red-400 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    {t('email')} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-card/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-neon-purple/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                    }`}
                    placeholder={t('emailPlaceholder')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-400 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    {t('message')} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-card/50 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none text-white placeholder-gray-500 ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-neon-purple/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                    }`}
                    placeholder={t('messagePlaceholder')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-sm text-red-400 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-neon-gradient rounded-lg font-semibold flex items-center justify-center gap-2 shadow-neon-lg hover:shadow-neon relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
                  whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  aria-label="Send message"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('send')}
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 shine opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 text-center text-gray-400"
          >
            <p>{t('footer', { year: new Date().getFullYear() })}</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
