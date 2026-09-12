import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../useSound.js'

export default function WishStars({ wishes }) {
  const playSparkle = useSound('/audio/sparkle.mp3', 0.3)
  const positions = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        top: 10 + ((i * 53) % 55),
        left: 6 + ((i * 31) % 88),
      })),
    [],
  )

  const [activeWish, setActiveWish] = useState(null)
  const [litStars, setLitStars] = useState({})

  const handlePick = (id) => {
    playSparkle()
    const wish = wishes[Math.floor(Math.random() * wishes.length)]
    setActiveWish({ id: Date.now(), text: wish })
    setLitStars((prev) => ({ ...prev, [id]: true }))
    window.clearTimeout(handlePick._t)
    handlePick._t = window.setTimeout(() => setActiveWish(null), 3200)
  }

  return (
    <div className="wish-field">
      {positions.map((p) => (
        <button
          key={p.id}
          className={`wish-star ${litStars[p.id] ? 'wish-star-lit' : ''}`}
          style={{ top: `${p.top}%`, left: `${p.left}%` }}
          onClick={() => handlePick(p.id)}
          aria-label="Pick a star and make a wish"
        >
          ✦
        </button>
      ))}

      <AnimatePresence>
        {activeWish && (
          <motion.div
            key={activeWish.id}
            className="wish-toast"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {activeWish.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
