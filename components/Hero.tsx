// components/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@heroui/react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'))
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'))
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

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

    // Enhanced lines model with multiple layers
    type Line = { 
      y: number; 
      angle: number; 
      target: number;
      speed: number;
      opacity: number;
      width: number;
      layer: number;
    }
    let lines: Line[] = []

    const initLines = () => {
      const h = canvas.height
      lines = []
      
      // Create multiple layers with different properties
      const layers = [
        { count: 15, spacing: 40, width: 2, opacity: 0.4, speed: 0.8 }, // Background layer
        { count: 20, spacing: 30, width: 1.5, opacity: 0.6, speed: 1.2 }, // Middle layer
        { count: 25, spacing: 20, width: 1, opacity: 0.8, speed: 1.5 } // Foreground layer
      ]
      
      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          const y = (i * layer.spacing) + (layer.spacing / 2)
          if (y < h) {
            lines.push({ 
              y, 
              angle: 0, 
              target: 0,
              speed: layer.speed,
              opacity: layer.opacity,
              width: layer.width,
              layer: layerIndex
            })
          }
        }
      })
    }
    initLines()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { 
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      }
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw)
    }
    window.addEventListener('mousemove', onMouseMove)

    const maxAngle = Math.PI / 8 // 22.5 degrees max rotation
    const influence = 150 // px radius of influence
    const relax = 0.15 // easing towards target

    // Color schemes for light/dark mode
    const colors = {
      light: {
        primary: '#1C352D',    // Dark Green
        secondary: '#A6B28B',  // Sage Green
        accent: '#F5C9B0',     // Peach
        background: '#F9F6F3'  // Off-white
      },
      dark: {
        primary: '#F9F6F3',    // Light text
        secondary: '#2A3B2E',  // Dark sage
        accent: '#E8B896',     // Darker peach
        background: '#0A0F0D'  // Dark background
      }
    }

    const getLineColor = (layer: number, currentTheme: boolean) => {
      const themeColors = currentTheme ? colors.dark : colors.light
      const opacities = [0.3, 0.5, 0.7] // Different opacities for different layers
      const baseColor = layer === 0 ? themeColors.secondary : 
                       layer === 1 ? themeColors.accent : 
                       themeColors.primary
      
      // Convert hex to rgba
      const hex = baseColor.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      
      return `rgba(${r}, ${g}, ${b}, ${opacities[layer]})`
    }

    const draw = () => {
      const currentTheme = document.documentElement.classList.contains('dark')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      const bgColors = currentTheme ? colors.dark : colors.light
      gradient.addColorStop(0, `${bgColors.background}20`)
      gradient.addColorStop(1, `${bgColors.background}80`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw lines
      lines.forEach((line) => {
        let target = 0
        if (mouseRef.current) {
          const dy = Math.abs(line.y - mouseRef.current.y)
          if (dy < influence) {
            const falloff = 1 - (dy / influence) ** 2 // Quadratic falloff for smoother effect
            const dir = (mouseRef.current.x - canvas.width / 2) >= 0 ? 1 : -1
            target = dir * maxAngle * falloff * line.speed
          }
        }
        
        line.target = target
        line.angle += (line.target - line.angle) * relax

        // Draw line with glow effect
        const y = line.y
        const angle = line.angle
        const cx = canvas.width / 2
        
        ctx.save()
        ctx.translate(cx, y)
        ctx.rotate(angle)
        
        // Main line
        ctx.lineWidth = line.width
        ctx.strokeStyle = getLineColor(line.layer, currentTheme)
        ctx.beginPath()
        ctx.moveTo(-canvas.width, 0)
        ctx.lineTo(canvas.width, 0)
        ctx.stroke()
        
        // Glow effect for foreground lines
        if (line.layer === 2) {
          ctx.strokeStyle = getLineColor(line.layer, currentTheme).replace(/[\d.]+\)$/, '0.2)')
          ctx.lineWidth = line.width * 3
          ctx.beginPath()
          ctx.moveTo(-canvas.width, 0)
          ctx.lineTo(canvas.width, 0)
          ctx.stroke()
        }
        
        ctx.restore()
      })

      // Draw connection dots at intersection points
      if (mouseRef.current) {
        ctx.fillStyle = currentTheme ? colors.dark.accent : colors.light.accent
        lines.forEach((line) => {
          const dy = Math.abs(line.y - mouseRef.current!.y)
          if (dy < influence) {
            const falloff = 1 - (dy / influence)
            const size = 3 * falloff
            
            ctx.beginPath()
            ctx.arc(canvas.width / 2, line.y, size, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      // Continue animating
      const active = mouseRef.current != null || lines.some(l => Math.abs(l.angle) > 0.001)
      if (active) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        rafRef.current = null
      }
    }

    // Start animation
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
      
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/30 dark:from-dark-background/0 dark:via-dark-background/0 dark:to-dark-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10 dark:from-dark-background/10 dark:via-transparent dark:to-dark-background/10" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary mb-6 shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="text-background text-2xl"
              >
                ✦
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              CREATIVE
            </span>
            <br />
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              DEVELOPER
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-primary/80 dark:text-dark-primary/80 mb-8 max-w-2xl mx-auto font-light"
          >
            Crafting digital experiences with modern technologies and creative solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              color="primary"
              size="lg"
              className="relative bg-primary text-background px-8 py-6 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-300 group"
              as="a"
              href="#projects"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button
              variant="bordered"
              size="lg"
              className="relative border-2 border-accent text-primary dark:text-dark-primary px-8 py-6 text-lg font-semibold hover:bg-accent/10 hover:scale-105 transition-all duration-300 group"
              as="a"
              href="#about"
            >
              <span className="relative z-10">About Me</span>
              <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Arrow - Enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#skills"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-background/20 dark:bg-dark-background/20 backdrop-blur-sm border border-primary/20 dark:border-dark-primary/20 hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-all duration-300 group"
        >
          <ChevronDown className="h-6 w-6 text-primary dark:text-dark-primary group-hover:scale-110 transition-transform" />
        </motion.a>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background dark:to-dark-background" />
    </section>
  )
}

export default Hero