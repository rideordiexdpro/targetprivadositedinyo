"use client"

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Play, Pause, Settings } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(25)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = volume / 100

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume])

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

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0]
    setVolume(volumeValue)
    
    const audio = audioRef.current
    if (audio) {
      audio.volume = volumeValue / 100
    }
  }

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 25)
  }

  return (
    <>
      <audio ref={audioRef} preload="auto" src="/background-music.mp3" />
      
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Main Control */}
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full px-3 py-2 shadow-lg">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-200"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white ml-0.5" />
              )}
            </button>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-200"
              title={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-white/70" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-white/70" />
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowControls(!showControls)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-200"
              title="Settings"
            >
              <Settings className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${
                showControls ? 'rotate-90' : ''
              }`} />
            </button>

            {/* Status Indicator */}
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-green-400' : 'bg-gray-500'
            }`} />
          </div>

          {/* Extended Controls */}
          {showControls && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl">
              <div className="space-y-3">
                {/* Volume Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white/80">Volume</span>
                    <span className="text-xs text-white/50">{volume}%</span>
                  </div>
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Info */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Background Music</span>
                    <div className="flex items-center gap-1">
                      <div className={`w-1 h-1 rounded-full ${
                        isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                      }`} />
                      <span className="text-white/40">
                        {isPlaying ? 'Playing' : 'Stopped'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
