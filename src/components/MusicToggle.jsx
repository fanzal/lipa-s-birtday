import { useEffect, useRef, useState } from 'react'

export default function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay-safe: if play fails (e.g. no file yet), just no-op.
      })
      setPlaying(true)
    }
  }

  return (
    <div className="music-toggle">
      <audio ref={audioRef} src="/audio/birthday.mp3" loop preload="none" />
      <button className="music-button" onClick={toggle} aria-pressed={playing}>
        <span aria-hidden="true">{playing ? '🔊' : '🔈'}</span>
        <span className="music-label">{playing ? 'Music on' : 'Music'}</span>
      </button>
    </div>
  )
}
