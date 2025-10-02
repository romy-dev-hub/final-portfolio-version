// components/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@heroui/react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Grid configuration
    const gridSize = 40
    const dotRadius = 1.5
    const connectionDistance = 80
    const particles: Array<{
      x: number
      y: number
      originalX: number
      originalY: number
      vx: number
      vy: number
      size: number
    }> = []

    // Initialize grid of particles
    const initParticles = () => {
      particles.length = 0
      const cols = Math.ceil(canvas.width / gridSize) + 2
      const rows = Math.ceil(canvas.height / gridSize) + 2

      for (let i = -1; i < rows; i++) {
        for (let j = -1; j < cols; j++) {
          particles.push({
            x: j * gridSize,
            y: i * gridSize,
            originalX: j * gridSize,
            originalY: i * gridSize,
            vx: 0,
            vy: 0,
            size: dotRadius
          })
        }
      }
    }

    initParticles()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains('dark')
      const primaryColor = isDark ? '#F9F6F3' : '#1C352D'
      const secondaryColor = isDark ? '#2A3B2E' : '#A6B28B'
      const accentColor = isDark ? '#E8B896' : '#F5C9B0'

      // Update particles
      particles.forEach(particle => {
        const dx = particle.x - mousePosition.x
        const dy = particle.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 120

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 2
          const angle = Math.atan2(dy, dx)
          
          particle.vx += Math.cos(angle) * force
          particle.vy += Math.sin(angle) * force
        }

        // Return to original position
        const returnSpeed = 0.1
        particle.vx += (particle.originalX - particle.x) * returnSpeed
        particle.vy += (particle.originalY - particle.y) * returnSpeed

        // Apply velocity with friction
        particle.vx *= 0.85
        particle.vy *= 0.85
        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = secondaryColor
      ctx.lineWidth = 0.8

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance)
            ctx.globalAlpha = opacity * 0.3
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1

      // Draw mouse influence area
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
        ctx.fill()

        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2)
        ctx.strokeStyle = accentColor
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.3
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-dark-background">
      {/* Animated Grid Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-accent/5 dark:from-dark-background/80 dark:via-transparent dark:to-dark-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent dark:from-dark-background/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary dark:text-dark-primary">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block text-primary dark:text-dark-primary">
              Creative
            </span>
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Developer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-primary/80 dark:text-dark-primary/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            I build exceptional digital experiences focused on performance, 
            accessibility, and modern design principles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              color="primary"
              size="lg"
              className="bg-primary text-background px-8 py-6 text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              as="a"
              href="#projects"
            >
              View My Work
            </Button>
            
            <Button
              variant="bordered"
              size="lg"
              className="border-primary text-primary dark:text-dark-primary px-8 py-6 text-lg font-semibold hover:bg-primary hover:text-background transition-all duration-300"
              as="a"
              href="#about"
            >
              About Me
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto"
          >
            {[
              { number: '3+', label: 'Years Exp' },
              { number: '50+', label: 'Projects' },
              { number: '100%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-primary/60 dark:text-dark-primary/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#skills"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="text-sm text-primary/60 dark:text-dark-primary/60 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
            Scroll to explore
          </div>
          <div className="w-10 h-10 rounded-full bg-background/50 dark:bg-dark-background/50 border border-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <ChevronDown className="h-4 w-4 text-primary dark:text-dark-primary" />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero