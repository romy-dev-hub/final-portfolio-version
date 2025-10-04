// components/Footer.tsx
'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Mail, Github, Linkedin, Heart } from 'lucide-react'
import { FaTelegramPlane, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/romy-dev-hub", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/roumaissa-hadibi-4a146b373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
    { icon: <FaTelegramPlane size={20} />, href: "https://t.me/romy_hb1", label: "Telegram" },
    { icon: <Mail size={20} />, href: "mailto:roumaissa.hadibi.dev@gmail.com", label: "Email" },
    { icon: <FaDiscord size={20} />, href: "https://discord.gg/34MVGsZW", label: "Discord" }
  ]

  const quickLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" }
  ]

  return (
    <footer className={`bg-primary transition-colors duration-300 ${isDark ? 'text-[#F5C9B0]' : 'text-[#1C352D]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">Portfolio</h3>
            <p className="max-w-md">
              Creating digital experiences that inspire and engage. 
              Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 !bg-[#A6B28B] hover:!bg-[#A6B28B] text-[#1C352D] dark:bg-[#1C352D]/50 dark:text-[#F5C9B0] dark:hover:bg-[#F5C9B0] dark:hover:text-[#1C352D]"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="transition-colors duration-300 text-current hover:!text-[#A6B28B] dark:hover:text-[#F5C9B0]"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-2">
              <p>roumaissa.hadibi.dev@gmail.com</p>
              <p>+213 674 032 140</p>
              <p>Based in Creative Space</p>
            </div>
            <motion.a
              href="mailto:roumaissa.hadibi.dev@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 bg-[#A6B28B] text-[#1C352D] dark:bg-[#F5C9B0] dark:text-[#1C352D]"
            >
              <Mail className="mr-2 h-4 w-4" />
              Say Hello
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-t border-[#A6B28B]/20"
        >
          <p className="text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> and lots of tea
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Xiao ro. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer