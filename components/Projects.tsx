// components/Projects.tsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with Next.js, featuring real-time inventory and payment processing.",
      technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      image: "/images/project1.jpg",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      description: "Interactive portfolio with Three.js animations and modern UI design principles.",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind"],
      image: "/images/project2.jpg",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features.",
      technologies: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
      image: "/images/project3.jpg",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  return (
    <section id="projects" className="py-20 bg-secondary/10 dark:bg-dark-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-dark-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-primary/80 dark:text-dark-primary/80 max-w-2xl mx-auto">
            Some of my recent work that showcases my skills and creativity
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative bg-secondary/10 dark:bg-dark-secondary rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-secondary/20 dark:border-dark-secondary"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-accent to-secondary dark:from-dark-accent dark:to-dark-secondary overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 dark:bg-dark-primary/20 group-hover:bg-primary/5 dark:group-hover:bg-dark-primary/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-background dark:text-dark-background text-6xl font-bold opacity-20">
                    {project.id.toString().padStart(2, '0')}
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-primary/80 dark:bg-dark-primary/80 flex items-center justify-center space-x-4"
                >
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-background dark:bg-dark-background rounded-full flex items-center justify-center text-primary dark:text-dark-primary hover:bg-accent dark:hover:bg-dark-accent transition-colors"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-background dark:bg-dark-background rounded-full flex items-center justify-center text-primary dark:text-dark-primary hover:bg-accent dark:hover:bg-dark-accent transition-colors"
                  >
                    <Github size={20} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary dark:text-dark-primary group-hover:text-accent dark:group-hover:text-dark-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-3 py-1 bg-accent dark:bg-dark-accent text-primary dark:text-dark-background text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-primary/80 dark:text-dark-primary/80 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-secondary/20 dark:bg-dark-secondary/40 text-primary dark:text-dark-primary text-sm rounded-full border border-secondary/30 dark:border-dark-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center justify-between pt-4 border-t border-secondary/20 dark:border-dark-secondary">
                  <a
                    href={project.liveUrl}
                    className="flex items-center text-primary dark:text-dark-primary font-semibold hover:text-accent dark:hover:text-dark-accent transition-colors group/link"
                  >
                    View Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                  
                  <div className="flex space-x-3">
                    <a
                      href={project.liveUrl}
                      className="text-primary/60 dark:text-dark-primary/60 hover:text-accent dark:hover:text-dark-accent transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-primary/60 dark:text-dark-primary/60 hover:text-accent dark:hover:text-dark-accent transition-colors"
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
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-primary text-background px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects