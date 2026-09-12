import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasterEgg({ config }) {
  const [count, setCount] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const handleClick = () => {
    const next = count + 1
    setCount(next)
    if (next >= config.clicksNeeded) setRevealed(true)
  }

  return (
    <div className="easter-egg">
      <button className="egg-trigger" onClick={handleClick} aria-label="A little something in the sand">
        {config.prompt}
      </button>
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="egg-reveal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p>{config.found}</p>
            <p>{config.reward}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
