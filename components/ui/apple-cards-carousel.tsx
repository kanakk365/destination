"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface CardProps {
  card: {
    category: string
    title: string
    src: string
    content: React.ReactNode
    icon?: React.ReactNode
  }
  index: number
  expandedIndex?: number
  setExpandedIndex?: (index: number | null) => void
}

export const Card = ({ card, index, expandedIndex, setExpandedIndex }: CardProps) => {
  const isExpanded = index === expandedIndex
  const cardRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const x = useMotionValue(0)
  const scale = useMotionValue(1)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isExpanded) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX / 4)
    y.set(mouseY / 4)
    scale.set(1.05)
  }

  const handleMouseLeave = () => {
    if (isExpanded) return
    x.set(0)
    y.set(0)
    scale.set(1)
  }

  const springConfig = { stiffness: 150, damping: 20 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scale, springConfig)

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative h-full w-full cursor-pointer rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden",
        "border border-black/[0.08] dark:border-white/[0.08]",
        "transition-[height] duration-500",
        isExpanded ? "h-auto" : "h-[400px] md:h-[500px]",
      )}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        zIndex: isExpanded ? 10 : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => !isExpanded && setExpandedIndex?.(index)}
      layout
    >
      {/* Close Button - Only visible when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation()
              setExpandedIndex?.(null)
            }}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200 border border-white/20"
            aria-label="Close card"
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-between p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              {card.icon && <div className="rounded-full p-2 bg-white/20 backdrop-blur-sm">{card.icon}</div>}
              <span className="text-sm font-medium text-white/80 uppercase tracking-wider">{card.category}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{card.title}</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[300px] md:h-[400px] w-full">
              <Image
                src={card.src || "/placeholder.svg"}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
                <div className="p-8 pr-16">
                  <div className="flex items-center gap-2">
                    {card.icon && <div className="rounded-full p-2 bg-white/20 backdrop-blur-sm">{card.icon}</div>}
                    <span className="text-sm font-medium text-white/80 uppercase tracking-wider">{card.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{card.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-8">{card.content}</div>
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={card.src || "/placeholder.svg"}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const Carousel = ({ items }: { items: React.ReactNode[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItemsCount, setVisibleItemsCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItemsCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItemsCount(2)
      } else {
        setVisibleItemsCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add ESC key support to close expanded cards
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expandedIndex !== null) {
        setExpandedIndex(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [expandedIndex])

  const nextSlide = () => {
    if (expandedIndex !== null) return
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + visibleItemsCount
      return nextIndex >= items.length ? 0 : nextIndex
    })
  }

  const prevSlide = () => {
    if (expandedIndex !== null) return
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - visibleItemsCount
      return nextIndex < 0 ? Math.max(0, items.length - visibleItemsCount) : nextIndex
    })
  }

  // Clone the items and add the expanded index and setter
  const itemsWithProps = React.Children.map(items, (item, index) => {
    if (React.isValidElement(item)) {
      return React.cloneElement(item, {
        expandedIndex,
        setExpandedIndex,
      })
    }
    return item
  })

  // Get visible items based on current index and visible count
  const visibleItems =
    expandedIndex !== null
      ? [itemsWithProps[expandedIndex]]
      : itemsWithProps.slice(currentIndex, currentIndex + visibleItemsCount)

  // Calculate if we can navigate
  const canGoNext = expandedIndex === null && currentIndex + visibleItemsCount < items.length
  const canGoPrev = expandedIndex === null && currentIndex > 0

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 relative">
      <div
        className={cn(
          "grid gap-4 md:gap-6 lg:gap-8",
          expandedIndex !== null
            ? "grid-cols-1"
            : visibleItemsCount === 1
              ? "grid-cols-1"
              : visibleItemsCount === 2
                ? "grid-cols-2"
                : "grid-cols-3",
        )}
      >
        {visibleItems.map((item, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      {expandedIndex === null && (
        <>
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white",
              "hover:bg-black/50 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              !canGoPrev && "opacity-50 cursor-not-allowed",
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white",
              "hover:bg-black/50 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              !canGoNext && "opacity-50 cursor-not-allowed",
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Pagination Indicators */}
      {expandedIndex === null && items.length > visibleItemsCount && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(items.length / visibleItemsCount) }).map((_, i) => {
            const isActive = i === Math.floor(currentIndex / visibleItemsCount)
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * visibleItemsCount)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isActive ? "w-6 bg-blue-500" : "bg-gray-500",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
