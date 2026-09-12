import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BeachConfetti from './BeachConfetti.jsx'
import useSound from '../useSound.js'

export default function GiftBox({ onOpen, opened }) {
  const [clicked, setClicked] = useState(opened)
  const playOpen = useSound('/audio/open.mp3', 0.35)

  const handleClick = () => {
    playOpen()
    setClicked(true)
    onOpen?.()
  }

  return (
    <div className="gift-scene">
      {clicked && <BeachConfetti count={30} />}
      <motion.button
        className="gift-box"
        onClick={handleClick}
        disabled={clicked}
        whileHover={!clicked ? { scale: 1.05, rotate: -2 } : {}}
        whileTap={!clicked ? { scale: 0.95 } : {}}
        aria-label="Open the final surprise"
      >
        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }}>
              <ChestSVG open={false} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
            >
              <motion.div
                className="chest-glow"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1.6 }}
                transition={{ duration: 0.8 }}
              />
              <ChestSVG open={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      {!clicked && <span className="cta-button" onClick={handleClick}>Open it 🎁</span>}
    </div>
  )
}

function ChestSVG({ open }) {
  return (
    <svg viewBox="0 0 140 110" width="150" height="118">
      <rect x="14" y="50" width="112" height="50" rx="8" fill="#C99A5B" stroke="#8A6432" strokeWidth="3" />
      <rect x="14" y="66" width="112" height="8" fill="#8A6432" />
      <motion.path
        d={open ? 'M14 50 Q70 -10 126 50' : 'M14 50 Q70 20 126 50'}
        fill="#D8AE72"
        stroke="#8A6432"
        strokeWidth="3"
        animate={{ d: open ? 'M14 50 Q70 -10 126 50' : 'M14 50 Q70 20 126 50' }}
        transition={{ duration: 0.6, ease: 'backOut' }}
      />
      <rect x="60" y="55" width="20" height="16" rx="3" fill="#8A6432" />
    </svg>
  )
}
