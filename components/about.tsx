"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

// Animated counter component with reliable animation
function Counter({ value, label, index }: { value: number; label: string; index: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value

      // Calculate duration and increment based on the value size
      const duration = Math.min(2000, Math.max(1000, end / 5))
      const incrementTime = 16 // Update every 16ms (60fps)
      const totalSteps = duration / incrementTime
      const incrementValue = end / totalSteps

      const timer = setInterval(() => {
        start += incrementValue
        setCount(Math.min(Math.floor(start), end))
        if (start >= end) clearInterval(timer)
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${
        isLightTheme
          ? "bg-gradient-to-br from-blue-500/5 to-blue-700/5 border border-blue-500/10"
          : "bg-gradient-to-br from-blue-500/10 to-blue-700/10 border border-blue-500/20"
      } backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center h-full`}
    >
      <span
        className={`text-4xl md:text-5xl lg:text-6xl font-bold ${isLightTheme ? "text-blue-600" : "text-blue-400"} mb-2`}
      >
        {count.toLocaleString()}
      </span>
      <span
        className={`text-xs md:text-sm uppercase tracking-wider ${isLightTheme ? "text-gray-600" : "text-gray-300"} text-center`}
      >
        {label}
      </span>
    </motion.div>
  )
}

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const slides = [
    {
      image: "https://i.postimg.cc/L4PY7Bzr/landingpage1.avif",
      title: "State-of-the-Art Facilities",
      description:
        "Destination KP offers comprehensive facilities designed to support a wide range of sports and activities.",
    },
    {
      image: "https://i.postimg.cc/QCC68Yhk/landingimage2.avif",
      title: "Premier Sports Complex",
      description:
        "Our mission is to provide facilities that inspire athletic excellence and promote healthy lifestyles.",
    },
    {
      image: "https://i.postimg.cc/D04qp97D/landingimage3.avif",
      title: "Community Hub",
      description: "A central location for youth sports, health, wellness, and community engagement in the region.",
    },
  ]

  const stats = [
    { value: 42, label: "ACRES" },
    { value: 7, label: "OUTDOOR PLAYING FIELDS" },
    { value: 2, label: "OUTDOOR PRACTICE FIELDS" },
    { value: 65000, label: "Sqft INDOOR FACILITY" },
    { value: 5000, label: "Sqft FITNESS CENTER" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentSlide])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 ${isLightTheme ? "bg-gray-50" : "bg-[rgb(20,20,24)]"} ${isLightTheme ? "text-gray-800" : "text-white"}`}
    >
      <div className="mb-12 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              About Destination KP
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}
          >
            Destination KP is an upcoming premier youth sports and events complex located in Kings Park, Long Island,
            New York. Scheduled to open in January 2026.
          </motion.p>
        </div>
      </div>

      {/* Full-width slider */}
      <div className="w-full mb-16">
        <div
          className="relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={currentSlide === 0}
              />
              <div
                className={`absolute inset-0 ${isLightTheme ? "bg-gradient-to-t from-black/60 via-black/20 to-transparent" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"}`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">{slides[currentSlide].title}</h3>
                  <p className="text-gray-200 text-lg md:text-xl max-w-3xl">{slides[currentSlide].description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats in individual boxes */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Counter key={index} value={stat.value} label={stat.label} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className={`${isLightTheme ? "text-gray-600" : "text-gray-300"} md:text-lg`}>
            Our mission is to provide state-of-the-art facilities that inspire athletic excellence, promote healthy
            lifestyles, and foster community connections through sports and events.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
