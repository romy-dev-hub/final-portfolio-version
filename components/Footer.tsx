// components/Footer.tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:hello@example.com", label: "Email" }
  ]

  const quickLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" }
  ]

  return (
    <footer className="bg-primary text-background transition-colors duration-300">
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
            <p className="text-background/80 max-w-md">
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
                  className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center text-background hover:bg-accent hover:text-primary transition-all duration-300"
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
                    className="text-background/80 hover:text-accent transition-colors duration-300"
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
            <div className="space-y-2 text-background/80">
              <p>hello@example.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Based in Creative Space</p>
            </div>
            <motion.a
              href="mailto:hello@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-accent text-primary px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
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
          className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-background/60 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> and lots of coffee
          </p>
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer