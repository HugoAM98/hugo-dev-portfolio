'use client'

import { motion } from 'framer-motion'
import { Grid3x3, List } from 'lucide-react'

type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 glass-strong p-1 rounded-lg border border-neon-purple/30">
      <motion.button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded-md transition-all ${
          viewMode === 'grid'
            ? 'bg-neon-gradient text-white shadow-neon'
            : 'text-gray-400 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Grid view"
        aria-pressed={viewMode === 'grid'}
      >
        <Grid3x3 className="w-5 h-5" />
      </motion.button>
      <motion.button
        onClick={() => onViewModeChange('list')}
        className={`p-2 rounded-md transition-all ${
          viewMode === 'list'
            ? 'bg-neon-gradient text-white shadow-neon'
            : 'text-gray-400 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="List view"
        aria-pressed={viewMode === 'list'}
      >
        <List className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

