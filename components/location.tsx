"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import { Car, Train, Plane, Building, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import RouteMap from "@/components/map/route-map"

export default function Location() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeCard, setActiveCard] = useState(0)
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  // Add a new state to track if map view is active for the current card
  const [showMapView, setShowMapView] = useState(false)

  // Add a function to toggle map view
  const toggleMapView = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card selection when clicking view details
    setShowMapView(!showMapView)
  }

  // Helper function to get coordinates based on item title
  const getCoordinates = (title: string) => {
    const kingspark = { lng: -73.2457, lat: 40.8865, name: "DestinationKP" } // DestinationKP location

    const origins = {
      "Proximity to NYC": { lng: -74.006, lat: 40.7128, name: "Manhattan, NYC" },
      "Airport Access": { lng: -73.7781, lat: 40.6413, name: "JFK Airport" },
      "Train Station": { lng: -73.2261, lat: 40.8858, name: "Kings Park LIRR Station" }, // Actual train station location
      "Highway Access": { lng: -73.4851, lat: 40.7753, name: "LIE Highway Access" },
    }

    const origin = origins[title as keyof typeof origins] || { lng: -73.2457, lat: 40.8865, name: "Long Island" }

    return {
      origin,
      destination: kingspark,
    }
  }

  // Helper function to get custom zoom level for specific cards
  const getCustomZoom = (title: string) => {
    const zoomLevels = {
      "Train Station": 14, // Higher zoom for train station since it's close
    }
    return zoomLevels[title as keyof typeof zoomLevels]
  }

  // Transportation options with images
  const transportItems = [
    {
      title: "Proximity to NYC",
      description:
        "Just 36 miles from New York City's midtown tunnel, DestinationKP is a short drive from one of the largest and most visited cities in the world.",
      icon: <Building className="w-5 h-5 text-purple-400" />,
      meta: "36 miles",
      tags: ["NYC", "Midtown"],
      image: "/images/nyc.jpeg",
      imageAlt: "New York City skyline at night with Empire State Building",
      color: "from-purple-600/20 to-purple-400/20",
    },
    {
      title: "Airport Access",
      description:
        "DestinationKP is located just 40 miles from New York's two largest airports, JFK and Laguardia. It is also just 13 miles from the regional airport, Long Island MacArthur Airport in Islip.",
      icon: <Plane className="w-5 h-5 text-cyan-400" />,
      meta: "3 airports nearby",
      tags: ["JFK", "LaGuardia", "MacArthur"],
      image: "/images/jfk.webp",
      imageAlt: "JFK Airport terminal with sunset in the background",
      color: "from-cyan-600/20 to-cyan-400/20",
    },
    {
      title: "Train Station",
      description:
        "The Kings Park Long Island Rail Road station is located just two miles from DestinationKP, making it an easy commute for any travelers without a car.",
      icon: <Train className="w-5 h-5 text-green-400" />,
      meta: "2 miles away",
      tags: ["LIRR", "Public Transit"],
      image: "/images/train.jpeg",
      imageAlt: "Long Island Rail Road train on tracks",
      color: "from-green-600/20 to-green-400/20",
    },
    {
      title: "Highway Access",
      description:
        "DestinationKP is located just north of the Long Island Expressway (I-495) and the Northern State Parkway. One mile off the Sagtikos Parkway. Easily accessible to almost every town on Long Island.",
      icon: <Car className="w-5 h-5 text-blue-400" />,
      status: "Easy Access",
      tags: ["I-495", "Northern State", "Sagtikos"],
      image: "/images/highway.jpeg",
      imageAlt: "Highway with traffic at sunset with an orange sky",
      color: "from-blue-600/20 to-blue-400/20",
    },
  ]

  return (
    <section
      id="location"
      className={`py-12 ${isLightTheme ? "bg-white" : "bg-[rgb(16,16,20)]"} ${isLightTheme ? "text-gray-800" : "text-white"} overflow-hidden`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Location & Accessibility
            </span>
          </h2>
          <p className={`text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"} max-w-3xl mx-auto`}>
            Strategically located in Long Island, New York, one of the largest hubs for youth sports in the United
            States.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Cards - Left Side */}
          <div className="grid grid-cols-1 gap-3 lg:pr-6">
            {transportItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={cn(
                  "relative p-4 rounded-xl transition-all duration-300 cursor-pointer w-full group",
                  isLightTheme
                    ? `border border-gray-200 ${activeCard === index ? `bg-gradient-to-r ${item.color}` : "bg-white"}`
                    : `border border-gray-800 ${activeCard === index ? `bg-gradient-to-r ${item.color}` : "bg-gray-900/30"}`,
                )}
                onClick={() => {
                  setActiveCard(index)
                  setShowMapView(false) // Reset map view when switching cards
                }}
                role="button"
                aria-pressed={activeCard === index}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveCard(index)
                    setShowMapView(false)
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "p-2 rounded-full transition-all duration-300",
                      activeCard === index
                        ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30"
                        : isLightTheme
                          ? "bg-gray-100"
                          : "bg-gray-800",
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-xl font-semibold ${isLightTheme ? "text-gray-800" : "text-white"} mb-2`}>
                        {item.title}
                      </h3>
                      {item.meta && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">{item.meta}</span>
                      )}
                    </div>
                    <p className={`text-sm ${isLightTheme ? "text-gray-600" : "text-gray-300"} mb-2 line-clamp-2`}>
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded-md ${isLightTheme ? "bg-gray-100 text-gray-600" : "bg-gray-800 text-gray-300"}`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {activeCard === index && (
                        <div
                          onClick={toggleMapView}
                          className={`flex items-center text-xs font-medium cursor-pointer ${
                            showMapView ? "text-blue-500" : isLightTheme ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {showMapView ? "Show image" : "View route"}
                          <Map className={`w-4 h-4 ml-1 ${showMapView ? "text-blue-500" : ""}`} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {activeCard === index && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Image/Map Display - Right Side */}
          <div className="relative h-full min-h-[500px] flex items-center justify-center sticky top-24 lg:pl-6">
            <AnimatePresence mode="wait">
              {transportItems.map(
                (item, index) =>
                  activeCard === index && (
                    <motion.div
                      key={`${index}-${showMapView ? "map" : "image"}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full rounded-xl overflow-hidden shadow-xl"
                    >
                      {showMapView ? (
                        // Dynamic Route Map View
                        <RouteMap
                          origin={getCoordinates(item.title).origin}
                          destination={getCoordinates(item.title).destination}
                          title={item.title}
                          icon={item.icon}
                          tags={item.tags}
                          meta={item.meta}
                          isDark={!isLightTheme}
                          customZoom={getCustomZoom(item.title)}
                        />
                      ) : (
                        // Image View
                        <div className="relative h-full w-full">
                          {/* Main image */}
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                          />

                          {/* Overlay with gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-overlay`} />

                          {/* Floating elements */}
                          <div className="absolute inset-0">
                            {/* Title at the top center */}
                            <motion.div
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.5 }}
                              className="absolute top-4 left-0 right-0 flex justify-center"
                            >
                              <div className="bg-black/50 backdrop-blur-md rounded-xl p-2 inline-block">
                                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                              </div>
                            </motion.div>

                            {/* Floating icon */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full"
                            >
                              <div className="text-2xl">{item.icon}</div>
                            </motion.div>

                            {/* Floating tag */}
                            {item.tags && item.tags[0] && (
                              <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute top-6 left-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg"
                              >
                                <span className="text-sm font-bold text-white">#{item.tags[0]}</span>
                              </motion.div>
                            )}

                            {/* Floating info card */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                              className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-gray-800"
                            >
                              <p className="text-gray-300 text-xs">
                                {item.meta || "350 Old Northport Road, Kings Park, NY"}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          {/* Mobile navigation dots */}
          <div className="lg:hidden flex justify-center gap-2 mt-4">
            {transportItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeCard === index
                    ? "w-6 bg-gradient-to-r from-purple-600 to-blue-600"
                    : isLightTheme
                      ? "bg-gray-300"
                      : "bg-gray-500",
                )}
                aria-label={`View ${transportItems[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
