// components/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@heroui/react'
import { gsap } from 'gsap'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const [supportsTextClip, setSupportsTextClip] = useState(false)

  useEffect(() => {
    // Feature detection for gradient text support
    try {
      const supports =
        (CSS as any)?.supports?.('background-clip: text') ||
        (CSS as any)?.supports?.('-webkit-background-clip: text') ||
        false
      setSupportsTextClip(Boolean(supports))
    } catch {
      setSupportsTextClip(false)
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Simulation config
    const gridSize = 24
    const baseDotRadius = 3.5
    const hoverRadius = 80
    const returnStrength = 0.2
    const friction = 0.8

    // State
    let cssWidth = 0
    let cssHeight = 0
    let mouseX = -1000
    let mouseY = -1000
    let time = 0

    type Particle = {
      x: number
      y: number
      ox: number
      oy: number
      vx: number
      vy: number
    }
    const particles: Particle[] = []

    const setCanvasSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      cssWidth = Math.max(1, Math.floor(rect.width))
      cssHeight = Math.max(1, Math.floor(rect.height))
      
      // Add extra width to ensure full coverage on mobile
      const extraWidth = 50 // Extra pixels to ensure full coverage
      canvas.width = Math.floor((cssWidth + extraWidth) * dpr)
      canvas.height = Math.floor(cssHeight * dpr)
      canvas.style.width = `${cssWidth + extraWidth}px`
      canvas.style.height = `${cssHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildParticles()
    }

    const buildParticles = () => {
      particles.length = 0
      const extraWidth = 20 // Match the extra width from setCanvasSize
      const cols = Math.ceil((cssWidth + extraWidth) / gridSize) + 2
      const rows = Math.ceil(cssHeight / gridSize) + 2
      for (let i = -1; i < rows - 1; i++) {
        for (let j = -1; j < cols - 1; j++) {
          const x = j * gridSize
          const y = i * gridSize
          particles.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
        }
      }
    }

    // Initial setup with delay to ensure DOM is ready
    const initializeCanvas = () => {
      setCanvasSize()
      // Force a reflow and second resize to catch any layout issues
      setTimeout(() => {
        setCanvasSize()
      }, 100)
    }

    initializeCanvas()
    
    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', setCanvasSize)

    const onMouseMove = (e: MouseEvent | PointerEvent) => {
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    
    const onMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }
    
    // Add event listeners to the container instead of window for better accuracy
    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', onMouseMove)
      container.addEventListener('mouseleave', onMouseLeave)
      container.addEventListener('pointermove', onMouseMove as any)
      container.addEventListener('pointerleave', onMouseLeave)
    }

    // Drawing helper
    const draw = () => {
      if (cssWidth === 0 || cssHeight === 0) return
      time += 0.016 // ~60fps step for idle drift
      ctx.clearRect(0, 0, cssWidth + 50, cssHeight) // Clear with extra width
      // additive blend for nicer glow
      const prevComp = ctx.globalCompositeOperation
      ctx.globalCompositeOperation = 'lighter'
      const prevAlpha = ctx.globalAlpha
      const fadeStart = cssHeight * 0.75 // start fading in bottom quarter
      const fadeEnd = cssHeight // bottom edge
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.hypot(dx, dy)

        if (dist < hoverRadius && dist > 0) {
          const force = (1 - dist / hoverRadius) * 12
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force
          p.vy += Math.sin(angle) * force
        }

        // Subtle idle drift target around the origin
        const driftX = Math.sin((p.ox * 0.03) + time * 0.8) * 4 + Math.cos((p.oy * 0.02) + time * 0.6) * 3
        const driftY = Math.cos((p.oy * 0.025) + time * 0.7) * 4 + Math.sin((p.ox * 0.018) + time * 0.9) * 3
        const tx = p.ox + driftX
        const ty = p.oy + driftY

        // Return to drifting target + friction
        p.vx += (tx - p.x) * returnStrength
        p.vy += (ty - p.y) * returnStrength
        p.vx *= friction
        p.vy *= friction

        // Integrate
        p.x += p.vx
        p.y += p.vy

        // Size and color by distance
        let dotRadius = baseDotRadius
        let color = '#A6B28B'
        if (dist < hoverRadius) {
          dotRadius = baseDotRadius * (1 + (1 - dist / hoverRadius) * 1.5)
          if (dist < hoverRadius * 0.3) {
            color = '#00FF00'
            ctx.shadowBlur = 15
            ctx.shadowColor = '#00FF00'
          } else if (dist < hoverRadius * 0.6) {
            color = '#7CFC00'
            ctx.shadowBlur = 8
            ctx.shadowColor = '#7CFC00'
          } else {
            color = '#A6B28B'
            ctx.shadowBlur = 0
          }
        } else {
          ctx.shadowBlur = 0
        }

        // Vertical fade near bottom to blend with next section
        const fadeFactor = p.y < fadeStart ? 1 : Math.max(0, 1 - (p.y - fadeStart) / (fadeEnd - fadeStart))
        ctx.globalAlpha = fadeFactor

        ctx.beginPath()
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = prevAlpha
      ctx.globalCompositeOperation = prevComp
    }

    // Use GSAP ticker for smooth consistent updates
    const ticker = () => {
      draw()
    }
    gsap.ticker.add(ticker)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', setCanvasSize)
      
      const container = containerRef.current
      if (container) {
        container.removeEventListener('mousemove', onMouseMove)
        container.removeEventListener('mouseleave', onMouseLeave)
        container.removeEventListener('pointermove', onMouseMove as any)
        container.removeEventListener('pointerleave', onMouseLeave)
      }
      
      gsap.ticker.remove(ticker)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-dark-background"
      style={{ 
        position: 'relative',
        isolation: 'isolate'
      }}
    >
      {/* Dots Canvas Background (GSAP) - Extended to the right for mobile */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'calc(100% + 50px)', // Extra width to cover mobile edges
          height: '100%',
          display: 'block',
          pointerEvents: 'none'
        }}
      />

      {/* Side Neon Edge Glows are now global in app/layout.tsx */}

      {/* Gradient Overlays (non-interactive, behind canvas) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-background/60 via-transparent to-accent/5 dark:from-dark-background/60 dark:via-transparent dark:to-dark-accent/5" />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent dark:from-dark-background/40" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 w-full py-8">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary dark:text-dark-primary">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block text-primary dark:text-dark-primary">
              Front-End
            </span>
            {supportsTextClip ? (
              <span
                className="block"
                style={{
                  display: 'inline-block',
                  backgroundImage: 'linear-gradient(90deg, #F5C9B0, #A6B28B)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Developer
              </span>
            ) : (
              <span className="block text-primary dark:text-dark-primary">Developer</span>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg lg:text-xl text-primary/80 dark:text-dark-primary/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
          >
            I build exceptional digital experiences focused on performance, 
            accessibility, and modern design principles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Button
              color="primary"
              size="lg"
              className="w-full sm:w-auto px-6 py-5 sm:px-9 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg shadow-accent/20 bg-gradient-to-r from-accent to-secondary text-background hover:shadow-xl hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-white/10"
              as="a"
              href="#projects"
            >
              View My Work →
            </Button>

            <Button
              variant="bordered"
              size="lg"
              className="w-full sm:w-auto px-6 py-5 sm:px-9 sm:py-6 text-base sm:text-lg font-semibold rounded-xl backdrop-blur border-primary/30 text-primary dark:text-dark-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              as="a"
              href="#about"
            >
              More about Me
            </Button>
          </motion.div>
          
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#skills"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="text-xs sm:text-sm text-primary/60 dark:text-dark-primary/60 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
            Scroll to explore
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/50 dark:bg-dark-background/50 border border-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary dark:text-dark-primary" />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero