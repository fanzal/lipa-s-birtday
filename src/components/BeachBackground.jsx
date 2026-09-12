import { motion } from 'framer-motion'

// phase: 'day' | 'golden' | 'sunset' | 'night'
const SKY = {
  day: ['#BFE6F2', '#E8F6F1', '#FBF3E4'],
  golden: ['#9FD3E6', '#FBD8A8', '#FCE9CF'],
  sunset: ['#5B7FA6', '#F0955C', '#FBC9A3'],
  night: ['#1C2B4A', '#3B4E78', '#E8C9A0'],
}

const SUN = {
  day: { color: '#FFE9B8', top: '14%', glow: 'rgba(255,233,184,0.55)' },
  golden: { color: '#FFC97A', top: '32%', glow: 'rgba(255,201,122,0.6)' },
  sunset: { color: '#FF8C6B', top: '58%', glow: 'rgba(255,140,107,0.65)' },
  night: { color: '#F4E7C9', top: '70%', glow: 'rgba(244,231,201,0.15)' },
}

function Stars({ visible }) {
  const stars = Array.from({ length: 40 })
  return (
    <div className={`stars-layer ${visible ? 'stars-visible' : ''}`}>
      {stars.map((_, i) => (
        <span
          key={i}
          className="tiny-star"
          style={{
            top: `${(i * 37) % 60}%`,
            left: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 10) * 0.4}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function BeachBackground({ phase = 'day', children }) {
  const [top, mid, bottom] = SKY[phase]
  const sun = SUN[phase]

  return (
    <div
      className="beach-bg"
      style={{
        background: `linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bottom} 100%)`,
      }}
    >
      <Stars visible={phase === 'night'} />

      <motion.div
        className="sun"
        animate={{ top: sun.top, backgroundColor: sun.color, boxShadow: `0 0 60px 30px ${sun.glow}` }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />

      <div className="palm-silhouette palm-left" aria-hidden="true">
        <PalmTree />
      </div>
      <div className="palm-silhouette palm-right" aria-hidden="true">
        <PalmTree flip />
      </div>

      {children}

      <div className="sand-strip" aria-hidden="true">
        <div className="sand-texture" />
      </div>
    </div>
  )
}

function PalmTree({ flip = false }) {
  return (
    <svg
      viewBox="0 0 120 200"
      width="140"
      height="230"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <path
        d="M60 200 C 55 150, 65 110, 58 70"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M58 70 C ${40 - i * 8} ${55 - i * 4}, ${10 - i * 6} ${50 - i * 6}, ${2 - i * 4} ${
            40 - i * 8
          }`}
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          className="palm-leaf"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`r${i}`}
          d={`M58 70 C ${76 + i * 8} ${55 - i * 4}, ${106 + i * 6} ${50 - i * 6}, ${114 + i * 4} ${
            40 - i * 8
          }`}
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          className="palm-leaf"
          style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
        />
      ))}
    </svg>
  )
}
