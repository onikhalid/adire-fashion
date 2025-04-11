'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Share2, ShoppingCart, Instagram, Twitter, Facebook, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    '/images/landing-1.jpg',
    '/images/landing-2.jpg',
    '/images/landing-3.jpg',
    '/images/landing-4.jpg',
    '/images/landing-5.jpg',
    '/images/landing-6.jpg',
    '/images/landing-7.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <main 
      className='p-2'
      style={{
        background: 'linear-gradient(to right, #ABE188 50%, #F78E69 50%)'
      }}
    >
      <div className="min-h-screen bg-[#1A1A1A] text-white rounded-lg overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: "url('/images/TRYBLogo.png')",
            backgroundSize: '100px',
            backgroundRepeat: 'repeat',
          }}></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="flex items-center justify-between px-4 py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold z-50"
            >
              <Link href='/' className='flex items-center gap-2 text-xl font-display'>
                <Image
                  src='/images/TRYBLogo.png'
                  alt='Logo'
                  width={40}
                  height={40}
                  className="invert"
                />
                TRYB FASHION
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden items-center space-x-8 md:flex">
              <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-transform hover:scale-105">
                BOOK NOW
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-2">
                <span className={`block h-0.5 w-8 bg-white transition-transform ${isMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-8 bg-white ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-8 bg-white transition-transform ${isMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="overflow-hidden md:hidden absolute top-full left-0 right-0 bg-[#1A1A1A]"
          >
            <div className="space-y-4 bg-black/90 px-4 py-4">
              <Link href="#" className="block hover:text-primary">
                Home
              </Link>
              <Link href="#" className="block hover:text-primary">
                Pages
              </Link>
              <Link href="#" className="block hover:text-primary">
                Blog
              </Link>
              <Link href="#" className="block hover:text-primary">
                Shop
              </Link>
              <button className="w-full rounded-full bg-white px-6 py-2 text-sm font-semibold text-black">
                BOOK NOW
              </button>
            </div>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row h-screen">
          {/* Left Side - Image Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full md:w-1/2 h-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="Fashion Showcase"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 hidden">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex w-full flex-col justify-center space-y-8 px-4 py-12 md:w-1/2 md:px-12 relative z-10"
          >
            <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl font-display">
              BLEND STYLES,
              <br />
              EMBRACE CULTURE,
              <br />
              WEAR TRYB FUSION.
            </h1>

            <p className="text-lg text-gray-300 max-w-md">
              Discover the perfect fusion of style and culture with our unique clothing line. Express yourself through fashion that tells a story.
            </p>

            <div className="flex space-x-4">
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                Shop Now
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                Our Story
              </button>
            </div>

            <div className="flex items-center space-x-6 text-gray-400 mt-8">
              <a href="https://www.instagram.com/trybefusion" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.twitter.com/trybefusion" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.facebook.com/trybefusion" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+62 8097 - 8652 - 111</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fixed Social Links */}
        <div className="fixed right-8 top-1/2 z-40 -translate-y-1/2 space-y-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </main>
  )
}