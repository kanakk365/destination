"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { Monitor, Calendar, Share2, Building, Users, Eye, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdvertisingPackage {
  id: string
  title: string
  price: string
  period: string
  description: string
  features: string[]
  reach: string
  icon: React.ReactNode
  image: string
  highlighted?: boolean
}

const advertisingPackages: AdvertisingPackage[] = [
  {
    id: "digital-display",
    title: "Digital Display Ads",
    price: "$2,500",
    period: "/month",
    description: "Premium digital advertising space across our platform and facilities",
    features: [
      "Website banner placements",
      "Mobile app advertisements",
      "Digital facility displays",
      "Performance analytics",
      "A/B testing included",
    ],
    reach: "50K+ monthly impressions",
    icon: <Monitor className="h-6 w-6" />,
    image: "/images/nike-ad-updated.png",
    highlighted: true,
  },
  {
    id: "event-sponsorship",
    title: "Event Sponsorship",
    price: "$5,000",
    period: "/event",
    description: "Sponsor our premier sporting events and tournaments",
    features: [
      "Logo on event materials",
      "Booth space at venue",
      "PA announcements",
      "Social media mentions",
      "Photo opportunities",
    ],
    reach: "1K+ event attendees",
    icon: <Calendar className="h-6 w-6" />,
    image: "/images/events1.webp",
  },
  {
    id: "social-media",
    title: "Social Media Promotion",
    price: "$1,200",
    period: "/month",
    description: "Comprehensive social media advertising across all our channels",
    features: [
      "Instagram story features",
      "Facebook post promotions",
      "YouTube video integrations",
      "Influencer partnerships",
      "Content creation support",
    ],
    reach: "25K+ social followers",
    icon: <Share2 className="h-6 w-6" />,
    image: "/images/ysn-streaming.jpeg",
  },
  {
    id: "facility-branding",
    title: "Facility Branding",
    price: "$10,000",
    period: "/year",
    description: "Year-round branding opportunities throughout our sports complex",
    features: [
      "Permanent signage placement",
      "Court/field naming rights",
      "Locker room branding",
      "Equipment sponsorship",
      "VIP hospitality access",
    ],
    reach: "100K+ annual visitors",
    icon: <Building className="h-6 w-6" />,
    image: "/images/battlelounge-landing.jpeg",
  },
]

export default function AdvertisingSection() {
  const [selectedPackage, setSelectedPackage] = useState(advertisingPackages[0])
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  return (
    <section
      ref={ref}
      className={`py-20 ${
        isLightTheme
          ? "bg-gradient-to-b from-gray-50 to-white"
          : "bg-gradient-to-b from-[rgb(18,18,22)] to-[rgb(22,22,26)]"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Advertising
            </span>{" "}
            <span className={isLightTheme ? "text-gray-800" : "text-white"}>Opportunities</span>
          </h1>
          <p className={`text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"} max-w-3xl mx-auto`}>
            Partner with DestinationKP to reach thousands of athletes, families, and sports enthusiasts. Choose from our
            premium advertising packages designed to maximize your brand exposure.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Package Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {advertisingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  selectedPackage.id === pkg.id
                    ? isLightTheme
                      ? "bg-white border-purple-200 shadow-lg ring-2 ring-purple-500/20"
                      : "bg-gray-800/50 border-purple-500/30 shadow-lg ring-2 ring-purple-500/20"
                    : isLightTheme
                      ? "bg-white/50 border-gray-200 hover:border-purple-200 hover:shadow-md"
                      : "bg-gray-800/20 border-gray-700 hover:border-purple-500/30 hover:shadow-md"
                } ${pkg.highlighted ? "ring-2 ring-blue-500/20" : ""}`}
                onClick={() => setSelectedPackage(pkg)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedPackage.id === pkg.id
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : isLightTheme
                            ? "bg-gray-100 text-gray-600"
                            : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {pkg.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                        {pkg.title}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                          {pkg.price}
                        </span>
                        <span className={`text-sm ${isLightTheme ? "text-gray-500" : "text-gray-400"}`}>
                          {pkg.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className={`text-sm ${isLightTheme ? "text-gray-600" : "text-gray-300"} mb-4`}>{pkg.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Users className={`h-4 w-4 ${isLightTheme ? "text-purple-500" : "text-purple-400"}`} />
                  <span className={`text-sm font-medium ${isLightTheme ? "text-purple-600" : "text-purple-400"}`}>
                    {pkg.reach}
                  </span>
                </div>

                {selectedPackage.id === pkg.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 ${isLightTheme ? "text-green-500" : "text-green-400"}`} />
                          <span className={`text-sm ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Image Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={selectedPackage.image || "/placeholder.svg"}
                alt={selectedPackage.title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />

              {/* Overlay with package info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating info card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800">{selectedPackage.title}</h4>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">{selectedPackage.reach}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedPackage.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-purple-600">{selectedPackage.price}</span>
                      <span className="text-sm text-gray-500">{selectedPackage.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">High ROI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price tag */}
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
                  <div className="text-lg font-bold">{selectedPackage.price}</div>
                  <div className="text-xs opacity-90">{selectedPackage.period}</div>
                </div>
              </div>
            </div>

            {/* Mobile navigation dots */}
            <div className="flex justify-center gap-2 mt-6 lg:hidden">
              {advertisingPackages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    advertisingPackages.findIndex((pkg) => pkg.id === selectedPackage.id) === index
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 w-6"
                      : isLightTheme
                        ? "bg-gray-300"
                        : "bg-gray-600"
                  }`}
                  onClick={() => setSelectedPackage(advertisingPackages[index])}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div
            className={`${
              isLightTheme
                ? "bg-white/80 backdrop-blur-lg border border-gray-200"
                : "bg-gray-800/40 backdrop-blur-lg border border-gray-700"
            } rounded-2xl p-8 md:p-12 max-w-4xl mx-auto`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className={isLightTheme ? "text-gray-800" : "text-white"}>Ready to Partner with</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                DestinationKP?
              </span>
            </h2>
            <p className={`text-lg ${isLightTheme ? "text-gray-600" : "text-gray-300"} mb-8 max-w-2xl mx-auto`}>
              Join leading brands who trust us to deliver exceptional results. Our team will work with you to create a
              custom advertising solution that meets your specific goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/facilities">
                <Button
                  variant="outline"
                  className={`px-8 py-3 text-lg ${
                    isLightTheme
                      ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  View Our Facilities
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
