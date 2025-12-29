'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong p-8 rounded-xl max-w-md text-center border-2 border-neon-purple/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-8xl font-bold gradient-text mb-4"
        >
          404
        </motion.div>
        <h1 className="text-3xl font-bold mb-4 text-white">
          Página no encontrada
        </h1>
        <p className="text-gray-300 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.a
            href="/es"
            className="px-6 py-3 bg-neon-gradient rounded-lg font-semibold text-white hover:shadow-neon transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </motion.a>
          <motion.button
            onClick={() => window.history.back()}
            className="px-6 py-3 glass-strong rounded-lg font-semibold text-white border-2 border-neon-purple/50 hover:border-neon-pink/70 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

