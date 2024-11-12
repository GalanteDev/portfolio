'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Coffee, Send, FileText, X } from 'lucide-react'
import Image from 'next/image'

export default function Portfolio() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateCursorPosition)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsContactFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 cursor-none">
      <motion.div
        className="fixed w-2 h-2 bg-black pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 1,
          top: cursorPosition.y - 1,
        }}
        animate={{
          scale: isHoveringInteractive ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Julian Galante</h1>
        <p className="text-xl mb-6">Software Developer & Design Enthusiast</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative mb-8 w-[400px] h-[400px] group overflow-hidden "
        onMouseEnter={() => setIsHoveringInteractive(true)}
        onMouseLeave={() => setIsHoveringInteractive(false)}
      >
        <Image
          src="/kline.png"
          alt="Julian Galante"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-100"
        />
        <div className="absolute inset-0 pointer-events-none"></div>
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300"
          onClick={() => setIsContactFormOpen(true)}
        >
          <motion.p 
            className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-none"
          >
            Let&apos;s create together!
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-lg max-w-md text-center mb-6"
      >
        Crafting elegant solutions through clean and scalable code.
      </motion.p>

      <motion.div 
        className="flex justify-center space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <SocialLink href="https://github.com/juliangalante" icon={<Code size={24} />} name="Code" setHovered={setHoveredLink} setIsHoveringInteractive={setIsHoveringInteractive} />
        <SocialLink href="https://linkedin.com/in/juliangalante" icon={<Coffee size={24} />} name="Coffee Chat" setHovered={setHoveredLink} setIsHoveringInteractive={setIsHoveringInteractive} />
        <SocialLink href="mailto:julian.galante@example.com" icon={<Send size={24} />} name="Contact" setHovered={setHoveredLink} setIsHoveringInteractive={setIsHoveringInteractive} />
        <SocialLink href="/resume" icon={<FileText size={24} />} name="Resume" setHovered={setHoveredLink} setIsHoveringInteractive={setIsHoveringInteractive} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mt-6 h-6 text-sm"
      >
        {hoveredLink && <p>{hoveredLink}</p>}
      </motion.div>

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsContactFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full border-2 border-black cursor-auto"
              onClick={(e: { stopPropagation: () => unknown }) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <button onClick={() => setIsContactFormOpen(false)} className="text-black hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SocialLink({ href, icon, name, setHovered, setIsHoveringInteractive }: { 
  href: string; 
  icon: React.ReactNode; 
  name: string; 
  setHovered: (name: string | null) => void;
  setIsHoveringInteractive: (isHovering: boolean) => void;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="text-black hover:text-gray-600 transition-colors"
      onMouseEnter={() => {
        setHovered(name)
        setIsHoveringInteractive(true)
      }}
      onMouseLeave={() => {
        setHovered(null)
        setIsHoveringInteractive(false)
      }}
    >
      {icon}
    </motion.a>
  )
}