import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import BeachBackground from './components/BeachBackground.jsx'
import Ocean from './components/Ocean.jsx'
import Clouds from './components/Clouds.jsx'
import Crab from './components/Crab.jsx'
import MessageBottle from './components/MessageBottle.jsx'
import WishStars from './components/WishStars.jsx'
import GiftBox from './components/GiftBox.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import EasterEgg from './components/EasterEgg.jsx'
import StoryLines from './components/StoryLines.jsx'
import BeachConfetti from './components/BeachConfetti.jsx'
import useSound from './useSound.js'

import birthdayData from './data/birthdayData.js'

const SCENES = ['arrival', 'walk', 'reveal', 'crab', 'bottle', 'wishes', 'sunset', 'gift']

export default function App() {
  const [scene, setScene] = useState(0)
  const [revealDone, setRevealDone] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)

  const key = SCENES[scene]
  const playClick = useSound('/audio/click.mp3', 0.3)
  const goNext = () => {
    playClick()
    setScene((s) => Math.min(s + 1, SCENES.length - 1))
  }
  const restart = () => {
    playClick()
    setRevealDone(false)
    setGiftOpened(false)
    setScene(0)
  }

  const phase =
    key === 'wishes'
      ? 'night'
      : key === 'sunset' || key === 'gift'
        ? 'sunset'
        : key === 'reveal'
          ? 'golden'
          : 'day'

  return (
    <div className="app-shell">
      <MusicToggle />

      <BeachBackground phase={phase}>
        <Clouds count={key === 'wishes' ? 0 : 3} showBird={key !== 'wishes'} />
        <Ocean tone={phase} />

        <div className="progress-trail" aria-hidden="true">
          {SCENES.map((_, i) => (
            <span key={i} className={`trail-dot ${i <= scene ? 'trail-dot-active' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.main
            key={key}
            className="scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {key === 'arrival' && <ArrivalScene onNext={goNext} />}
            {key === 'walk' && <WalkScene onNext={goNext} />}
            {key === 'reveal' && (
              <RevealScene
                name={birthdayData.name}
                done={revealDone}
                onRevealed={() => setRevealDone(true)}
                onNext={goNext}
              />
            )}
            {key === 'crab' && <CrabScene onNext={goNext} lines={birthdayData.crabLines} />}
            {key === 'bottle' && (
              <div className="scene-inner">
                <MessageBottle name={birthdayData.name} letter={birthdayData.letter} onDone={goNext} />
              </div>
            )}
            {key === 'wishes' && <WishesScene wishes={birthdayData.wishes} onNext={goNext} />}
            {key === 'sunset' && <SunsetScene onNext={goNext} />}
            {key === 'gift' && (
              <GiftScene
                data={birthdayData}
                opened={giftOpened}
                onOpen={() => setGiftOpened(true)}
                onRestart={restart}
              />
            )}
          </motion.main>
        </AnimatePresence>
      </BeachBackground>
    </div>
  )
}

function ArrivalScene({ onNext }) {
  return (
    <div className="scene-inner scene-center">
      <StoryLines
        lines={["Hey, you...", 'Someone left something for you by the sea.']}
        hold={1900}
        className="story-lines-lg"
      />
      <motion.button
        className="cta-button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.6 }}
        onClick={onNext}
      >
        Walk to the shore →
      </motion.button>
    </div>
  )
}

function WalkScene({ onNext }) {
  const critters = ['🐚', '⭐', '🦀', '🐟', '🫧']
  return (
    <div className="scene-inner scene-center">
      <div className="shore-life" aria-hidden="true">
        {critters.map((c, i) => (
          <span
            key={i}
            className="shore-critter"
            style={{ left: `${8 + i * 20}%`, animationDelay: `${i * 0.6}s` }}
          >
            {c}
          </span>
        ))}
      </div>
      <StoryLines lines={['Take a little walk...', "I've got something to tell you."]} hold={1900} />
      <motion.button
        className="cta-button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.6 }}
        onClick={onNext}
      >
        Keep walking →
      </motion.button>
      <EasterEgg config={birthdayData.easterEgg} />
    </div>
  )
}

function RevealScene({ name, done, onRevealed, onNext }) {
  return (
    <div className="scene-inner scene-center">
      {!done ? (
        <StoryLines
          lines={['Wait...', "There's something you almost forgot.", 'Today is YOUR day.']}
          hold={1800}
          onDone={onRevealed}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'backOut' }}
          className="reveal-block"
        >
          <BeachConfetti count={30} />
          <h1 className="reveal-title">HAPPY BIRTHDAY! 🎂🌊</h1>
          <p className="reveal-name">Happy Birthday, {name}!</p>
          <button className="cta-button" onClick={onNext}>
            Keep going →
          </button>
        </motion.div>
      )}
    </div>
  )
}

function CrabScene({ onNext, lines }) {
  return (
    <div className="scene-inner scene-center">
      <StoryLines
        lines={['Meet your birthday assistant.', "He's been trying to deliver your present all day."]}
        hold={2000}
      />
      <Crab lines={lines} />
      <motion.button
        className="cta-button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
        onClick={onNext}
      >
        Follow him →
      </motion.button>
    </div>
  )
}

function WishesScene({ wishes, onNext }) {
  return (
    <div className="scene-inner scene-center">
      <h2 className="scene-title">Make a wish.</h2>
      <p className="scene-line">Pick a star and make a wish.</p>
      <WishStars wishes={wishes} />
      <button className="cta-button cta-floating" onClick={onNext}>
        Continue →
      </button>
    </div>
  )
}

function SunsetScene({ onNext }) {
  return (
    <div className="scene-inner scene-center">
      <StoryLines
        lines={[
          'One last thing...',
          "Don't forget...",
          'You deserve beautiful things.',
          'Not just today.',
          'Every day.',
        ]}
        hold={1700}
        className="story-lines-lg"
        onDone={() => {}}
      />
      <motion.button
        className="cta-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8.7 }}
        onClick={onNext}
      >
        One more thing →
      </motion.button>
    </div>
  )
}

function GiftScene({ data, opened, onOpen, onRestart }) {
  return (
    <div className="scene-inner scene-center">
      {!opened && <StoryLines lines={['Okay...', 'Last surprise.']} hold={1500} />}
      <GiftBox opened={opened} onOpen={onOpen} />
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="closing-block"
          >
            <h2 className="reveal-title reveal-title-sm">
              {data.closing.title.replace('{name}', data.name)}
            </h2>
            <p className="scene-line">{data.closing.body}</p>
            <p className="scene-line scene-line-soft">{data.closing.farewell}</p>
            <button className="cta-button cta-light" onClick={onRestart}>
              Replay the journey ↻
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
