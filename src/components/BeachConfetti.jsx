import { motion } from 'framer-motion'

const SHAPES = ['🐚', '✨', '💛', '🫧', '🌸']

export default function BeachConfetti({ count = 26 }) {
  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    shape: SHAPES[i % SHAPES.length],
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.6 + Math.random() * 1.6,
    rotate: Math.random() * 360,
    size: 14 + Math.random() * 14,
  }))

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="confetti-piece"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        >
          {p.shape}
        </motion.span>
      ))}
    </div>
  )
}
