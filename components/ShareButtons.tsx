'use client'

import { motion } from 'framer-motion'
import { Share2, Twitter, Linkedin, Facebook, Link2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
}

export default function ShareButtons({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Hugo - Full Stack Developer Portfolio',
  description = 'Full Stack Developer with 4+ years of experience'
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('contact')

  const shareData = {
    title,
    text: description,
    url,
  }

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'facebook' | 'native') => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=hugo`,
          '_blank',
          'width=550,height=420'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          '_blank',
          'width=550,height=420'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          '_blank',
          'width=550,height=420'
        )
        break
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share(shareData)
          } catch (err) {
            console.log('Error sharing:', err)
          }
        }
        break
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log('Error copying:', err)
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-gray-400 mr-2">Share:</span>
      
      {/* Native Share (Mobile) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <motion.button
          onClick={() => handleShare('native')}
          className="p-2 glass-strong rounded-lg border border-neon-purple/30 hover:border-neon-cyan/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Share using native share"
        >
          <Share2 className="w-4 h-4 text-neon-cyan" />
        </motion.button>
      )}

      {/* Twitter */}
      <motion.button
        onClick={() => handleShare('twitter')}
        className="p-2 glass-strong rounded-lg border border-neon-purple/30 hover:border-cyan-400/50 transition-all hover:bg-cyan-500/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-cyan-400" />
      </motion.button>

      {/* LinkedIn */}
      <motion.button
        onClick={() => handleShare('linkedin')}
        className="p-2 glass-strong rounded-lg border border-neon-purple/30 hover:border-blue-400/50 transition-all hover:bg-blue-500/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-blue-400" />
      </motion.button>

      {/* Facebook */}
      <motion.button
        onClick={() => handleShare('facebook')}
        className="p-2 glass-strong rounded-lg border border-neon-purple/30 hover:border-blue-500/50 transition-all hover:bg-blue-600/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-blue-500" />
      </motion.button>

      {/* Copy Link */}
      <motion.button
        onClick={handleCopy}
        className="p-2 glass-strong rounded-lg border border-neon-purple/30 hover:border-neon-cyan/50 transition-all hover:bg-neon-cyan/10 flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs text-gray-400 hidden sm:inline">Copy</span>
          </>
        )}
      </motion.button>
    </div>
  )
}

