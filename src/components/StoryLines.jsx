import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// Shows an array of lines one at a time, each staying on screen for `hold` ms.
// Calls onDone once the last line has shown for `hold` ms.
export default function StoryLines({ lines, hold = 1700, className = '', onDone }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= lines.length) {
      const t = setTimeout(() => onDone?.(), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), hold)
    return () => clearTimeout(t)
  }, [index, lines.length, hold, onDone])

  return (
    <div className={`story-lines ${className}`}>
      <AnimatePresence mode="wait">
        {index < lines.length && (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {lines[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
