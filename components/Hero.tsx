// components/Hero.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@heroui/react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup size with DPR
    const setupSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    setupSize()

    const onResize = () => {
      setupSize()
      initLines()
    }
    window.addEventListener('resize', onResize)

    // Lines model
    type Line = { y: number; angle: number; target: number }
    let lines: Line[] = []

    const initLines = () => {
      const h = canvas.height
      const spacing = Math.max(18, Math.floor(h / 30)) // ~30 lines max
      lines = []
      for (let y = spacing; y < h; y += spacing) {
        lines.push({ y, angle: 0, target: 0 })
      }
    }
    initLines()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw)
    }
    window.addEventListener('mousemove', onMouseMove)

    const maxAngle = Math.PI / 12 // 15 degrees
    const influence = 120 // px radius of influence
    const relax = 0.12 // easing towards target

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Determine targets
      lines.forEach((line) => {
        let target = 0
        if (mouseRef.current) {
          const dy = Math.abs(line.y - mouseRef.current.y)
          if (dy < influence) {
            const falloff = 1 - dy / influence
            // Rotate direction based on cursor x offset from center
            const dir = (mouseRef.current.x - canvas.width / 2) >= 0 ? 1 : -1
            target = dir * maxAngle * falloff
          }
        }
        // Smooth towards target
        line.target = target
        line.angle += (line.target - line.angle) * relax
      })

      // Draw lines
      ctx.lineWidth = 2
      const isDark = document.documentElement.classList.contains('dark')
      const lineColor = isDark ? '#2A3B2E' : '#A6B28B' // dark-secondary or secondary
      ctx.strokeStyle = lineColor

      const w = canvas.width
      lines.forEach((line) => {
        const y = line.y
        const angle = line.angle
        const cx = w / 2
        ctx.save()
        ctx.translate(cx, y)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(-w, 0)
        ctx.lineTo(w, 0)
        ctx.stroke()
        ctx.restore()
      })

      // Continue animating if any angle not near zero or mouse active
      const active = mouseRef.current != null || lines.some(l => Math.abs(l.angle) > 0.001)
      if (active) {
        rafRef.current = requestAnimationFrame(draw)
        // decay mouse to allow relaxing after movement stops
        if (mouseRef.current) {
          // if no movement for a short time, null out in next frame
          mouseRef.current = mouseRef.current
        }
      } else {
        rafRef.current = null
      }
    }

    // Initial paint (flat lines)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-dark-background">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-[0_0_10px_rgba(245,201,176,0.35)]"
            whileHover={{ scale: 1.03 }}
          >
            Creative
            <span className="mx-2">•</span>
            Developer
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-primary/80 dark:text-dark-primary/80 mb-8 max-w-2xl mx-auto"
          >
            Crafting digital experiences with modern technologies and creative solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              color="primary"
              size="lg"
              className="relative bg-primary text-background px-8 py-6 text-lg font-semibold shadow-[0_0_25px_rgba(28,53,45,0.45)] hover:shadow-[0_0_35px_rgba(245,201,176,0.55)] transition-shadow"
              as="a"
              href="#projects"
            >
              View My Work
            </Button>
            
            <Button
              variant="bordered"
              size="lg"
              className="relative border-accent text-primary dark:text-dark-primary px-8 py-6 text-lg font-semibold hover:bg-accent/10 before:content-[''] before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-accent/40 before:blur-[3px]"
              as="a"
              href="#about"
            >
              About Me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Arrow - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#skills"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
        >
          <ChevronDown className="h-6 w-6 text-primary dark:text-dark-primary" />
        </motion.a>
      </motion.div>

      {/* Bottom gradient fade to soften/disappear lines toward the fold */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-background dark:to-dark-background" />
    </section>
  )
}

export default Hero