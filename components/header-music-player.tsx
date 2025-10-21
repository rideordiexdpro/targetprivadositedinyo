"use client"

import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

export function HeaderMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = 0.25 // Fixed volume at 25%

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log('Audio play error:', error)
    }
  }

  return (
    <>
      <audio ref={audioRef} preload="auto" src="/background-music.mp3" />
      
      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-full px-3 py-2 backdrop-blur-sm">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-1 hover:bg-orange-500/20 rounded-full transition-all duration-200"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 text-orange-400" />
          ) : (
            <Play className="w-3 h-3 text-orange-400 ml-0.5" />
          )}
        </button>

        {/* Status Indicator */}
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          isPlaying ? 'bg-orange-400 animate-pulse' : 'bg-orange-400/30'
        }`} />
      </div>
    </>
  )
}
