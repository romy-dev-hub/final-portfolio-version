// components/SkillsStack.tsx
'use client'

import { AnimatePresence, motion, useAnimation, useMotionValue } from 'framer-motion'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export type SkillItem = { name: string; icon: React.ComponentType<{ className?: string }> }
export type SkillSection = {
  title: string
  description: string
  color: string // gradient tailwind classes e.g., "from-[#A6B28B] to-[#1C352D]"
  icon: React.ReactNode
  skills: SkillItem[]
}

interface SkillsStackProps {
  sections: SkillSection[]
  className?: string
}

export default function SkillsStack({ sections, className }: SkillsStackProps) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-[#1C352D]'
  const textSecondary = theme === 'dark' ? 'text-white/80' : 'text-[#1C352D]/70'

  // container to bound dragging
  const stackRef = useRef<HTMLDivElement>(null)

  // order state to cycle cards: 0 is top
  const [order, setOrder] = useState<number[]>(() => Array.from({ length: sections.length }, (_, i) => i))

  // memoize depths for stable transforms
  const depths = useMemo(() => order.map((_, i) => i), [order])

  const controls = useAnimation()
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const onDragEnd = useCallback(async (_: any, info: { offset: { x: number; y: number } }) => {
    const threshold = 120
    const exceeded = Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold
    if (exceeded) {
      // fling the card out slightly in the drag direction, then cycle
      const dirX = info.offset.x === 0 ? 0 : Math.sign(info.offset.x)
      const dirY = info.offset.y === 0 ? 0 : Math.sign(info.offset.y)
      await controls.start({ x: dirX * 300, y: dirY * 220, rotate: dirX !== 0 ? dirX * 12 : -dirY * 12, opacity: 0, transition: { duration: 0.28, ease: 'easeOut' } })
      controls.set({ x: 0, y: 0, opacity: 1 })
      setOrder(prev => [...prev.slice(1), prev[0]])
    } else {
      // snap back to center
      await controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 240, damping: 26 } })
    }
  }, [controls])

  return (
    <div ref={stackRef} className={`relative isolate overflow-hidden ${className ?? ''}`}>
      <AnimatePresence initial={false}>
      {order.map((idx, depth) => {
        const section = sections[idx]
        // Keep cards centered horizontally; keep vertical position constant
        const translateX = 0
        const baseOffset = 150
        const translateY = baseOffset
        const scaleStep = 0.06
        const scale = Math.max(1 - depth * scaleStep, 0.82)
        const zIndex = 100 - depth
        const isTop = depth === 0
        const opacity = Math.max(1 - depth * 0.12, 0.6)
        const shadowCls = depth === 0 ? 'shadow-xl' : depth === 1 ? 'shadow-lg' : 'shadow-md'

        return (
          <motion.div
            key={section.title}
            drag={isTop}
            onDragEnd={isTop ? onDragEnd : undefined}
            onDragStart={isTop ? () => setHintVisible(false) : undefined}
            dragElastic={0.25}
            whileDrag={isTop ? { scale: scale + 0.03, rotate: -2 } : undefined}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[340px] md:w-[360px] transition-transform duration-300 ${isTop ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'}`}
            style={{
              zIndex,
              transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
              x: isTop ? mvX : 0,
              y: isTop ? mvY : 0,
              opacity,
            }}
            animate={isTop ? controls : { opacity, transition: { type: 'spring', stiffness: 220, damping: 24 } }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            layout
          >
            <div className={`relative bg-[#A6B28B] rounded-2xl p-5 sm:p-6 border border-[#1C352D]/20 ${shadowCls} hover:shadow-2xl transition-all duration-300 h-[380px] sm:h-[420px] md:h-[440px] flex flex-col`}>
              {isTop && hintVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1C352D] text-[#F5C9B0] text-[11px] px-3 py-1 rounded-full shadow"
                >
                  Drag to flip
                </motion.div>
              )}
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>{section.title}</h3>
                  <p className={`text-sm ${textSecondary}`}>{section.description}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {section.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#A6B28B]/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1C352D] border border-[#A6B28B]/30">
                      {React.createElement(skill.icon as any, { className: 'w-4 h-4' })}
                    </div>
                    <span className={`text-sm font-medium ${textPrimary}`}>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}
      </AnimatePresence>
    </div>
  )
}
