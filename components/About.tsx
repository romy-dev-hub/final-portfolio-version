// components/About.tsx
'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Download, Mail, Award, Users, Clock, Code2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()

  const textPrimary = theme === 'dark' ? 'text-[#F5C9B0]' : 'text-[#1C352D]'
  const textSecondary = theme === 'dark' ? 'text-[#F5C9B0]/70' : 'text-[#1C352D]/70'

  const stats = [
    { icon: <Award className="h-6 w-6" />, number: "3+", text: "Years Experience" },
    { icon: <Users className="h-6 w-6" />, number: "50+", text: "Projects Completed" },
    { icon: <Clock className="h-6 w-6" />, number: "100%", text: "Client Satisfaction" },
    { icon: <Code2 className="h-6 w-6" />, number: "10k+", text: "Lines of Code" }
  ]

  return (
    <section id="about" ref={ref} className="py-20 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6B28B]/20 border border-[#A6B28B]/30 mb-4"
          >
            <div className="w-2 h-2 bg-[#A6B28B] rounded-full animate-pulse" />
            <span className={`text-sm font-medium ${textPrimary}`}>
              About Me
            </span>
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
            My Journey
          </h2>
          <p className={`text-xl ${textSecondary} max-w-2xl mx-auto`}>
            Passionate developer creating digital experiences that inspire and engage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`space-y-4 text-lg ${textSecondary}`}>
              <p>
                Hello! I'm a passionate full-stack developer with a love for creating 
                digital experiences that are both beautiful and functional. My journey 
                in web development started over 3 years ago, and I've been hooked ever since.
              </p>
              
              <p>
                I specialize in modern technologies like <strong className={textPrimary}>Next.js</strong>, <strong className={textPrimary}>TypeScript</strong>, 
                and <strong className={textPrimary}>Three.js</strong>, and I'm constantly exploring new ways to push 
                the boundaries of what's possible on the web.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new design trends, 
                contributing to open-source projects, or enjoying the great outdoors.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 gap-6 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center p-4 rounded-2xl shadow-lg border border-[#A6B28B]/30 backdrop-blur-sm ${
                    theme === 'dark' ? 'bg-[#1C352D]/50' : 'bg-[#A6B28B]/20'
                  }`}
                >
                  <div className="flex justify-center mb-2 text-[#A6B28B] dark:text-[#F5C9B0]">
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold ${textPrimary} mb-1`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${textSecondary}`}>
                    {stat.text}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <motion.a
                href="/resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-gradient-to-r from-[#A6B28B] to-[#1C352D] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </motion.a>
              
              <motion.a
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center border-2 border-[#A6B28B] ${textPrimary} px-6 py-3 rounded-full font-semibold hover:bg-[#A6B28B] hover:text-white transition-all duration-300`}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-80 sm:h-96 lg:h-[500px] bg-gradient-to-br from-[#A6B28B] to-[#1C352D] rounded-3xl overflow-hidden shadow-2xl">
              {/* Neon ring glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-gradient-to-r from-[#A6B28B] via-[#1C352D] to-[#A6B28B] opacity-60 blur-md"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-[#A6B28B]/20 dark:bg-[#F5C9B0]/20 blur-3xl"
              />
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-[#F5C9B0] rounded-full animate-float" />
                <div className="absolute top-32 right-16 w-16 h-16 bg-[#F5C9B0] rounded-full animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#F5C9B0] rounded-full animate-float" style={{ animationDelay: '4s' }} />
              </div>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-center"
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/20 dark:bg-[#1C352D]/20 rounded-3xl backdrop-blur-sm border border-white/30 dark:border-[#1C352D]/30 flex items-center justify-center">
                    <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-[#A6B28B]/30 blur-[2px]" />
                    <Code2 className="h-16 w-16 lg:h-24 lg:w-24 text-white dark:text-[#F5C9B0]" />
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-8 right-8 w-8 h-8 bg-white/30 dark:bg-[#1C352D]/30 rounded-full border border-white/50 dark:border-[#1C352D]/50"
              />
              
              <motion.div
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, 10, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-12 left-12 w-6 h-6 bg-white/40 dark:bg-[#1C352D]/40 rounded-full border border-white/50 dark:border-[#1C352D]/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About