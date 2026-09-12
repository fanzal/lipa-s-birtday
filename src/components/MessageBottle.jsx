import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../useSound.js'

export default function MessageBottle({ name, letter, onDone }) {
  const [open, setOpen] = useState(false)
  const playOpen = useSound('/audio/open.mp3', 0.35)

  const handleOpen = () => {
    playOpen()
    setOpen(true)
  }

  return (
    <div className="bottle-scene">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="bottle"
            className="bottle-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.p
              className="scene-line"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Something washed ashore...
            </motion.p>

            <motion.button
              className="bottle-button"
              onClick={() => handleOpen()}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Open the bottle"
            >
              <BottleSVG />
            </motion.button>

            <button className="cta-button" onClick={() => handleOpen()}>
              Open the bottle
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="letter-card"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="letter-salutation">{fill(letter.salutation, name)}</p>
            {letter.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="letter-paragraph"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i + 0.2 }}
              >
                {fill(p, name)}
              </motion.p>
            ))}
            <motion.p
              className="letter-signoff"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 * letter.paragraphs.length + 0.4 }}
            >
              {letter.signoff}
            </motion.p>

            <button className="cta-button cta-light" onClick={onDone}>
              Keep going →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function fill(str, name) {
  return str.replaceAll('{name}', name)
}

function BottleSVG() {
  return (
    <svg viewBox="0 0 80 140" width="70" height="120">
      <path
        d="M30 10 L30 30 C15 40 12 55 12 75 L12 120 C12 130 20 136 40 136 C60 136 68 130 68 120 L68 75 C68 55 65 40 50 30 L50 10 Z"
        fill="rgba(180,220,210,0.55)"
        stroke="#8FBFB2"
        strokeWidth="2"
      />
      <rect x="28" y="4" width="24" height="10" rx="3" fill="#C9A46B" />
      <path d="M20 90 Q40 100 60 90 L60 118 Q40 126 20 118 Z" fill="#F4EBD6" opacity="0.8" />
    </svg>
  )
}
