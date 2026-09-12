import { useRef, useCallback } from 'react'

// Optional, lightweight sound-effect player.
// If the audio file isn't present yet, play() just fails silently.
export default function useSound(src, volume = 0.4) {
  const ref = useRef(null)

  const play = useCallback(() => {
    if (!ref.current) {
      ref.current = new Audio(src)
      ref.current.volume = volume
    }
    ref.current.currentTime = 0
    ref.current.play().catch(() => {})
  }, [src, volume])

  return play
}
