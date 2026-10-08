import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [activeNav, setActiveNav] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Home', 'Work', 'Resume']

  const handleNavClick = (link: string) => {
    setActiveNav(link)
    // Smooth scroll behavior
    if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          scrollY > 100 ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <motion.button
          className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden group flex-shrink-0"
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] group-hover:opacity-100 opacity-100"></div>
          <div className="absolute inset-1 bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">JA</span>
          </div>
        </motion.button>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all ${
                activeNav === link
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {link}
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Say Hi Button */}
        <motion.button
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary bg-surface hover:text-text-primary transition-all group flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#89AACC] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">Say hi</span>
          <span className="relative">↗</span>
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}
