'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard } from 'lucide-react'

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      setPressedKeys((prev) => new Set([...prev, e.key.toLowerCase()]))

      // Show help modal
      if (e.key === '?' && !e.shiftKey) {
        setShowHelp(true)
      }

      // Navigation shortcuts
      if (e.key === 'h' || e.key === 'H') {
        if (e.ctrlKey || e.metaKey) return
        e.preventDefault()
        document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
      }

      if (e.key === 'a' || e.key === 'A') {
        if (e.ctrlKey || e.metaKey) return
        e.preventDefault()
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
      }

      if (e.key === 's' || e.key === 'S') {
        if (e.ctrlKey || e.metaKey) return
        e.preventDefault()
        document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })
      }

      if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) return
        e.preventDefault()
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
      }

      if (e.key === 'c' || e.key === 'C') {
        if (e.ctrlKey || e.metaKey) return
        e.preventDefault()
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      }

      // Escape to close modals/help
      if (e.key === 'Escape') {
        setShowHelp(false)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev)
        newSet.delete(e.key.toLowerCase())
        return newSet
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const shortcuts = [
    { key: 'H', description: 'Go to Hero section' },
    { key: 'A', description: 'Go to About section' },
    { key: 'S', description: 'Go to Skills section' },
    { key: 'P', description: 'Go to Projects section' },
    { key: 'C', description: 'Go to Contact section' },
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: 'Esc', description: 'Close modals/help' },
  ]

  return (
    <>
      {/* Help Button */}
      <motion.button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 p-3 glass-strong rounded-full border border-neon-purple/30 hover:border-neon-cyan/50 transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Show keyboard shortcuts"
        title="Press ? for keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5 text-neon-cyan" />
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md mx-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
            >
              <div
                className="glass-strong rounded-2xl border-2 border-neon-purple/30 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2
                    id="shortcuts-title"
                    className="text-2xl font-bold gradient-text flex items-center gap-2"
                  >
                    <Keyboard className="w-6 h-6" />
                    Keyboard Shortcuts
                  </h2>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-2 hover:bg-dark-card/50 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <span className="text-gray-400 text-sm">Esc</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between p-3 bg-dark-card/50 rounded-lg"
                    >
                      <span className="text-gray-300">{shortcut.description}</span>
                      <kbd className="px-3 py-1 bg-dark-card border border-neon-purple/30 rounded text-sm font-mono text-neon-cyan">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-gray-400 text-center">
                  Press <kbd className="px-2 py-1 bg-dark-card border border-neon-purple/30 rounded text-neon-cyan">?</kbd> anytime to show this help
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

