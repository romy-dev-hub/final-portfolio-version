// components/Projects.tsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Calendar, Code2, Users } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const { theme } = useTheme()
  
  const isDark = theme === 'dark'
  const textPrimary = isDark ? 'text-[#F5C9B0]' : 'text-[#1C352D]'
  const textSecondary = isDark ? 'text-[#F5C9B0]/70' : 'text-[#1C352D]/70'
  const bgCard = isDark ? 'bg-[#1C352D]/50' : 'bg-[#A6B28B]/20'
  const borderColor = isDark ? 'border-[#A6B28B]/20' : 'border-[#A6B28B]/30'

  const projects = [
    {
      id: 1,
      title: "Flowers Encyclopedia",
      description: "A beautiful web application showcasing various flowers with detailed information, built with modern web technologies and responsive design.",
      technologies: ["React", "Tailwind CSS", "TypeScript", "Responsive Design", "Framer Motion", "Three.js"],
      image: "/images/flowers.png",
      liveUrl: "https://romy-dev-hub.github.io/flowers-encyclopedia/",
      githubUrl: "https://github.com/romy-dev-hub/flowers-encyclopedia",
      featured: true,
      details: {
        type: "Web App",
        status: "Completed",
        complexity: "Intermediate"
      }
    },
    {
      id: 2,
      title: "Library Database System",
      description: "A comprehensive library management system built with Java and SQL, featuring book tracking, member management, and database operations.",
      technologies: ["Java", "Swing", "SQL", "Oracle DB", "Database Design"],
      image: "/images/database.png",
      liveUrl: "https://github.com/romy-dev-hub/lib-project-",
      githubUrl: "https://github.com/romy-dev-hub/lib-project-",
      featured: true,
      details: {
        type: "Desktop App",
        status: "Completed", 
        complexity: "Advanced"
      }
    },
    {
      id: 3,
      title: "Community Prototype",
      description: "A community website prototype with user authentication, forums, and interactive features for building online communities.",
      technologies: ["React", "Node.js", "JavaScript", "Framer Motion", "CSS", "Next.js"],
      image: "/images/community.png",
      liveUrl: "https://romy-dev-hub.github.io/community-prototype-/",
      githubUrl: "https://github.com/romy-dev-hub/community-prototype-",
      featured: true,
      details: {
        type: "Web App",
        status: "Completed",
        complexity: "Intermediate"
      }
    },
    {
      id: 4,
      title: "NexBlog (In Progress)",
      description: "A modern blogging platform built with Next.js, featuring rich text editing, user profiles, and real-time updates. Currently under active development.",
      technologies: ["Next.js", "JavaScript", "Tailwind CSS", "Three.js", "Framer Motion", "MongoDB", "Express"],
      image: "/images/nexblog.png",
      liveUrl: "#",
      githubUrl: "https://github.com/romy-dev-hub/nexblog",
      featured: false,
      details: {
        type: "Full Stack App",
        status: "In Development",
        complexity: "Advanced"
      }
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-500/20 text-green-700 dark:text-green-300'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
      case 'Advanced': return 'bg-red-500/20 text-red-700 dark:text-red-300'
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-[#A6B28B]/30 text-[#1C352D] dark:text-[#F5C9B0]'
      case 'In Development': return 'bg-[#F5C9B0]/30 text-[#1C352D] dark:text-[#F5C9B0]'
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <section id="projects" className="py-20 bg-secondary/10 dark:bg-dark-background/50">
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
              My Work
            </span>
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
            Featured Projects
          </h2>
          <p className={`text-xl ${textSecondary} max-w-2xl mx-auto`}>
            A showcase of my best work, from web applications to database systems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className={`group relative ${bgCard} rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border ${borderColor} backdrop-blur-sm`}
            >
              {/* Project Header with Gradient */}
              <div className="relative h-48 bg-gradient-to-br from-[#A6B28B] to-[#1C352D] overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                
                {/* Project Number */}
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {project.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.details.status)}`}>
                    {project.details.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(project.details.complexity)}`}>
                    {project.details.complexity}
                  </span>
                </div>

                {/* Project Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.featured && (
                      <span className="px-3 py-1 bg-[#F5C9B0] text-[#1C352D] text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      {project.details.type}
                    </span>
                  </div>
                </div>
                
                {/* Hover Overlay with Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-[#1C352D]/90 flex items-center justify-center space-x-6"
                >
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      project.id === 4 ? 'bg-[#A6B28B]/50 cursor-not-allowed' : 'bg-[#F5C9B0] hover:bg-[#A6B28B]'
                    } transition-colors`}
                    onClick={project.id === 4 ? (e) => e.preventDefault() : undefined}
                  >
                    <ExternalLink className={`w-5 h-5 ${project.id === 4 ? 'text-white/70' : 'text-[#1C352D]'}`} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-[#F5C9B0] rounded-full flex items-center justify-center hover:bg-[#A6B28B] transition-colors"
                  >
                    <Github className="w-5 h-5 text-[#1C352D]" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className={`${textSecondary} mb-6 leading-relaxed`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 text-sm rounded-full border border-[#A6B28B]/30 ${
                        isDark ? 'bg-transparent text-[#F5C9B0]' : 'bg-[#A6B28B]/20 text-[#1C352D]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center justify-between pt-4 border-t border-[#A6B28B]/20">
                  <a
                    href={project.liveUrl}
                    className={`flex items-center font-semibold ${
                      project.id === 4
                        ? 'text-[#A6B28B] cursor-not-allowed'
                        : `${isDark ? 'text-[#F5C9B0]' : 'text-[#1C352D]'} hover:text-[#A6B28B]`
                    } transition-colors group/link`}
                    onClick={project.id === 4 ? (e) => e.preventDefault() : undefined}
                  >
                    {project.id === 4 ? 'Coming Soon' : 'View Project'}
                    {project.id !== 4 && (
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    )}
                  </a>
                  
                  <div className="flex space-x-3">
                    <a
                      href={project.liveUrl}
                      className={`${
                        project.id === 4
                          ? 'text-[#A6B28B]/50 cursor-not-allowed'
                          : `${isDark ? 'text-[#F5C9B0]/60' : 'text-[#1C352D]/60'} hover:text-[#A6B28B]`
                      } transition-colors`}
                      onClick={project.id === 4 ? (e) => e.preventDefault() : undefined}
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className={`${isDark ? 'text-[#F5C9B0]/60' : 'text-[#1C352D]/60'} hover:text-[#A6B28B] transition-colors`}
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/romy-dev-hub"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-gradient-to-r from-[#A6B28B] to-[#1C352D] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects on GitHub
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects