// components/About.tsx
'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Download, Mail, Award, Users, Clock, Code2 } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: <Award className="h-6 w-6" />, number: "3+", text: "Years Experience" },
    { icon: <Users className="h-6 w-6" />, number: "50+", text: "Projects Completed" },
    { icon: <Clock className="h-6 w-6" />, number: "100%", text: "Client Satisfaction" },
    { icon: <Code2 className="h-6 w-6" />, number: "10k+", text: "Lines of Code" }
  ]

  return (
    <section id="about" ref={ref} className="py-20 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
              About Me
            </h2>
            
            <div className="space-y-4 text-lg text-primary/80 dark:text-gray-300">
              <p>
                Hello! I'm a passionate full-stack developer with a love for creating 
                digital experiences that are both beautiful and functional. My journey 
                in web development started over 3 years ago, and I've been hooked ever since.
              </p>
              
              <p>
                I specialize in modern technologies like <strong className="text-primary dark:text-white">Next.js</strong>, <strong className="text-primary dark:text-white">TypeScript</strong>, 
                and <strong className="text-primary dark:text-white">Three.js</strong>, and I'm constantly exploring new ways to push 
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
                  className="text-center p-4 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-secondary"
                >
                  <div className="flex justify-center mb-2 text-accent dark:text-dark-accent">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-primary/70 dark:text-gray-300">
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
                className="flex items-center justify-center bg-primary dark:bg-dark-primary text-background dark:text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </motion.a>
              
              <motion.a
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center border-2 border-primary dark:border-white text-primary dark:text-white px-6 py-3 rounded-full font-semibold hover:bg-primary dark:hover:bg-white hover:text-background dark:hover:text-dark-background transition-all duration-300"
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
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-secondary to-accent dark:from-dark-secondary dark:to-dark-accent rounded-3xl overflow-hidden shadow-2xl">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-primary dark:bg-white rounded-full animate-float" />
                <div className="absolute top-32 right-16 w-16 h-16 bg-primary dark:bg-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-primary dark:bg-white rounded-full animate-float" style={{ animationDelay: '4s' }} />
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
                  <div className="w-32 h-32 lg:w-48 lg:h-48 bg-background/20 dark:bg-dark-background/20 rounded-3xl backdrop-blur-sm border border-background/30 dark:border-dark-background/30 flex items-center justify-center">
                    <Code2 className="h-16 w-16 lg:h-24 lg:w-24 text-background dark:text-white" />
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
                className="absolute top-8 right-8 w-8 h-8 bg-background/30 dark:bg-dark-background/30 rounded-full border border-background/50 dark:border-dark-background/50"
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
                className="absolute bottom-12 left-12 w-6 h-6 bg-background/40 dark:bg-dark-background/40 rounded-full border border-background/50 dark:border-dark-background/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About