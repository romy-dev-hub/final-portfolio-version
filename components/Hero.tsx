// components/Hero.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create floating geometry
    const geometries = [
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.DodecahedronGeometry(0.8, 0),
    ]

    const material = new THREE.MeshPhongMaterial({
      color: 0xA6B28B,
      transparent: true,
      opacity: 0.6,
      shininess: 100
    })

    const meshes: THREE.Mesh[] = []
    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 10
      mesh.position.y = (Math.random() - 0.5) * 10
      mesh.position.z = (Math.random() - 0.5) * 10
      scene.add(mesh)
      meshes.push(mesh)
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xF9F6F3, 0.6)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xF5C9B0, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    camera.position.z = 5

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    const animate = () => {
      requestAnimationFrame(animate)

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Background color that changes with theme */}
      <div className="absolute inset-0 bg-background dark:bg-dark-background transition-colors duration-300" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-primary dark:text-white mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Creative{' '}
            <span className="text-accent dark:text-dark-accent">Developer</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-primary dark:text-gray-300 mb-8 max-w-2xl mx-auto"
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
              className="bg-primary dark:bg-dark-primary text-background dark:text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary dark:border-white text-primary dark:text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary dark:hover:bg-white hover:text-background dark:hover:text-dark-background transition-all duration-300"
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
            <ChevronDown className="h-8 w-8 text-primary dark:text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero