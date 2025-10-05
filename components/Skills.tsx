// components/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import SkillsStack from './SkillsStack'
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiReact, 
  SiThreedotjs,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiCanva,
  SiBun,
  SiPopos,
  SiGamemaker
} from 'react-icons/si'
import { FaJava } from "react-icons/fa";
import { 
  Code2, 
  Palette, 
  Zap, 
  Database, 
  Server, 
  Cloud,
  GamepadIcon,
  Globe,
  Video,
  Mic,
  Cpu,
  Languages
} from 'lucide-react'

const Skills = () => {
  const skillSections = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "React Ecosystem",
      skills: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "React", icon: SiReact },
        { name: "Framer Motion", icon: SiFramer },
        { name: "Lucide React", icon: SiReact },
        { name: "React Icons", icon: SiReact },
        { name: "Bun", icon: SiBun },
        { name: "Hero UI", icon: SiReact },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ],
      color: "from-[#A6B28B] to-[#1C352D]",
      description: "Modern React development with TypeScript and smooth animations"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "3D & Animations",
      skills: [
        { name: "Three.js", icon: SiThreedotjs },
        { name: "GSAP", icon: SiJavascript }
      ],
      color: "from-[#F5C9B0] to-[#A6B28B]",
      description: "Immersive 3D experiences and advanced animations"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Core Development",
      skills: [
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS", icon: SiCss3 },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Java", icon: FaJava },
        { name: "JavaFX", icon: FaJava },
        { name: "SQL", icon: Database },
        { name: "Oracle DB", icon: Database }
      ],
      color: "from-[#1C352D] to-[#F5C9B0]",
      description: "Fundamental web technologies and database management"
    },
    {
      icon: <GamepadIcon className="h-6 w-6" />,
      title: "Game Development",
      skills: [
        { name: "Python", icon: SiPython },
        { name: "C Programming", icon: Cpu },
        { name: "Lua", icon: GamepadIcon },
        { name: "GameMaker Studio 2", icon: SiGamemaker },
        { name: "Pygame", icon: SiPython }
      ],
      color: "from-[#A6B28B] to-[#F5C9B0]",
      description: "Built 3+ games with different programming languages"
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Backend & DevOps",
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express.js", icon: SiExpress },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Linux (Pop!_OS)", icon: SiPopos },
        { name: "Bun Runtime", icon: SiBun },
        { name: "Git", icon: SiGit },
      ],
      color: "from-[#F5C9B0] to-[#1C352D]",
      description: "Server-side development and deployment solutions"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Creative & Languages",
      skills: [
        { name: "Arabic (Native)", icon: Languages },
        { name: "English (C1)", icon: Languages },
        { name: "Chinese (A1)", icon: Languages },
        { name: "Podcasting", icon: Mic },
        { name: "Video Editing", icon: Video },
        { name: "Content Creation", icon: Mic },
        { name: "Canva", icon: SiCanva }
      ],
      color: "from-[#1C352D] to-[#A6B28B]",
      description: "Multilingual communication and creative content production"
    }
  ]

  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const textPrimary = isDark ? 'text-[#F5C9B0]' : 'text-[#1C352D]'
  const textSecondary = isDark ? 'text-[#F5C9B0]/70' : 'text-[#1C352D]/70'

  const learningPath = [
    { name: "AI/ML", status: "Currently Learning" },
    { name: "Advanced Problem Solving", status: "Improving" },
    { name: "Startup Development (Yuanlu)", status: "Preparing" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  // Custom icon component for Java
  const SiJava = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.37 17.51c-1.56-.73-2.11-.57-2.58-.98-.18-.16-.26-.31-.23-.39.06-.16.38-.05.61.11.56.38 1.12.63 2.39 1.13.15.06.37.12.52.17.41.14.82.27 1.22.39.55.17 1.08.31 1.61.44.35.09.69.17 1.03.24.78.16 1.51.28 2.19.37.68.09 1.31.14 1.88.16.57.02 1.07.01 1.48-.02.41-.03.73-.08.94-.13.21-.05.31-.09.31-.11 0-.02-.1-.06-.31-.11-.21-.05-.53-.1-.94-.13-.41-.03-.91-.04-1.48-.02-.57.02-1.2.07-1.88.16-.68.09-1.41.21-2.19.37-.34.07-.68.15-1.03.24-.53.13-1.06.27-1.61.44-.4.12-.81.25-1.22.39-.15.05-.37.11-.52.17z"/>
    </svg>
  )

  return (
    <section id="skills" className="py-20 bg-secondary/10 dark:bg-dark-background/50">
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
              Skills & Expertise
            </span>
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
            What I Do
          </h2>
          <p className={`text-xl ${textSecondary} max-w-2xl mx-auto`}>
            Full-stack development, game creation, and multimedia content production
          </p>
        </motion.div>

        {/* MERN Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 mb-12 text-center"
        >
          <h3 className={`text-2xl font-bold ${textPrimary} mb-8`}>
            MERN Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: SiMongodb, name: "MongoDB", color: "text-[#116149]" },
              { icon: SiExpress, name: "Express", color: "text-[#1C352D] dark:text-[#F5C9B0]" },
              { icon: SiReact, name: "React", color: "text-[#00B5D8]" },
              { icon: SiNodedotjs, name: "Node.js", color: "text-[#3C873A]" }
            ].map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.15, rotate: 3 }}
                className="flex flex-col items-center gap-2"
              >
                <tech.icon className={`w-10 h-10 ${tech.color}`} />
                <span className={`text-sm font-medium ${textPrimary}`}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Card Stack (separate component) */}
        <SkillsStack sections={skillSections} className="h-[420px] sm:h-[520px] md:h-[560px] w-full max-w-[1000px] mx-auto mb-24" />

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#A6B28B] to-[#1C352D] rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Current Learning Path 🚀
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {learningPath.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30"
              >
                <div className="text-white font-semibold">{item.name}</div>
                <div className="text-white/80 text-sm">{item.status}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
      </div>
    </section>
  )
}

export default Skills