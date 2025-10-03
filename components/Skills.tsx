// components/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiReact, 
  SiThreedotjs,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiFigma,
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiVercel,
  SiAmazon,
  SiDocker,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiFirebase,
  SiRedis,
  SiJest,
  SiPrisma,
  SiGraphql,
  SiStorybook
} from 'react-icons/si'
import { 
  Code2, 
  Palette, 
  Zap, 
  Database, 
  Server, 
  Cloud,
  TestTube,
  Smartphone
} from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "Three.js", level: 75 },
        { name: "Tailwind CSS", level: 88 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Sass/SCSS", level: 80 },
        { name: "Framer Motion", level: 82 }
      ],
      icons: [SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiThreedotjs, SiTailwindcss, SiHtml5, SiCss3, SiFramer],
      color: "from-[#A6B28B] to-[#1C352D]"
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Backend & Databases",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 83 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Python", level: 78 },
        { name: "REST APIs", level: 88 },
        { name: "GraphQL", level: 70 },
        { name: "Firebase", level: 75 },
        { name: "Redis", level: 65 },
        { name: "Prisma", level: 72 }
      ],
      icons: [SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiPython, SiGraphql, SiFirebase, SiRedis, SiPrisma],
      color: "from-[#F5C9B0] to-[#A6B28B]"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "DevOps & Tools",
      skills: [
        { name: "Git & GitHub", level: 88 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Vercel", level: 80 },
        { name: "Heroku", level: 75 },
        { name: "CI/CD", level: 72 },
        { name: "VS Code", level: 90 },
        { name: "Vite", level: 78 },
        { name: "Jest", level: 70 },
        { name: "Storybook", level: 65 }
      ],
      icons: [SiGit, SiDocker, SiAmazon, SiVercel, SiVite, SiJest, SiStorybook],
      color: "from-[#1C352D] to-[#F5C9B0]"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX & Mobile",
      skills: [
        { name: "Figma", level: 80 },
        { name: "Responsive Design", level: 90 },
        { name: "UI/UX Design", level: 75 },
        { name: "Mobile First", level: 85 },
        { name: "Cross-browser", level: 88 },
        { name: "Performance", level: 82 },
        { name: "Accessibility", level: 78 },
        { name: "Progressive Web Apps", level: 70 }
      ],
      icons: [SiFigma, Smartphone],
      color: "from-[#A6B28B] to-[#F5C9B0]"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="skills" className="py-20 bg-secondary/10 dark:bg-dark-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-sm font-medium text-[#1C352D] dark:text-[#F5C9B0]">
              Technical Expertise
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C352D] dark:text-[#F5C9B0] mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-[#1C352D]/80 dark:text-[#F5C9B0]/80 max-w-2xl mx-auto">
            Full-stack development with expertise in modern web technologies and MERN stack
          </p>
        </motion.div>

        {/* MERN Stack Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1C352D] dark:text-[#F5C9B0] mb-4">
              MERN Stack Specialist
            </h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {[
                { icon: SiMongodb, name: "MongoDB", color: "text-green-600" },
                { icon: SiExpress, name: "Express.js", color: "text-gray-800 dark:text-gray-200" },
                { icon: SiReact, name: "React", color: "text-blue-500" },
                { icon: SiNodedotjs, name: "Node.js", color: "text-green-500" }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/50 dark:bg-[#1C352D]/50 backdrop-blur-sm border border-[#A6B28B]/20"
                >
                  <tech.icon className={`w-8 h-8 ${tech.color}`} />
                  <span className="text-sm font-medium text-[#1C352D] dark:text-[#F5C9B0]">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white/50 dark:bg-[#1C352D]/50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-[#A6B28B]/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1C352D] dark:text-[#F5C9B0]">
                  {category.title}
                </h3>
              </div>
              
              {/* Icons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {category.icons.map((IconComponent, iconIndex) => (
                  <motion.div
                    key={iconIndex}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-[#1C352D] flex items-center justify-center text-[#1C352D] dark:text-[#F5C9B0] border border-[#A6B28B]/30"
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.div>
                ))}
              </div>
              
              {/* Skills with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#1C352D] dark:text-[#F5C9B0]">
                        {skill.name}
                      </span>
                      <span className="text-xs text-[#1C352D]/60 dark:text-[#F5C9B0]/60">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#A6B28B]/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: skillIndex * 0.1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Fast Performance",
              description: "Optimized applications with lazy loading and code splitting"
            },
            {
              icon: <TestTube className="h-6 w-6" />,
              title: "Testing & Quality",
              description: "Comprehensive testing with Jest and Storybook"
            },
            {
              icon: <Smartphone className="h-6 w-6" />,
              title: "Responsive Design",
              description: "Mobile-first approach with cross-browser compatibility"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/30 dark:bg-[#1C352D]/30 border border-[#A6B28B]/20 backdrop-blur-sm"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#A6B28B] to-[#1C352D] text-white mb-4">
                {item.icon}
              </div>
              <h4 className="font-semibold text-[#1C352D] dark:text-[#F5C9B0] mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-[#1C352D]/70 dark:text-[#F5C9B0]/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills