// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from '@heroui/react'
import { useTheme } from '../context/ThemeContext'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'skills', 'projects', 'about']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
  ]

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F9F6F3]/95 dark:bg-[#1C352D]/95 backdrop-blur-md shadow-lg border-b border-[#A6B28B]/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#A6B28B] to-[#1C352D] p-0.5">
              <div className="w-full h-full rounded-full bg-[#F9F6F3] dark:bg-[#1C352D] flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full object-contain"
                  priority
                />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#1C352D] to-[#A6B28B] bg-clip-text text-transparent dark:from-[#F5C9B0] dark:to-[#A6B28B]">
              DevPortfolio
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 bg-[#F9F6F3]/50 dark:bg-[#1C352D]/50 rounded-full p-1 backdrop-blur-sm border border-[#A6B28B]/20">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-[#F9F6F3] dark:text-[#1C352D]'
                        : 'text-[#1C352D] dark:text-[#F9F6F3] hover:text-[#A6B28B]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-[#A6B28B] to-[#1C352D] dark:from-[#F5C9B0] dark:to-[#A6B28B] rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {item.name}
                    </span>
                  </motion.button>
                )
              })}
            </div>
            
            {/* Dark Mode Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                isIconOnly
                variant="flat"
                onPress={toggleTheme}
                className="bg-[#A6B28B]/20 hover:bg-[#A6B28B]/30 text-[#1C352D] dark:text-[#F5C9B0] border border-[#A6B28B]/30"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                isIconOnly
                variant="flat"
                onPress={toggleTheme}
                className="bg-[#A6B28B]/20 hover:bg-[#A6B28B]/30 text-[#1C352D] dark:text-[#F5C9B0] border border-[#A6B28B]/30"
                size="sm"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#A6B28B]/20 hover:bg-[#A6B28B]/30 text-[#1C352D] dark:text-[#F5C9B0] border border-[#A6B28B]/30 p-2 rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#F9F6F3]/95 dark:bg-[#1C352D]/95 backdrop-blur-md border-b border-[#A6B28B]/20"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#A6B28B] to-[#1C352D] text-[#F9F6F3] shadow-lg'
                        : 'text-[#1C352D] dark:text-[#F9F6F3] hover:bg-[#A6B28B]/20'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 bg-[#F5C9B0] rounded-full inline-block ml-2"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar