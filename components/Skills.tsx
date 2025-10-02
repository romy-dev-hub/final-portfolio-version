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
  SiFigma
} from 'react-icons/si'
import { Code2, Palette, Zap, Database } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
      icons: [SiNextdotjs, SiReact, SiTypescript, SiThreedotjs],
      color: "from-primary to-accent"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
      icons: [SiNodedotjs, SiPython, Database],
      color: "from-accent to-secondary"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Tools & Design",
      skills: ["Git", "Figma", "Framer Motion", "VS Code", "Heroku"],
      icons: [SiGit, SiFigma],
      color: "from-secondary to-primary"
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

  return (
    <section id="skills" className="py-20 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-dark-primary mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-primary/80 dark:text-dark-primary/80 max-w-2xl mx-auto">
            A collection of technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-secondary/20 dark:border-dark-secondary"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} text-background mb-6`}>
                {category.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-primary dark:text-dark-primary mb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {category.icons.map((IconComponent, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="w-10 h-10 rounded-lg bg-background dark:bg-dark-background flex items-center justify-center text-primary dark:text-dark-primary border border-secondary/20 dark:border-dark-secondary"
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                ))}
              </div>
              
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="flex items-center text-primary dark:text-dark-primary"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            { name: "Next.js/React", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Three.js", level: 75 },
            { name: "Node.js", level: 80 }
          ].map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-primary dark:text-dark-primary">
                <span className="font-semibold">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-3 bg-secondary/30 dark:bg-dark-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills