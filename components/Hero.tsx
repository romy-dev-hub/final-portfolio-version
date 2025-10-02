// components/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation variables
    const lines: Array<{
      x: number
      y: number
      length: number
      angle: number
      speed: number
      thickness: number
    }> = []

    // Create lines
    for (let i = 0; i < 50; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        thickness: Math.random() * 2 + 1
      })
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const mouseX = mousePosition.x
      const mouseY = mousePosition.y

      lines.forEach((line, index) => {
        // Calculate distance from mouse
        const dx = line.x - mouseX
        const dy = line.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // React to mouse proximity
        const maxDistance = 200
        const influence = Math.max(0, 1 - distance / maxDistance)
        
        // Rotate based on mouse position
        const targetAngle = Math.atan2(dy, dx) + Math.PI / 2
        line.angle += (targetAngle - line.angle) * 0.1 * influence

        // Move lines
        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed

        // Wrap around edges
        if (line.x < -line.length) line.x = canvas.width + line.length
        if (line.x > canvas.width + line.length) line.x = -line.length
        if (line.y < -line.length) line.y = canvas.height + line.length
        if (line.y > canvas.height + line.length) line.y = -line.length

        // Draw line
        const endX = line.x + Math.cos(line.angle) * line.length
        const endY = line.y + Math.sin(line.angle) * line.length

        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `rgba(166, 178, 139, ${0.3 + influence * 0.4})` // Secondary color
        ctx.lineWidth = line.thickness * (1 + influence)
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mousePosition])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-dark-background">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-primary dark:text-dark-primary mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Creative{' '}
            <span className="text-accent">Developer</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-primary dark:text-dark-primary mb-8 max-w-2xl mx-auto"
          >
            Crafting digital experiences with modern technologies and creative solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-background px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-background transition-all duration-300"
            >
              About Me
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-primary dark:text-dark-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero