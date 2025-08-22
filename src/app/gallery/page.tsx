"use client"

import { motion } from "framer-motion"
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

// Gallery item type
type GalleryItem = {
  id: number
  image: string
  title: string
  category: "lookbook" | "runway" | "campaign" | "behind-the-scenes"
  collection?: string
  description?: string
  featured?: boolean
}

// Event type
type Event = {
  id: number
  title: string
  date: string
  location: string
  image: string
  description: string
  featured?: boolean
  isPast?: boolean
  ticketLink?: string
}

export default function GalleryPage() {
  // State for UI controls
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All")
  const [activeEventFilter, setActiveEventFilter] = useState("All")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isEventsExpanded, setIsEventsExpanded] = useState(false)

  // Refs for scrolling
  const galleryRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)

  // Handle lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === "Escape") {
        setIsLightboxOpen(false)
      } else if (e.key === "ArrowRight") {
        navigateGallery("next")
      } else if (e.key === "ArrowLeft") {
        navigateGallery("prev")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, selectedImage])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLightboxOpen])

  // Sample gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "/images/landing-6.jpg",
      title: "Summer Breeze Lookbook",
      category: "lookbook",
      collection: "Summer Breeze",
      description:
        "Showcasing our Summer Breeze collection in a coastal setting, highlighting the light fabrics and vibrant colors inspired by seaside landscapes.",
      featured: true,
    },
    {
      id: 2,
      image: "/images/landing-1.jpg",
      title: "Paris Fashion Week 2025",
      category: "runway",
      collection: "Urban Nomad",
      description:
        "Our Urban Nomad collection debuted at Paris Fashion Week, featuring versatile pieces designed for the modern explorer.",
      featured: true,
    },
    {
      id: 3,
      image: "/images/landing-3.jpg",
      title: "Sustainable Essentials Campaign",
      category: "campaign",
      collection: "Sustainable Essentials",
      description:
        "A campaign highlighting our commitment to sustainability, featuring eco-friendly materials and ethical production methods.",
    },
    {
      id: 4,
      image: "/images/landing-2.jpg",
      title: "Design Studio Session",
      category: "behind-the-scenes",
      description:
        "A glimpse into our design process, showing our creative team at work developing new concepts and patterns.",
    },
    {
      id: 5,
      image: "/images/landing-7.jpg",
      title: "Autumn Palette Editorial",
      category: "lookbook",
      collection: "Autumn Palette",
      description:
        "An editorial shoot featuring our Autumn Palette collection, set against the rich colors of fall foliage.",
    },
    {
      id: 6,
      image: "/images/landing-4.jpg",
      title: "Monochrome Edit Campaign",
      category: "campaign",
      collection: "Monochrome Edit",
      description:
        "A minimalist campaign showcasing our Monochrome Edit collection, focusing on clean lines and timeless black and white pieces.",
      featured: true,
    },
    {
      id: 7,
      image: "/images/landing-5.jpg",
      title: "Milan Fashion Week 2024",
      category: "runway",
      collection: "Evening Elegance",
      description:
        "Our Evening Elegance collection on the runway at Milan Fashion Week, featuring sophisticated pieces for special occasions.",
    },
    {
      id: 8,
      image: "/images/landing-6.jpg",
      title: "Photo Shoot Preparation",
      category: "behind-the-scenes",
      description:
        "Behind the scenes of our latest photo shoot, showing the styling, makeup, and creative direction process.",
    },
    {
      id: 9,
      image: "/images/landing-1.jpg",
      title: "Winter Luxe Lookbook",
      category: "lookbook",
      collection: "Winter Luxe",
      description:
        "A lookbook featuring our Winter Luxe collection, showcasing luxurious fabrics and cozy silhouettes for the coldest months.",
    },
    {
      id: 10,
      image: "/images/landing-3.jpg",
      title: "Spring Bloom Campaign",
      category: "campaign",
      collection: "Spring Bloom",
      description:
        "A vibrant campaign for our Spring Bloom collection, capturing the essence of spring with floral motifs and light fabrics.",
    },
    {
      id: 11,
      image: "/images/landing-1.jpg",
      title: "Fabric Selection Process",
      category: "behind-the-scenes",
      description:
        "A look at our fabric selection process, showing how we choose sustainable and high-quality materials for our collections.",
    },
    {
      id: 12,
      image: "/images/landing-6.jpg",
      title: "New York Fashion Week 2024",
      category: "runway",
      collection: "Urban Nomad",
      description:
        "Our Urban Nomad collection showcased at New York Fashion Week, highlighting versatile pieces for city life.",
    },
  ]

  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      title: "Summer Collection Launch Party",
      date: "June 15, 2025",
      location: "TRYB Flagship Store, New York",
      image: "/images/landing-6.jpg",
      description:
        "Join us for the exclusive launch of our Summer Breeze collection. Enjoy refreshments, music, and be the first to shop the new pieces.",
      featured: true,
      ticketLink: "#",
    },
    {
      id: 2,
      title: "Sustainable Fashion Workshop",
      date: "July 8, 2025",
      location: "Design Studio, Los Angeles",
      image: "/images/landing-2.jpg",
      description:
        "Learn about sustainable fashion practices and participate in a hands-on workshop about eco-friendly design techniques.",
      ticketLink: "#",
    },
    {
      id: 3,
      title: "Paris Fashion Week Runway Show",
      date: "September 28, 2024",
      location: "Grand Palais, Paris",
      image: "/images/landing-1.jpg",
      description:
        "Our showcase at Paris Fashion Week, presenting the upcoming Fall/Winter collection on the prestigious runway.",
      isPast: true,
      featured: true,
    },
    {
      id: 4,
      title: "Meet the Designer: Q&A Session",
      date: "August 12, 2025",
      location: "TRYB Concept Store, Miami",
      image: "/images/landing-4.jpg",
      description:
        "An intimate Q&A session with our lead designer, discussing inspiration, creative process, and the future of TRYB FASHION.",
      ticketLink: "#",
    },
    {
      id: 5,
      title: "Charity Fashion Gala",
      date: "October 5, 2025",
      location: "Metropolitan Museum, New York",
      image: "/images/landing-5.jpg",
      description:
        "A charity gala featuring a special runway show, with proceeds going to support sustainable fashion initiatives and education.",
      featured: true,
      ticketLink: "#",
    },
    {
      id: 6,
      title: "Milan Fashion Week Presentation",
      date: "February 22, 2024",
      location: "Palazzo Reale, Milan",
      image: "/images/landing-2.jpg",
      description:
        "Our presentation at Milan Fashion Week, showcasing our Spring/Summer collection in the historic Palazzo Reale.",
      isPast: true,
    },
    {
      id: 7,
      title: "Trunk Show: Holiday Collection",
      date: "November 15, 2025",
      location: "TRYB Boutique, Chicago",
      image: "/images/landing-6.jpg",
      description:
        "A special trunk show featuring our Holiday Collection, with personal styling sessions and exclusive pieces.",
      ticketLink: "#",
    },
    {
      id: 8,
      title: "New York Fashion Week After Party",
      date: "February 12, 2024",
      location: "The Standard, New York",
      image: "/images/landing-7.jpg",
      description:
        "Celebration following our successful New York Fashion Week show, with special guests and performances.",
      isPast: true,
    },
  ]

  // Filter gallery items based on active filter
  const filteredGalleryItems =
    activeGalleryFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeGalleryFilter)

  // Filter events based on active filter
  const filteredEvents =
    activeEventFilter === "All"
      ? events
      : activeEventFilter === "Upcoming"
        ? events.filter((event) => !event.isPast)
        : events.filter((event) => event.isPast)

  // Display limited events unless expanded
  const displayedEvents = isEventsExpanded ? filteredEvents : filteredEvents.slice(0, 3)

  // Open lightbox with selected image
  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item)
    setIsLightboxOpen(true)
  }

  // Navigate through gallery in lightbox
  const navigateGallery = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = filteredGalleryItems.findIndex((item) => item.id === selectedImage.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredGalleryItems.length
    } else {
      newIndex = currentIndex === 0 ? filteredGalleryItems.length - 1 : currentIndex - 1
    }

    setSelectedImage(filteredGalleryItems[newIndex])
  }

  // Scroll to section
  const scrollToSection = (section: "gallery" | "events") => {
    if (section === "gallery" && galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (section === "events" && eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <main
      className="p-1"
      style={{
        background: "linear-gradient(to right, #ABE188 50%, #F78E69 50%)",
      }}
    >
      <div className="min-h-screen bg-white text-gray-900 rounded-md">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            {/* Top Navigation */}
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center space-x-4">
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/images/TRYBLogo.png" alt="TRYB FASHION" width={40} height={40} />
                  <span className="text-xl font-bold font-display">TRYB FASHION</span>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="hover:text-[#ABE188] transition-colors">
                  Home
                </Link>
                <Link href="/shop-page" className="hover:text-[#ABE188] transition-colors">
                  Shop
                </Link>
                <Link href="/collections" className="hover:text-[#ABE188] transition-colors">
                  Collections
                </Link>
                <Link href="/gallery" className="text-[#ABE188] font-medium">
                Gallery/Events
                </Link>
                <Link href="/about" className="hover:text-[#ABE188] transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-[#ABE188] transition-colors">
                  Contact
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search gallery..."
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
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-white py-4 border-b"
              >
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="px-4 py-2 hover:bg-gray-100">
                    Home
                  </Link>
                  <Link href="/shop-page" className="px-4 py-2 hover:bg-gray-100">
                    Shop
                  </Link>
                  <Link href="/collections" className="px-4 py-2 hover:bg-gray-100">
                    Collections
                  </Link>
                  <Link href="/gallery" className="px-4 py-2 bg-gray-100 text-[#ABE188] font-medium">
                    Gallery
                  </Link>
                  <Link href="/about" className="px-4 py-2 hover:bg-gray-100">
                    About
                  </Link>
                  <Link href="/contact" className="px-4 py-2 hover:bg-gray-100">
                    Contact
                  </Link>
                </nav>
              </motion.div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src="/images/landing-3.jpg"
            alt="Gallery & Events"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-center"
            >
              Gallery & Events
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl text-center"
            >
              Explore our visual journey through lookbooks, runway shows, and exclusive events.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4"
            >
              <button
                onClick={() => scrollToSection("gallery")}
                className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                View Gallery
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="px-6 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors"
              >
                Upcoming Events
              </button>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section ref={galleryRef} className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Gallery</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["All", "lookbook", "runway", "campaign", "behind-the-scenes"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveGalleryFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeGalleryFilter === filter ? "bg-[#ABE188] text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {filter === "behind-the-scenes"
                    ? "Behind The Scenes"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredGalleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <Search size={20} />
                        </div>
                      </div>
                    </div>

                    {item.featured && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-[#F78E69] text-white text-xs px-2 py-1 rounded">Featured</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      {item.collection && ` • ${item.collection}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Events Section */}
        <section ref={eventsRef} className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Events</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["All", "Upcoming", "Past"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveEventFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeEventFilter === filter ? "bg-[#ABE188] text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Events List */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
              {displayedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative">
                      <div className="aspect-[4/3] md:h-full relative">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {event.featured && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#F78E69] text-white text-xs px-2 py-1 rounded">Featured</span>
                        </div>
                      )}
                      {event.isPast && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium">Past Event</span>
                        </div>
                      )}
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <h3 className="text-xl font-bold mb-2 md:mb-0">{event.title}</h3>
                        {!event.isPast && event.ticketLink && (
                          <Link
                            href={event.ticketLink}
                            className="inline-flex items-center gap-1 text-[#ABE188] font-medium hover:underline"
                          >
                            Get Tickets
                            <ExternalLink size={16} />
                          </Link>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-gray-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={18} className="text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="flex gap-2">
                        {!event.isPast && event.ticketLink && (
                          <Link
                            href={event.ticketLink}
                            className="px-4 py-2 bg-[#ABE188] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors md:hidden"
                          >
                            Get Tickets
                          </Link>
                        )}
                        <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-gray-400 transition-colors flex items-center gap-1">
                          <Share2 size={16} />
                          Share
                        </button>
                        {!event.isPast && (
                          <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-gray-400 transition-colors flex items-center gap-1">
                            <Calendar size={16} />
                            Add to Calendar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {filteredEvents.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsEventsExpanded(!isEventsExpanded)}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ABE188] text-[#ABE188] rounded-full hover:bg-[#ABE188] hover:text-white transition-colors"
                >
                  {isEventsExpanded ? (
                    <>
                      Show Less
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Load More Events
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Behind the Scenes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Behind the Scenes</h2>
                <p className="text-gray-600 mb-6">
                  Get an exclusive look at what goes on behind the scenes at TRYB FASHION. From design sketches to
                  runway preparations, we invite you to explore the creative process that brings our collections to
                  life.
                </p>
                <p className="text-gray-600 mb-6">
                  Our team of talented designers, pattern makers, seamstresses, and creative directors work tirelessly
                  to create pieces that are not only beautiful but also thoughtfully crafted with attention to detail
                  and quality.
                </p>
                <button
                  onClick={() => {
                    setActiveGalleryFilter("behind-the-scenes")
                    scrollToSection("gallery")
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#ABE188] text-white rounded-full font-medium hover:bg-opacity-90 transition-colors"
                >
                  View Behind the Scenes
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/landing-6.jpg"
                    alt="Design Process"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/landing-3.jpg"
                    alt="Fitting Session"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                     src="/images/landing-1.jpg"
                    alt="Runway Preparation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                     src="/images/landing-5.jpg"
                    alt="Runway Preparation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter to receive invitations to exclusive events and be the first to see our new
                gallery content.
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

        {/* Lightbox */}
        {isLightboxOpen && selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            <button
              onClick={() => navigateGallery("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={() => navigateGallery("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            <div className="max-w-4xl w-full">
              <div className="relative">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              <div className="mt-4 text-white">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-300">
                  {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  {selectedImage.collection && ` • ${selectedImage.collection}`}
                </p>
                {selectedImage.description && <p className="mt-2 text-gray-400">{selectedImage.description}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Image src="/images/TRYBLogo.png" alt="TRYB FASHION" width={40} height={40} className="invert" />
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
                  <li>
                    <Link href="/shop-page" className="text-gray-400 hover:text-white transition-colors">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop-page" className="text-gray-400 hover:text-white transition-colors">
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop-page" className="text-gray-400 hover:text-white transition-colors">
                      Best Sellers
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop-page" className="text-gray-400 hover:text-white transition-colors">
                      Sale Items
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Help</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Shipping & Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Size Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">About</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                      Sustainability
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Terms & Privacy
                    </Link>
                  </li>
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
