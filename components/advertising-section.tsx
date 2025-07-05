"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import {
  Monitor,
  Building,
  Eye,
  TrendingUp,
  ArrowRight,
  MapPin,
  Lightbulb,
  Flag,
  Target,
  ShoppingCart,
  Tv,
  Smartphone,
  Video,
  Utensils,
  Trophy,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdvertisingOption {
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

const physicalOptions: AdvertisingOption[] = [
  {
    id: "billboards",
    title: "Bill Boards",
    price: "$8,000",
    period: "/month",
    description: "3 strategic billboard locations on main driving routes to the facility",
    features: [
      "Prime visibility on approach roads",
      "High-traffic exposure",
      "Weather-resistant materials",
      "Professional installation",
      "Monthly design updates available",
    ],
    reach: "75K+ daily drivers",
    icon: <MapPin className="h-6 w-6" />,
    image: "/images/nike-adventure-ad.jpeg",
    highlighted: true,
  },
  {
    id: "light-pole-signs",
    title: "Light Pole Signs",
    price: "$1,500",
    period: "/month",
    description: "Multiple light pole advertising signs throughout the facility parking areas",
    features: [
      "Strategic parking lot placement",
      "LED illuminated options",
      "Double-sided visibility",
      "Weather-resistant design",
      "Easy content updates",
    ],
    reach: "50K+ monthly visitors",
    icon: <Lightbulb className="h-6 w-6" />,
    image: "/images/battlelounge-landing.jpeg",
  },
  {
    id: "field-banners",
    title: "Field and Court Banners",
    price: "$3,000",
    period: "/month",
    description: "Premium banner placement around all sports fields and courts",
    features: [
      "Perimeter field positioning",
      "High-visibility during games",
      "Custom sizing available",
      "Tournament exposure",
      "Photo/video opportunities",
    ],
    reach: "25K+ game attendees",
    icon: <Flag className="h-6 w-6" />,
    image: "/images/events1.webp",
  },
  {
    id: "field-logos",
    title: "Field Logos",
    price: "$5,000",
    period: "/month",
    description: "Logo placement on 7 premium sports fields - sidelines and corners available",
    features: [
      "Center field logo placement",
      "Sideline positioning options",
      "Corner logo opportunities",
      "Professional field painting",
      "Tournament visibility",
    ],
    reach: "30K+ players & spectators",
    icon: <Target className="h-6 w-6" />,
    image: "/images/battlelounge-games.jpeg",
  },
  {
    id: "concession-advertising",
    title: "Concession Stand Advertising",
    price: "$2,000",
    period: "/month",
    description: "Banner advertising between food trucks and concession areas",
    features: [
      "High-traffic food areas",
      "Multiple banner locations",
      "Peak meal time exposure",
      "Family-friendly positioning",
      "Event day premium placement",
    ],
    reach: "40K+ food service customers",
    icon: <ShoppingCart className="h-6 w-6" />,
    image: "/images/nike-ad-updated.png",
  },
  {
    id: "building-screen",
    title: "Building Side Screen",
    price: "$12,000",
    period: "/month",
    description: "Large digital screen on building side with rotating advertisements",
    features: [
      "Digital rotating content",
      "High-resolution display",
      "Remote content management",
      "Weather-resistant technology",
      "Prime building placement",
    ],
    reach: "100K+ monthly impressions",
    icon: <Tv className="h-6 w-6" />,
    image: "/images/ysn-streaming.jpeg",
  },
  {
    id: "commemorative-bricks",
    title: "Commemorative Bricks",
    price: "Contact",
    period: "for pricing",
    description: "Large and small commemorative bricks - permanent brand presence",
    features: [
      "Permanent installation",
      "Large and small options",
      "High-traffic walkway placement",
      "Legacy brand presence",
      "Custom engraving available",
    ],
    reach: "Permanent visibility",
    icon: <Building className="h-6 w-6" />,
    image: "/images/battlelounge-dashboard.jpeg",
  },
]

const digitalOptions: AdvertisingOption[] = [
  {
    id: "digital-signage",
    title: "Digital Signage (Identify Locations)",
    price: "$3,500",
    period: "/month",
    description: "Strategic digital signage placement throughout the facility",
    features: [
      "High-traffic location placement",
      "Dynamic content rotation",
      "Remote content management",
      "Real-time updates",
      "Multiple screen network",
    ],
    reach: "80K+ monthly impressions",
    icon: <Monitor className="h-6 w-6" />,
    image: "/images/nike-ad-updated.png",
    highlighted: true,
  },
  {
    id: "concession-stand-screens",
    title: "Concession Stand Screens",
    price: "$2,800",
    period: "/month",
    description: "Digital screens at concession stand locations",
    features: [
      "Point-of-sale visibility",
      "Menu integration options",
      "Peak dining hour exposure",
      "Family audience targeting",
      "Event day premium rates",
    ],
    reach: "45K+ food service customers",
    icon: <Utensils className="h-6 w-6" />,
    image: "/images/battlelounge-landing.jpeg",
  },
  {
    id: "food-truck-screens",
    title: "Food Truck Screens",
    price: "$1,800",
    period: "/month",
    description: "Mobile digital advertising on food truck screens",
    features: [
      "Mobile advertising platform",
      "Event-based positioning",
      "High-engagement audience",
      "Flexible scheduling",
      "Multi-location exposure",
    ],
    reach: "25K+ food truck customers",
    icon: <ShoppingCart className="h-6 w-6" />,
    image: "/images/nike-adventure-ad.jpeg",
  },
  {
    id: "food-court-screens",
    title: "Food Court Screens",
    price: "$3,200",
    period: "/month",
    description: "Large format screens in food court dining areas",
    features: [
      "Central dining area placement",
      "Extended viewing time",
      "Family-friendly content",
      "Peak meal hour exposure",
      "Tournament day premium",
    ],
    reach: "35K+ dining customers",
    icon: <Utensils className="h-6 w-6" />,
    image: "/images/events1.webp",
  },
  {
    id: "scoreboards",
    title: "Score Boards",
    price: "$4,500",
    period: "/month",
    description: "Digital advertising integration with game scoreboards",
    features: [
      "Game-time visibility",
      "Player and spectator exposure",
      "Tournament integration",
      "Real-time content updates",
      "Multi-field coverage",
    ],
    reach: "50K+ game participants",
    icon: <Trophy className="h-6 w-6" />,
    image: "/images/battlelounge-games.jpeg",
  },
  {
    id: "app-screens",
    title: "App Screens",
    price: "$2,200",
    period: "/month",
    description: "In-app advertising across mobile applications",
    features: [
      "Mobile app integration",
      "User engagement tracking",
      "Push notification support",
      "Event-based targeting",
      "Analytics dashboard",
    ],
    reach: "20K+ app users",
    icon: <Smartphone className="h-6 w-6" />,
    image: "/images/connected-athlete-profile.png",
  },
  {
    id: "website-screens",
    title: "Web Site Screens",
    price: "$2,500",
    period: "/month",
    description: "Website banner and display advertising",
    features: [
      "Homepage banner placement",
      "Targeted page positioning",
      "Click-through tracking",
      "A/B testing support",
      "Mobile responsive ads",
    ],
    reach: "50K+ website visitors",
    icon: <Monitor className="h-6 w-6" />,
    image: "/images/connected-athlete-dashboard.png",
  },
  {
    id: "battle-lounge",
    title: "Battle Lounge",
    price: "$3,800",
    period: "/month",
    description: "Gaming lounge digital advertising integration",
    features: [
      "Gaming audience targeting",
      "Screen integration during gameplay",
      "Tournament sponsorship",
      "Esports event promotion",
      "Youth demographic reach",
    ],
    reach: "15K+ gaming enthusiasts",
    icon: <Video className="h-6 w-6" />,
    image: "/images/battlelounge-dashboard.jpeg",
  },
  {
    id: "ysn-overlays",
    title: "YSN – Web Site, Next to Viewer, Beginning of Game, Half Time, Field Overlays",
    price: "$5,500",
    period: "/month",
    description: "Comprehensive YSN streaming platform advertising package",
    features: [
      "Live stream integration",
      "Game broadcast overlays",
      "Half-time sponsorship",
      "Viewer sidebar placement",
      "Multi-platform distribution",
    ],
    reach: "30K+ stream viewers",
    icon: <Video className="h-6 w-6" />,
    image: "/images/ysn-streaming.jpeg",
  },
  {
    id: "reels",
    title: "Reels",
    price: "$2,800",
    period: "/month",
    description: "Short-form video content advertising integration",
    features: [
      "Social media reel integration",
      "Viral content potential",
      "Youth audience targeting",
      "Multi-platform distribution",
      "Engagement analytics",
    ],
    reach: "40K+ social media reach",
    icon: <Play className="h-6 w-6" />,
    image: "/images/myreels-football.jpeg",
  },
]

interface SectionProps {
  title: string
  options: AdvertisingOption[]
  selectedOption: AdvertisingOption
  onOptionSelect: (option: AdvertisingOption) => void
  isInView: boolean
  isLightTheme: boolean
}

function AdvertisingOptionsSection({
  title,
  options,
  selectedOption,
  onOptionSelect,
  isInView,
  isLightTheme,
}: SectionProps) {
  return (
    <div className="mb-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">{title}</span>
        </h2>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Option Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                selectedOption.id === option.id
                  ? isLightTheme
                    ? "bg-white border-purple-200 shadow-lg ring-2 ring-purple-500/20"
                    : "bg-gray-800/50 border-purple-500/30 shadow-lg ring-2 ring-purple-500/20"
                  : isLightTheme
                    ? "bg-white/50 border-gray-200 hover:border-purple-200 hover:shadow-md"
                    : "bg-gray-800/20 border-gray-700 hover:border-purple-500/30 hover:shadow-md"
              } ${option.highlighted ? "ring-2 ring-blue-500/20" : ""}`}
              onClick={() => onOptionSelect(option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.highlighted && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className={`text-xl font-bold ${isLightTheme ? "text-gray-800" : "text-white"}`}>{option.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side - Image Display */}
        <motion.div
          key={selectedOption.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-24"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={selectedOption.image || "/placeholder.svg"}
              alt={selectedOption.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />

            {/* Overlay with option info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating info card */}
            {/* <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-800">{selectedOption.title}</h4>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">{selectedOption.reach}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{selectedOption.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-purple-600">{selectedOption.price}</span>
                    <span className="text-sm text-gray-500">{selectedOption.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">High ROI</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Price tag */}
            {/* <div className="absolute top-6 right-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
                <div className="text-lg font-bold">{selectedOption.price}</div>
                <div className="text-xs opacity-90">{selectedOption.period}</div>
              </div>
            </div> */}
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center gap-2 mt-6 lg:hidden">
            {options.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  options.findIndex((opt) => opt.id === selectedOption.id) === index
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 w-6"
                    : isLightTheme
                      ? "bg-gray-300"
                      : "bg-gray-600"
                }`}
                onClick={() => onOptionSelect(options[index])}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function AdvertisingSection() {
  const [selectedPhysicalOption, setSelectedPhysicalOption] = useState(physicalOptions[0])
  const [selectedDigitalOption, setSelectedDigitalOption] = useState(digitalOptions[0])
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
            Attract new customers and elevate your brand with the DKP community by utilizing our advertising solutions.

          </p>
        </motion.div>

        {/* Physical Options Section */}
        <AdvertisingOptionsSection
          title="Physical Options"
          options={physicalOptions}
          selectedOption={selectedPhysicalOption}
          onOptionSelect={setSelectedPhysicalOption}
          isInView={isInView}
          isLightTheme={isLightTheme}
        />

        {/* Digital Options Section */}
        <AdvertisingOptionsSection
          title="Digital Options"
          options={digitalOptions}
          selectedOption={selectedDigitalOption}
          onOptionSelect={setSelectedDigitalOption}
          isInView={isInView}
          isLightTheme={isLightTheme}
        />

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
