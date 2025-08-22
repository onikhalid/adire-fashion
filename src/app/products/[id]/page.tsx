'use client'

import { motion } from 'framer-motion'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, ChevronUp, Share2, Star, Truck, RotateCcw, Ruler, Check, Plus, Minus, Instagram, Facebook, Twitter, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'

// Product type with extended details
type ProductDetail = {
  id: number
  name: string
  price: number
  salePrice?: number
  isSale?: boolean
  isNew?: boolean
  description: string
  features: string[]
  images: string[]
  colors: {
    name: string
    value: string
    images?: string[]
  }[]
  sizes: string[]
  category: string
  material: string
  careInstructions: string[]
  relatedProducts: number[]
  reviews: {
    rating: number
    count: number
  }
}

// Sample products database - in a real app, this would come from an API or database
const productsDatabase: Record<string, ProductDetail> = {
  "1": {
    id: 1,
    name: 'Oversized Cotton T-shirt',
    price: 29.99,
    isNew: true,
    description: 'This oversized cotton t-shirt offers exceptional comfort with a modern silhouette. Made from 100% organic cotton, it features a relaxed fit and dropped shoulders for an effortlessly stylish look.',
    features: [
      '100% organic cotton',
      'Oversized fit',
      'Dropped shoulders',
      'Ribbed neckline',
      'Sustainably produced'
    ],
    images: [
        '/images/landing-1.jpg',
        '/images/landing-2.jpg',
        '/images/landing-3.jpg',
        '/images/landing-5.jpg'
    ],
    colors: [
      { name: 'White', value: '#ffffff' },
      { name: 'Black', value: '#000000' },
      { name: 'Heather Gray', value: '#9a9a9a' },
      { name: 'Sage Green', value: '#7d8471' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'T-shirts',
    material: '100% organic cotton',
    careInstructions: [
      'Machine wash cold with similar colors',
      'Do not bleach',
      'Tumble dry low',
      'Cool iron if needed',
      'Do not dry clean'
    ],
    relatedProducts: [2, 5, 7, 8],
    reviews: {
      rating: 4.7,
      count: 86
    }
  },
  "2": {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 49.99,
    description: 'These premium slim fit jeans combine style and comfort with a modern silhouette. The stretch denim fabric provides flexibility while maintaining shape throughout the day.',
    features: [
      'Premium stretch denim (98% cotton, 2% elastane)',
      'Slim fit through hip and thigh',
      'Five-pocket styling',
      'Button closure with zip fly',
      'Reinforced stitching for durability'
    ],
    images: [
        '/images/landing-2.jpg',
        '/images/landing-1.jpg',
        '/images/landing-3.jpg',
        '/images/landing-5.jpg'
    ],
    colors: [
      { name: 'Indigo Blue', value: '#3f4e6c' },
      { name: 'Black', value: '#000000' },
      { name: 'Light Wash', value: '#a0b2c6' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    category: 'Jeans',
    material: '98% cotton, 2% elastane',
    careInstructions: [
      'Machine wash cold inside out',
      'Wash with similar colors',
      'Do not bleach',
      'Tumble dry low',
      'Warm iron if needed'
    ],
    relatedProducts: [1, 4, 7, 8],
    reviews: {
      rating: 4.5,
      count: 112
    }
  },
  "3": {
    id: 3,
    name: 'Premium Cotton Blend Hoodie',
    price: 59.99,
    salePrice: 49.99,
    isSale: true,
    isNew: true,
    description: 'This premium cotton blend hoodie offers exceptional comfort and style. Crafted from a soft cotton-polyester blend, it features a modern fit with ribbed cuffs and hem for a sleek silhouette. The adjustable drawstring hood and kangaroo pocket add practical functionality, while the minimalist design ensures versatile styling options.',
    features: [
      'Premium cotton-polyester blend (80% cotton, 20% polyester)',
      'Brushed interior for extra softness',
      'Ribbed cuffs and hem',
      'Adjustable drawstring hood',
      'Kangaroo pocket',
      'Reinforced seams for durability'
    ],
    images: [
        '/images/landing-3.jpg',
        '/images/landing-2.jpg',
        '/images/landing-4.jpg',
        '/images/landing-5.jpg'
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy Blue', value: '#0a2463' },
      { name: 'Heather Gray', value: '#9a9a9a' },
      { name: 'Forest Green', value: '#2c5f2d' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Hoodies',
    material: '80% cotton, 20% polyester',
    careInstructions: [
      'Machine wash cold with similar colors',
      'Do not bleach',
      'Tumble dry low',
      'Cool iron if needed',
      'Do not dry clean'
    ],
    relatedProducts: [1, 2, 4, 6],
    reviews: {
      rating: 4.8,
      count: 124
    }
  },
  "4": {
    id: 4,
    name: 'Cargo Pants',
    price: 69.99,
    salePrice: 49.99,
    isSale: true,
    description: 'These versatile cargo pants combine functionality with modern style. Multiple pockets provide practical storage, while the relaxed fit ensures all-day comfort.',
    features: [
      'Durable cotton twill fabric',
      'Relaxed fit with straight leg',
      'Multiple cargo pockets',
      'Adjustable waistband',
      'Reinforced knees for durability'
    ],
    images: [
        '/images/landing-4.jpg',
        '/images/landing-2.jpg',
        '/images/landing-3.jpg',
        '/images/landing-5.jpg'
    ],
    colors: [
      { name: 'Khaki', value: '#c3b091' },
      { name: 'Black', value: '#000000' },
      { name: 'Olive Green', value: '#556b2f' },
      { name: 'Navy', value: '#000080' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    category: 'Pants',
    material: '100% cotton twill',
    careInstructions: [
      'Machine wash cold',
      'Wash with similar colors',
      'Do not bleach',
      'Tumble dry low',
      'Warm iron if needed'
    ],
    relatedProducts: [2, 3, 7, 8],
    reviews: {
      rating: 4.6,
      count: 98
    }
  },
  "5": {
    id: 5,
    name: 'Cargo Pants',
    price: 69.99,
    salePrice: 49.99,
    isSale: true,
    description: 'These versatile cargo pants combine functionality with modern style. Multiple pockets provide practical storage, while the relaxed fit ensures all-day comfort.',
    features: [
      'Durable cotton twill fabric',
      'Relaxed fit with straight leg',
      'Multiple cargo pockets',
      'Adjustable waistband',
      'Reinforced knees for durability'
    ],
    images: [
        '/images/landing-5.jpg',
        '/images/landing-2.jpg',
        '/images/landing-3.jpg',
        '/images/landing-4.jpg'
    ],
    colors: [
      { name: 'Khaki', value: '#c3b091' },
      { name: 'Black', value: '#000000' },
      { name: 'Olive Green', value: '#556b2f' },
      { name: 'Navy', value: '#000080' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    category: 'Pants',
    material: '100% cotton twill',
    careInstructions: [
      'Machine wash cold',
      'Wash with similar colors',
      'Do not bleach',
      'Tumble dry low',
      'Warm iron if needed'
    ],
    relatedProducts: [2, 3, 7, 8],
    reviews: {
      rating: 4.6,
      count: 98
    }
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  // State for UI controls
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState(0)
  const [isCustomSizeOpen, setIsCustomSizeOpen] = useState(false)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true)
  const [isShippingOpen, setIsShippingOpen] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  // Custom size measurements
  const [customSize, setCustomSize] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    shoulder: ''
  })

  // Get product data
  const product = productsDatabase[productId]
  
  // Handle invalid product ID
  useEffect(() => {
    if (!product && productId) {
      router.push('/shop-page')
    }
  }, [product, productId, router])

  // If product not found, show loading or redirect
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    )
  }

  // Navigation functions
  const navigateToNextImage = () => {
    setMainImage((prevIndex) => {
      const nextIndex = (prevIndex + 1) % product.images.length
      return nextIndex
    })
  }

  const navigateToPrevImage = () => {
    setMainImage((prevIndex) => {
      const prevImageIndex = prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      return prevImageIndex
    })
  }

  // Handle image zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    
    setZoomPosition({ x, y })
  }

  const handleAddToCart = () => {
    if (!selectedSize && !isCustomSizeOpen) {
      alert('Please select a size')
      return
    }
    
    setCartCount(prev => prev + quantity)
    // Add actual cart functionality here
  }

  const handleAddToWishlist = () => {
    setWishlistCount(prev => prev + 1)
    // Add actual wishlist functionality here
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <main
      className='p-1'
      style={{
        background: 'linear-gradient(to right, #ABE188 50%, #F78E69 50%)'
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

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#ABE188]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop-page" className="hover:text-[#ABE188]">Shop</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-[#ABE188]">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>

        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="lg:w-3/5"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail Navigation */}
                <div className="md:w-1/6 order-2 md:order-1">
                  <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(index)}
                        className={`relative border-2 rounded overflow-hidden aspect-[3/4] ${
                          mainImage === index ? 'border-[#ABE188]' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} view ${index + 1}`}
                          width={80}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Main Image */}
                <div 
                  className="md:w-5/6 order-1 md:order-2 relative overflow-hidden rounded-lg"
                  ref={imageRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={product.images[mainImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Zoom overlay */}
                    {isZoomed && (
                      <div 
                        className="absolute inset-0 bg-no-repeat pointer-events-none"
                        style={{
                          backgroundImage: `url(${product.images[mainImage]})`,
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          backgroundSize: '200%'
                        }}
                      />
                    )}
                    
                    {/* Product badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {product.isNew && (
                        <span className="bg-[#ABE188] text-white px-3 py-1 rounded-full text-sm font-medium">
                          NEW
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-[#F78E69] text-white px-3 py-1 rounded-full text-sm font-medium">
                          SALE
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Image navigation arrows */}
                  <button 
                    onClick={navigateToPrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    onClick={navigateToNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="lg:w-2/5"
            >
              {/* Product Title and Reviews */}
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        size={16} 
                        className={star <= Math.round(product.reviews.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.reviews.rating} ({product.reviews.count} reviews)
                  </span>
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.isSale ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#F78E69]">${product.salePrice?.toFixed(2)}</span>
                    <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="bg-[#F78E69]/10 text-[#F78E69] text-sm px-2 py-1 rounded">
                      Save ${(product.price - (product.salePrice || 0)).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color: {selectedColor || 'Select a color'}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-[#ABE188] scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check className="text-white mx-auto" size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Size: {selectedSize || 'Select a size'}</h3>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-sm text-[#ABE188] flex items-center gap-1 hover:underline"
                  >
                    <Ruler size={16} />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size)
                        setIsCustomSizeOpen(false)
                      }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedSize === size && !isCustomSizeOpen
                          ? 'border-[#ABE188] bg-[#ABE188] text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsCustomSizeOpen(!isCustomSizeOpen)
                      setSelectedSize(null)
                    }}
                    className={`px-4 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCustomSizeOpen
                        ? 'border-[#ABE188] bg-[#ABE188] text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Custom Size
                  </button>
                </div>
                
                {/* Custom Size Form */}
                {isCustomSizeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-50 p-4 rounded-lg mb-4"
                  >
                    <h4 className="font-medium mb-3">Enter Your Measurements (inches)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Chest</label>
                        <input
                          type="number"
                          value={customSize.chest}
                          onChange={(e) => setCustomSize({...customSize, chest: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ABE188]"
                          placeholder="e.g., 38"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Waist</label>
                        <input
                          type="number"
                          value={customSize.waist}
                          onChange={(e) => setCustomSize({...customSize, waist: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ABE188]"
                          placeholder="e.g., 32"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Hips</label>
                        <input
                          type="number"
                          value={customSize.hips}
                          onChange={(e) => setCustomSize({...customSize, hips: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ABE188]"
                          placeholder="e.g., 40"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Shoulder</label>
                        <input
                          type="number"
                          value={customSize.shoulder}
                          onChange={(e) => setCustomSize({...customSize, shoulder: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ABE188]"
                          placeholder="e.g., 18"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="text-sm text-gray-600 block mb-1">Inseam</label>
                      <input
                        type="number"
                        value={customSize.inseam}
                        onChange={(e) => setCustomSize({...customSize, inseam: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ABE188]"
                        placeholder="e.g., 32"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Our tailors will create your custom-sized garment based on these measurements.
                      Additional $10 fee applies for custom sizing.
                    </p>
                  </motion.div>
                )}
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-[#ABE188] text-white rounded-full font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={handleAddToWishlist}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-full font-medium hover:border-[#F78E69] hover:text-[#F78E69] transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart size={20} />
                    Wishlist
                  </button>
                  <button className="flex-1 py-3 border-2 border-gray-300 rounded-full font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>
              
              {/* Product Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Truck size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <RotateCcw size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Easy Returns</h4>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>
              
              {/* Accordion Sections */}
              <div className="border-t border-gray-200">
                {/* Description */}
                <div className="py-4 border-b border-gray-200">
                  <button 
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    className="flex justify-between items-center w-full text-left font-medium"
                  >
                    Description
                    {isDescriptionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isDescriptionOpen && (
                    <div className="mt-3 text-gray-600">
                      <p className="mb-3">{product.description}</p>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <div className="mt-3">
                        <h4 className="font-medium text-gray-900 mb-2">Material:</h4>
                        <p>{product.material}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Shipping & Returns */}
                <div className="py-4 border-b border-gray-200">
                  <button 
                    onClick={() => setIsShippingOpen(!isShippingOpen)}
                    className="flex justify-between items-center w-full text-left font-medium"
                  >
                    Shipping & Returns
                    {isShippingOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isShippingOpen && (
                    <div className="mt-3 text-gray-600">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping:</h4>
                      <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Free standard shipping on orders over $100</li>
                        <li>Standard shipping: 5-7 business days</li>
                        <li>Express shipping: 2-3 business days</li>
                      </ul>
                      
                      <h4 className="font-medium text-gray-900 mb-2">Returns:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>30-day return policy</li>
                        <li>Items must be unworn with original tags attached</li>
                        <li>Custom-sized items are non-returnable</li>
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Care Instructions */}
                <div className="py-4 border-b border-gray-200">
                  <button 
                    onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                    className="flex justify-between items-center w-full text-left font-medium"
                  >
                    Care Instructions
                    {isSizeGuideOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isSizeGuideOpen && (
                    <div className="mt-3 text-gray-600">
                      <ul className="list-disc pl-5 space-y-1">
                        {product.careInstructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Reviews */}
                <div className="py-4">
                  <button 
                    onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                    className="flex justify-between items-center w-full text-left font-medium"
                  >
                    Reviews ({product.reviews.count})
                    {isReviewsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isReviewsOpen && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star}
                              size={20} 
                              className={star <= Math.round(product.reviews.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                        <span className="text-lg font-medium">{product.reviews.rating} out of 5</span>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Sample reviews - would be dynamically loaded in a real app */}
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star 
                                  key={star}
                                  size={16} 
                                  className={star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                />
                              ))}
                            </div>
                            <span className="font-medium">Perfect fit!</span>
                          </div>
                          <p className="text-gray-600 mb-1">
                            This {product.name.toLowerCase()} is exactly what I was looking for. The material is soft and comfortable, and the fit is perfect.
                          </p>
                          <p className="text-sm text-gray-500">Sarah T. - 2 weeks ago</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star 
                                  key={star}
                                  size={16} 
                                  className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                />
                              ))}
                            </div>
                            <span className="font-medium">Great quality</span>
                          </div>
                          <p className="text-gray-600 mb-1">
                            The quality of this {product.name.toLowerCase()} is excellent. It&apos;s comfortable and looks great. The only reason I&apos;m giving 4 stars is because the color is slightly different than shown.
                          </p>
                          <p className="text-sm text-gray-500">Michael R. - 1 month ago</p>
                        </div>
                        
                        <button className="text-[#ABE188] font-medium hover:underline">
                          Read all {product.reviews.count} reviews
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Related products */}
              {product.relatedProducts.map(relatedId => {
                const relatedProduct = productsDatabase[relatedId.toString()]
                if (!relatedProduct) return null
                
                return (
                  <div key={relatedId} className="group">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <Link href={`/products/${relatedId}`}>
                        <div className="aspect-[3/4] relative">
                          <Image
                            src={relatedProduct.images[0] || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                      {relatedProduct.isNew && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#ABE188] text-white text-xs px-2 py-1 rounded">
                            NEW
                          </span>
                        </div>
                      )}
                      {relatedProduct.isSale && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#F78E69] text-white text-xs px-2 py-1 rounded">
                            SALE
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    {relatedProduct.isSale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[#F78E69] font-medium">${relatedProduct.salePrice?.toFixed(2)}</span>
                        <span className="text-gray-500 line-through text-sm">${relatedProduct.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <p className="text-gray-900 font-medium">${relatedProduct.price.toFixed(2)}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
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