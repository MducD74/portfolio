import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const words = ['Design', 'Create', 'Inspire']

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 2700

    const updateCounter = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const newCount = Math.floor(progress * 100)
      setCount(newCount)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setCount(100)
        setTimeout(onComplete, 400)
      }
    }

    requestAnimationFrame(updateCounter)

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 900)

    return () => clearInterval(wordInterval)
  }, [onComplete])

  const displayCount = String(count).padStart(3, '0')

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Portfolio Label - Top Left */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-xs text-muted uppercase tracking-[0.3em] font-body">
          Portfolio
        </p>
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10">
        {/* Rotating Words */}
        <div className="h-32 md:h-40 lg:h-48 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 whitespace-nowrap"
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter - Bottom Right of center */}
        <div className="text-center">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums font-light">
            {displayCount}
          </div>
        </div>
      </div>

      {/* Progress Bar - Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50"
        initial={{ width: '0%' }}
      >
        <motion.div
          className="h-full accent-gradient shadow-lg"
          style={{
            width: `${count}%`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
          transition={{ type: 'tween', ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  )
}
