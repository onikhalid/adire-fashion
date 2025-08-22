'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, Filter, ArrowRight, Instagram, Facebook, Twitter, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Product type definition
type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew: boolean
  isSale?: boolean
  salePrice?: number
}

// Hero slideshow data
const heroSlides = [
    {
      image: '/images/landing-5.jpg',
      title: 'Summer Collection',
      subtitle: 'Embrace the heat with our vibrant styles',
      cta: 'Shop Summer'
    },
    {
      image: '/images/landing-2.jpg',
      title: 'Urban Essentials',
      subtitle: 'Elevate your everyday wardrobe',
      cta: 'Discover Now'
    },
    {
      image: '/images/landing-3.jpg',
      title: 'Sustainable Fashion',
      subtitle: 'Eco-friendly pieces for conscious style',
      cta: 'Shop Sustainable'
    },
    {
      image: '/images/landing-1.jpg',
      title: 'Limited Edition',
      subtitle: 'Exclusive designs for the bold and unique',
      cta: 'View Collection'
    }
  ]

export default function ShopPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

    // Hero slideshow state
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
    // Auto-advance slideshow
    useEffect(() => {
      if (!isAutoPlaying) return
      
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length)
      }, 5000) // Change slide every 5 seconds
      
      return () => clearInterval(interval)
    }, [isAutoPlaying])
  
    // Pause autoplay when user interacts with slideshow
    const handleSlideNavigation = (index: number) => {
      setCurrentSlide(index)
      setIsAutoPlaying(false)
      
      // Resume autoplay after 10 seconds of inactivity
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true)
      }, 10000)
      
      return () => clearTimeout(timeout)
    }

    
  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: 'Oversized Cotton T-shirt',
      price: 29.99,
      image: '/images/landing-1.jpg',
      category: 'T-shirts',
      isNew: true
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 49.99,
      image: '/images/landing-2.jpg',
      category: 'Jeans',
      isNew: false
    },
    {
      id: 3,
      name: 'Printed Hoodie',
      price: 59.99,
      image: '/images/landing-3.jpg',
      category: 'Hoodies',
      isNew: true
    },
    {
      id: 4,
      name: 'Cargo Pants',
      price: 69.99,
      image: '/images/landing-4.jpg',
      category: 'Pants',
      isNew: false,
      isSale: true,
      salePrice: 49.99
    },
    {
      id: 5,
      name: 'Graphic Print T-shirt',
      price: 34.99,
      image: '/images/landing-5.jpg',
      category: 'T-shirts',
      isNew: false
    },
    {
      id: 6,
      name: 'Denim Jacket',
      price: 79.99,
      image: '/images/landing-1.jpg',
      category: 'Jackets',
      isNew: true
    },
    {
      id: 7,
      name: 'Relaxed Fit Shorts',
      price: 39.99,
      image: '/images/landing-2.jpg',
      category: 'Shorts',
      isNew: false,
      isSale: true,
      salePrice: 29.99
    },
    {
      id: 8,
      name: 'Patterned Shirt',
      price: 44.99,
      image: '/images/landing-3.jpg',
      category: 'Shirts',
      isNew: true
    }
  ]

  const categories = ['All', 'T-shirts', 'Jeans', 'Hoodies', 'Pants', 'Jackets', 'Shorts', 'Shirts']

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const addToCart = (productId: number) => {
    setCartCount(prev => prev + 1)
    // Add actual cart functionality here
  }

  const addToWishlist = (productId: number) => {
    setWishlistCount(prev => prev + 1)
    // Add actual wishlist functionality here
  }

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <main
    className='p-1'
    style={{
      background: ' linear-gradient(to right, #ABE188 50%, #F78E69 50%)'
    }}
    >
        <div className="min-h-screen bg-white text-gray-900 rounded-md">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Navigation */}
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/TRYBLogo.png"
                  alt="TRYB FASHION"
                  width={40}
                  height={40}
                />
                <span className="text-xl font-bold font-display">TRYB FASHION</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-[#ABE188] transition-colors">Home</Link>
              <Link href="/shop-page" className="text-[#ABE188] font-medium">Shop</Link>
              <Link href="/collections" className="hover:text-[#ABE188] transition-colors">Collections</Link>
              <Link href="/gallery" className="hover:text-[#ABE188] transition-colors">
                  Gallery/Events
                </Link>
              <Link href="/about" className="hover:text-[#ABE188] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[#ABE188] transition-colors">Contact</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ABE188] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="relative">
                <Link href="/wishlist">
                  <Heart size={24} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F78E69] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
              
              <div className="relative">
                <Link href="/cart">
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F78E69] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ABE188] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white py-4 border-b"
            >
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="px-4 py-2 hover:bg-gray-100">Home</Link>
                <Link href="/shop-page" className="px-4 py-2 bg-gray-100 text-[#ABE188] font-medium">Shop</Link>
                <Link href="/collections" className="px-4 py-2 hover:bg-gray-100">Collections</Link>
                <Link href="/about" className="px-4 py-2 hover:bg-gray-100">About</Link>
                <Link href="/contact" className="px-4 py-2 hover:bg-gray-100">Contact</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      {/* <div className="relative h-[65vh] bg-gray-900 overflow-hidden">
        <Image
          src="/images/landing-5.jpg"
          alt="Shop Collection"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            New Collection
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Discover the latest trends
          </motion.p>
        </div>
      </div> */}
             {/* Enhanced Hero Slideshow */}
             <div className="relative h-[65vh] bg-gray-900 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[currentSlide].image || "/placeholder.svg"}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl mb-8"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                >
                  {heroSlides[currentSlide].cta}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Navigation */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideNavigation(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-10' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button 
            onClick={() => handleSlideNavigation(
              currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1
            )}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition-all"
            aria-label="Previous slide"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={() => handleSlideNavigation(
              (currentSlide + 1) % heroSlides.length
            )}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition-all"
            aria-label="Next slide"
          >
            <ArrowRight size={24} />
          </button>
        </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Shop All Products</h2>
            <p className="text-gray-600">{filteredProducts.length} items</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category 
                    ? 'bg-[#ABE188] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            
            <button 
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium flex items-center gap-1"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
        
        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50 p-4 rounded-lg mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    className="w-full accent-[#ABE188]" 
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$0</span>
                  <span>$200</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button 
                      key={size}
                      className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#ABE188] hover:bg-[#ABE188] hover:text-white transition-all"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {['bg-black', 'bg-white', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'].map(color => (
                    <button 
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} border border-gray-300 hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="px-6 py-2 bg-[#ABE188] text-white rounded-full hover:bg-opacity-90 transition-colors">
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredProducts.map(product => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                
                {/* Product badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-[#ABE188] text-white text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-[#F78E69] text-white text-xs px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                </div>
                
                {/* Quick actions */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    y: hoveredProduct === product.id ? 0 : 20
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2 flex justify-between"
                >
                  <button 
                    onClick={() => addToWishlist(product.id)}
                    className="p-2 hover:text-[#F78E69] transition-colors"
                  >
                    <Heart size={20} />
                  </button>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="flex-1 mx-1 bg-[#ABE188] text-white py-1 px-3 rounded text-sm hover:bg-opacity-90 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    href={`/products/${product.id}`}
                    className="p-2 hover:text-[#ABE188] transition-colors"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
              
              <div className="mt-2">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex items-center gap-2">
                  {product.isSale ? (
                    <>
                      <span className="text-[#F78E69] font-medium">${product.salePrice?.toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 border-2 border-[#ABE188] text-[#ABE188] rounded-full hover:bg-[#ABE188] hover:text-white transition-colors">
            Load More Products
          </button>
        </div>
        
        {/* Featured Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['T-shirts', 'Jeans', 'Hoodies', 'Jackets'].map(category => (
              <div key={category} className="relative rounded-lg overflow-hidden group">
                <div className="aspect-square relative">
                  <Image
                    src={`/images/landing-5.jpg`}
                    alt={category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link 
                    href={`/category/${category.toLowerCase()}`}
                    className="bg-white bg-opacity-90 px-6 py-3 rounded-full font-medium hover:bg-opacity-100 transition-all"
                  >
                    {category}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="mt-16 bg-gray-100 rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ABE188] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[#ABE188] text-white rounded-full hover:bg-opacity-90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/TRYBLogo.png"
                  alt="TRYB FASHION"
                  width={40}
                  height={40}
                  className="invert"
                />
                <span className="text-xl font-bold">TRYB FASHION</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Discover the perfect fusion of style and culture with our unique clothing line.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Sale Items</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Help</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 TRYB FASHION. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <img src="/placeholder.svg?height=30&width=50&text=VISA" alt="Visa" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50&text=MC" alt="Mastercard" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50&text=AMEX" alt="American Express" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50&text=PAYPAL" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </footer>
    </div>
    </main>
  )
}