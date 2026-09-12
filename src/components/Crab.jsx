import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Crab({ lines }) {
  const [bubble, setBubble] = useState(null)
  const line = useMemo(() => lines[Math.floor(Math.random() * lines.length)], [bubble])

  const handleClick = () => {
    setBubble(Date.now())
    window.clearTimeout(handleClick._t)
    handleClick._t = window.setTimeout(() => setBubble(null), 1600)
  }

  return (
    <motion.div
      className="crab-wrap"
      initial={{ x: '-20vw' }}
      animate={{ x: '110vw' }}
      transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
    >
      {bubble && (
        <motion.div
          className="crab-bubble"
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {line}
        </motion.div>
      )}
      <button
        className="crab-button"
        onClick={handleClick}
        aria-label="A small crab. Tap it."
        title="Tap the crab"
      >
        <svg viewBox="0 0 100 70" width="64" height="46" className="crab-svg">
          <ellipse cx="50" cy="38" rx="26" ry="18" fill="#FF8C6B" />
          <circle cx="38" cy="22" r="5" fill="#FF8C6B" />
          <circle cx="62" cy="22" r="5" fill="#FF8C6B" />
          <circle cx="38" cy="18" r="3.4" fill="#3A2A22" />
          <circle cx="62" cy="18" r="3.4" fill="#3A2A22" />
          <path d="M22 40 L6 30" stroke="#FF8C6B" strokeWidth="5" strokeLinecap="round" className="crab-leg" />
          <path d="M20 48 L2 46" stroke="#FF8C6B" strokeWidth="5" strokeLinecap="round" className="crab-leg" />
          <path d="M24 56 L10 60" stroke="#FF8C6B" strokeWidth="5" strokeLinecap="round" className="crab-leg" />
          <path d="M78 40 L94 30" stroke="#FF8C6B" strokeWidth="5" strokeLinecap="round" className="crab-leg" />
          <path d="M80 48 L98 46" stroke="#FF8C6B" strokeWidth="5" strokeLinecap="round" className="crab-leg" />
          <path d="M76 56 L90 60" stroke="#FF8C6B" strokeWidth="5" strokeLinecap="round" className="crab-leg" />
          <ellipse cx="20" cy="24" rx="7" ry="5" fill="#FF6F4E" className="crab-claw" />
          <ellipse cx="80" cy="24" rx="7" ry="5" fill="#FF6F4E" className="crab-claw" />
        </svg>
      </button>
    </motion.div>
  )
}
