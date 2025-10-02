// components/Hero.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@heroui/react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

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
    const gridSize = 30
    const baseDotRadius = 3
    const hoverRadius = 80
    let mouseX = -1000
    let mouseY = -1000

    const particles: Array<{
      x: number
      y: number
      originalX: number
      originalY: number
      vx: number
      vy: number
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
            vy: 0
          })
        }
      }
    }

    initParticles()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        const dx = particle.x - mouseX
        const dy = particle.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Mouse interaction - move dots away
        if (distance < hoverRadius && distance > 0) {
          const force = (1 - distance / hoverRadius) * 12
          const angle = Math.atan2(dy, dx)
          
          particle.vx += Math.cos(angle) * force
          particle.vy += Math.sin(angle) * force
        }

        // Return to original position
        const returnStrength = 0.2
        particle.vx += (particle.originalX - particle.x) * returnStrength
        particle.vy += (particle.originalY - particle.y) * returnStrength

        // Apply friction
        particle.vx *= 0.8
        particle.vy *= 0.8

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Calculate dot properties based on mouse distance
        let dotRadius = baseDotRadius
        let color = '#A6B28B' // Default sage green

        if (distance < hoverRadius) {
          // Scale up dot size
          dotRadius = baseDotRadius * (1 + (1 - distance / hoverRadius) * 1.5)
          
          // Change to neon green when very close
          if (distance < hoverRadius * 0.3) {
            color = '#00FF00' // Bright neon green
            // Add glow effect for neon dots
            ctx.shadowBlur = 15
            ctx.shadowColor = '#00FF00'
          } else if (distance < hoverRadius * 0.6) {
            color = '#7CFC00' // Light green
            ctx.shadowBlur = 8
            ctx.shadowColor = '#7CFC00'
          } else {
            color = '#A6B28B' // Original sage green
            ctx.shadowBlur = 0
          }
        } else {
          ctx.shadowBlur = 0
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        
        // Reset shadow for next dot
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-dark-background">
      {/* Animated Dots Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-transparent to-accent/5 dark:from-dark-background/60 dark:via-transparent dark:to-dark-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent dark:from-dark-background/40" />

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