"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Fade in and out
        if (particle.life < particle.maxLife * 0.1) {
          particle.opacity = (particle.life / (particle.maxLife * 0.1)) * 0.3
        } else if (particle.life > particle.maxLife * 0.9) {
          particle.opacity = ((particle.maxLife - particle.life) / (particle.maxLife * 0.1)) * 0.3
        }

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle()
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 171, 59, ${particle.opacity * 0.4})`
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
