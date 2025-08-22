'use client'

import { motion } from 'framer-motion'
import { Search, ShoppingCart, Heart, Menu, X, ArrowRight, Instagram, Facebook, Twitter, Calendar, MapPin, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'

// Collection type definition
type Collection = {
    id: number
    name: string
    description: string
    image: string
    season: string
    year: number
    featured: boolean
    productCount: number
    designer?: string
}

export default function CollectionsPage() {
    // State for UI controls
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [wishlistCount, setWishlistCount] = useState(0)
    const [activeFilter, setActiveFilter] = useState('All')
    const [hoveredCollection, setHoveredCollection] = useState<number | null>(null)

    // Ref for the featured collection scroll
    const featuredRef = useRef<HTMLDivElement>(null)

    // Sample collections data
    const collections: Collection[] = [
        {
            id: 1,
            name: 'Summer Breeze',
            description: 'Light, airy pieces designed for warm days and cool evenings. This collection features breathable fabrics in vibrant colors inspired by coastal landscapes.',
            image: '/images/landing-1.jpg',
            season: 'Summer',
            year: 2025,
            featured: true,
            productCount: 24,
            designer: 'Emma Chen'
        },
        {
            id: 2,
            name: 'Urban Nomad',
            description: 'Versatile essentials for the modern explorer. Functional designs meet contemporary aesthetics in this collection of adaptable pieces for city life.',
            image: '/images/landing-2.jpg',
            season: 'All Seasons',
            year: 2025,
            featured: true,
            productCount: 18
        },
        {
            id: 3,
            name: 'Autumn Palette',
            description: 'Embrace the changing seasons with warm tones and layered silhouettes. This collection celebrates the rich colors and textures of fall.',
            image: '/images/landing-3.jpg',
            season: 'Fall',
            year: 2024,
            featured: false,
            productCount: 16,
            designer: 'Marcus Reid'
        },
        {
            id: 4,
            name: 'Monochrome Edit',
            description: 'Timeless black and white pieces with minimalist design. This collection focuses on clean lines and premium materials for an effortless aesthetic.',
            image: '/images/landing-4.jpg',
            season: 'All Seasons',
            year: 2024,
            featured: true,
            productCount: 12
        },
        {
            id: 5,
            name: 'Winter Luxe',
            description: 'Luxurious fabrics and cozy silhouettes for the coldest months. This collection combines comfort and elegance for sophisticated winter style.',
            image: '/images/landing-5.jpg',
            season: 'Winter',
            year: 2024,
            featured: false,
            productCount: 20,
            designer: 'Sofia Mendez'
        },
        {
            id: 6,
            name: 'Sustainable Essentials',
            description: 'Eco-friendly wardrobe staples crafted from organic and recycled materials. This collection proves that style and sustainability can go hand in hand.',
            image: '/images/landing-6.jpg',
            season: 'All Seasons',
            year: 2025,
            featured: true,
            productCount: 15,
            designer: 'Leo Kim'
        },
        {
            id: 7,
            name: 'Spring Bloom',
            description: 'Fresh patterns and vibrant colors inspired by natures renewal. This collection captures the essence of spring with floral motifs and light fabrics.',
            image: '/images/landing-7.jpg',
            season: 'Spring',
            year: 2024,
            featured: false,
            productCount: 22
        },
        {
            id: 8,
            name: 'Evening Elegance',
            description: 'Sophisticated pieces for special occasions and night events. This collection features elevated designs with subtle embellishments and refined details.',
            image: '/images/landing-3.jpg',
            season: 'All Seasons',
            year: 2025,
            featured: false,
            productCount: 14,
            designer: 'Olivia Blackwell'
        }
    ]

    // Filter collections based on active filter
    const filteredCollections = activeFilter === 'All'
        ? collections
        : activeFilter === 'Featured'
            ? collections.filter(collection => collection.featured)
            : collections.filter(collection => collection.season === activeFilter)

    // Featured collections for the horizontal scroll
    const featuredCollections = collections.filter(collection => collection.featured)

    // Scroll featured collections
    const scrollFeatured = (direction: 'left' | 'right') => {
        if (!featuredRef.current) return

        const scrollAmount = 400 // Adjust as needed
        featuredRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const fadeInUp = {
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
                                <Link href="/shop-page" className="hover:text-[#ABE188] transition-colors">Shop</Link>
                                <Link href="/collections" className="text-[#ABE188] font-medium">Collections</Link>
                                <Link href="/gallery" className="hover:text-[#ABE188] transition-colors">Gallery/Events</Link>
                                <Link href="/about" className="hover:text-[#ABE188] transition-colors">About</Link>
                                <Link href="/contact" className="hover:text-[#ABE188] transition-colors">Contact</Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="relative hidden md:block">
                                    <input
                                        type="text"
                                        placeholder="Search collections..."
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
                                    <Link href="/shop-page" className="px-4 py-2 hover:bg-gray-100">Shop</Link>
                                    <Link href="/collections" className="px-4 py-2 bg-gray-100 text-[#ABE188] font-medium">Collections</Link>
                                    <Link href="/gallery" className="px-4 py-2 hover:bg-gray-100">Gallery</Link>
                                    <Link href="/about" className="px-4 py-2 hover:bg-gray-100">About</Link>
                                    <Link href="/contact" className="px-4 py-2 hover:bg-gray-100">Contact</Link>
                                </nav>
                            </motion.div>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative h-[70vh] overflow-hidden">
                    <Image
                        src="/images/landing-5.jpg"
                        alt="Collections"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold mb-4 text-center"
                        >
                            Our Collections
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl mb-8 max-w-2xl text-center"
                        >
                            Explore our curated collections, each telling a unique story through fabric, design, and inspiration.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link
                                href="#featured"
                                className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                            >
                                Discover Now
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Collections Horizontal Scroll */}
                <section id="featured" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Featured Collections</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => scrollFeatured('left')}
                                    className="p-2 rounded-full border border-gray-300 hover:border-[#ABE188] hover:text-[#ABE188] transition-colors"
                                >
                                    <ChevronRight className="rotate-180" size={24} />
                                </button>
                                <button
                                    onClick={() => scrollFeatured('right')}
                                    className="p-2 rounded-full border border-gray-300 hover:border-[#ABE188] hover:text-[#ABE188] transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={featuredRef}
                            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {featuredCollections.map(collection => (
                                <motion.div
                                    key={collection.id}
                                    whileHover={{ y: -10 }}
                                    className="min-w-[300px] md:min-w-[400px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={collection.image || "/placeholder.svg"}
                                            alt={collection.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6 text-white">
                                            <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                                            <p className="text-sm opacity-90">{collection.season} {collection.year}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 mb-4 line-clamp-2">{collection.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">{collection.productCount} Products</span>
                                            <Link
                                                href={`/collections/${collection.id}`}
                                                className="flex items-center gap-1 text-[#ABE188] font-medium hover:underline"
                                            >
                                                View Collection
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Collections */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8">Explore All Collections</h2>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            {['All', 'Featured', 'Summer', 'Fall', 'Winter', 'Spring', 'All Seasons'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                            ? 'bg-[#ABE188] text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Collections Grid */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredCollections.map(collection => (
                                <motion.div
                                    key={collection.id}
                                    variants={fadeInUp}
                                    className="group"
                                    onMouseEnter={() => setHoveredCollection(collection.id)}
                                    onMouseLeave={() => setHoveredCollection(null)}
                                >
                                    <Link href={`/collections/${collection.id}`}>
                                        <div className="relative overflow-hidden rounded-xl mb-4">
                                            <div className="aspect-[4/3] relative">
                                                <Image
                                                    src={collection.image || "/placeholder.svg"}
                                                    alt={collection.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div
                                                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${hoveredCollection === collection.id ? 'opacity-20' : 'opacity-40'
                                                        }`}
                                                ></div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                                                <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm opacity-90">{collection.season} {collection.year}</span>
                                                    {collection.designer && (
                                                        <>
                                                            <span className="text-sm opacity-70">•</span>
                                                            <span className="text-sm opacity-90">By {collection.designer}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{
                                                    opacity: hoveredCollection === collection.id ? 1 : 0,
                                                    y: hoveredCollection === collection.id ? 0 : 20
                                                }}
                                                className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {collection.productCount} Items
                                            </motion.div>
                                        </div>
                                    </Link>

                                    <p className="text-gray-600 mb-3 line-clamp-2">{collection.description}</p>
                                    <Link
                                        href={`/collections/${collection.id}`}
                                        className="flex items-center gap-1 text-[#ABE188] font-medium hover:underline"
                                    >
                                        Explore Collection
                                        <ArrowRight size={16} />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Design Philosophy */}
                <section className="py-16 bg-gray-900 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-bold mb-4">Our Design Philosophy</h2>
                                <p className="text-gray-300 mb-6">
                                    At TRYB FASHION, each collection is a carefully crafted narrative that reflects our commitment to quality, sustainability, and innovative design. We believe in creating pieces that transcend seasons and trends, focusing instead on timeless style and exceptional craftsmanship.
                                </p>
                                <p className="text-gray-300 mb-6">
                                    Our designers draw inspiration from global cultures, urban landscapes, and natural environments to create collections that are both distinctive and versatile. We prioritize ethical production methods and sustainable materials, ensuring that our fashion footprint remains as light as possible.
                                </p>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                                >
                                    Learn More About Us
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="aspect-square relative rounded-xl overflow-hidden">
                                    <Image
                                        src="/images/landing-6.jpg"
                                        alt="Design Studio"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-2/3 aspect-[4/3] rounded-xl overflow-hidden border-4 border-white">
                                    <Image
                                        src="/images/landing-2.jpg"
                                        alt="Design Process"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lookbook Preview */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">From Our Lookbook</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Get inspired by our latest lookbook featuring styled outfits from our collections. Discover new ways to mix and match our pieces for any occasion.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { id: 1, image: "/images/landing-6.jpg" },
                                { id: 2, image: "/images/landing-2.jpg" },
                                { id: 3, image: "/images/landing-3.jpg" },
                                { id: 4, image: "/images/landing-4.jpg" },
                                { id: 5, image: "/images/landing-5.jpg" },
                                { id: 6, image: "/images/landing-7.jpg" },
                                { id: 7, image: "/images/landing-1.jpg" },
                                { id: 8, image: "/images/landing-2.jpg" },
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className={`relative overflow-hidden rounded-lg ${item.id === 1 || item.id === 6 ? "md:col-span-2 md:row-span-2" : ""
                                        }`}
                                >
                                    <div className={`${item.id === 1 || item.id === 6 ? "aspect-square" : "aspect-[3/4]"} relative`}>
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={`Lookbook image ${item.id}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link
                                href="/gallery"
                                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#ABE188] text-[#ABE188] rounded-full hover:bg-[#ABE188] hover:text-white transition-colors"
                            >
                                View Full Gallery
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                            <p className="text-gray-600 mb-8">
                                Subscribe to our newsletter to be the first to know about new collections, exclusive events, and special offers.
                            </p>
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
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
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
                                    <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
                                    <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                                    <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
                                    <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Sale Items</Link></li>
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
                                    <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
                                    <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
                                    <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
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