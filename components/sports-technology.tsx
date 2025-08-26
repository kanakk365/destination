"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import { Gamepad2, Radio, Smartphone, Video, Users, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export default function SportsTechnology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState(0)
  // Track the currently "active" point (last hovered). Initialize to 0 so first point shows by default.
  const [hoveredPoint, setHoveredPoint] = useState<number>(0)
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  // Website URLs for each technology
  const websiteUrls = [
    "https://battlelounge.io/", // Battle Lounge
    "https://ysn.tv/", // YSN
    "https://new.playerhub.io/", // Connected Athlete
    "https://myreels.co/", // Reels
    "https://www.playerhub.io/", // PlayerHub
  ]

  // Custom color gradients
  const customGradients = [
    "from-[#b55fc2] to-[#7b53c6]", // Battle Lounge - purple/magenta to medium purple
    "from-[#0037c0] to-[#4755bb]", // YSN - deep blue to blue-purple
    "from-[#48c4bc] to-[#4755bb]", // Connected Athlete - teal to blue-purple
    "from-[#7b53c6] to-[#0037c0]", // Reels - medium purple to deep blue
    "from-[#b55fc2] to-[#48c4bc]", // PlayerHub - purple/magenta to teal
  ]

  // Technology options with sub-points and multiple images
  const technologyItems = [
    {
      title: "Battle's Lounge",
      description:
        "Battle Lounge is a hybrid esports tournament platform that merges in-person and online gameplay, allowing youth athletes and gamers to compete in popular video games at our facility's dedicated mini esports arena or remotely through our digital infrastructure. It bridges the growing overlap between traditional youth sports and competitive gaming.",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: customGradients[0],
      points: [
        {
          title: "In-Person & Online Tournaments",
          description:
            "Host and participate in real-time esports events from anywhere. Our platform seamlessly connects players whether they're competing from our facility or remotely.",
          image: "/images/bl.png",
        },
        {
          title: "Tournament Management System",
          description:
            "Complete tournament lifecycle management with registration, brackets, player tracking, and real-time updates. Professional tournament organization made simple.",
          image: "/images/bl2.png",
        },
        {
          title: "Personal Gaming Dashboard",
          description:
            "Track your tournament history, upcoming events, and gaming achievements. Comprehensive player profiles with statistics and performance analytics.",
          image: "/images/bl3.png",
        },
      ],
    },
    {
      title: "YSN",
      description:
        "YSN is a live-streaming and media platform that captures every game, event, and showcase across our facility using high-definition cameras on all indoor and outdoor fields. It offers families, friends, and recruiters a front-row seat to every moment, from anywhere in the world.",
      icon: <Radio className="w-6 h-6" />,
      color: customGradients[1],
      points: [
        {
          title: "Professional Live Streaming",
          description:
            "Broadcast high-quality live streams of matches and events with professional presentation, sponsor integration, and seamless viewing experience across all devices.",
          image: "/images/ysn-main-stream.jpeg",
        },
        {
          title: "Interactive Viewing Experience",
          description:
            "Engage with live chat, view multiple camera angles, and access upcoming match schedules. Real-time community interaction enhances the viewing experience.",
          image: "/images/ysn2.png",
        },
        {
          title: "Team Management Platform",
          description:
            "Comprehensive team administration with player rosters, match history, statistics tracking, and organizational tools for coaches and team managers.",
          image: "/images/ysn3.png",
        },
      ],
    },
    {
      title: "Connected Athlete",
      description:
        "Connected Athlete is an AI-powered performance and health analytics platform that uses computer vision to analyze athlete movements, compare them to elite professionals, and generate actionable performance reports. It also identifies potential injury risks and automatically shares data with on-site physical therapists and medical partners for proactive care.",
      icon: <Smartphone className="w-6 h-6" />,
      color: customGradients[2],
      points: [
        {
          title: "AI Movement Analysis",
          description:
            "Breaks down form and technique using video data and pro benchmarks. Advanced computer vision technology analyzes every movement for optimal performance.",
          image: "/images/connected-athlete.webp",
        },
        {
          title: "Injury Risk Detection",
          description:
            "Spots inefficiencies and flags physical issues before they become injuries. Proactive identification of potential problems through movement pattern analysis.",
          image: "/images/ca2.png",
        },
        {
          title: "Integrated Recovery Loop",
          description:
            "Syncs with physical therapists and health systems to deliver personalized improvement plans. Seamless data sharing for comprehensive athlete care.",
          image: "/images/connected-athlete-profile.png",
        },
      ],
    },
    {
      title: "Reels",
      description:
        "Professional video production service creating highlight reels and promotional content for athletes.",
      icon: <Video className="w-6 h-6" />,
      color: customGradients[3],
      points: [
        {
          title: "Recruitment Videos",
          description:
            "Professional recruitment videos designed to showcase athlete skills for college and professional scouts.",
          image: "/images/myreels-football.jpeg",
        },
        {
          title: "Social Media Content",
          description:
            "Optimized video content for social media platforms to build athlete personal brands and following.",
          image: "/images/coach-dashboard.png",
        },
        {
          title: "Game Highlights",
          description: "Professional game highlight compilation with cinematic editing and music for maximum impact.",
          image: "/images/player-dashboard.png",
        },
      ],
    },
    {
      title: "PlayerHub",
      description:
        "PlayerHub is the centralized digital profile for every athlete in our ecosystem. It allows athletes to manage their schedules, track stats, register for events, upload highlights, and build recruitment-ready profiles, serving as the digital backbone for youth sports development.",
      icon: <Users className="w-6 h-6" />,
      color: customGradients[4],
      points: [
        {
          title: "Athlete Profiles & Stats",
          description:
            "Track performance, growth, and milestones across seasons. Comprehensive data visualization and progress tracking for athletes of all levels.",
          image: "/images/playhub-profile-and-status-2.jpg",
        },
        {
          title: "Event & Tournament Management",
          description:
            "Register, schedule, and stay updated on upcoming games and showcases. Seamless integration with facility calendars and team management systems.",
          image: "/images/playhub-2.jpg",
        },
        {
          title: "Recruitment & Gear Hub",
          description:
            "Showcase highlights, connect with scouts, and purchase sport-specific gear. One-stop platform for athlete development and exposure opportunities.",
          image: "/images/playerhub-analytics.png",
        },
      ],
    },
  ]

  const getCurrentImage = () => technologyItems[activeTab].points[hoveredPoint].image

  const getCurrentPointInfo = () => technologyItems[activeTab].points[hoveredPoint]

  return (
    <section
      id="sports-technology"
      className={`py-12 ${isLightTheme ? "bg-white" : "bg-[rgb(16,16,20)]"} ${isLightTheme ? "text-gray-800" : "text-white"} overflow-hidden`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b55fc2] to-[#0037c0]">
              Leading Global Youth Sports Technology at DKP
            </span>
          </h2>
          <p className={`text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"} max-w-3xl mx-auto`}>
            Cutting-edge digital platforms and technologies designed to enhance the youth sports experience, provide
            exposure, and develop athletes.
          </p>
        </motion.div>

        {/* Horizontal Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {technologyItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index)
                setHoveredPoint(0) // Reset to first point when switching tabs
              }}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-500 border-2",
                "focus:outline-none focus:ring-0 active:scale-95",
                activeTab === index
                  ? `bg-gradient-to-r ${item.color} text-white border-transparent shadow-lg`
                  : isLightTheme
                    ? "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md focus:border-gray-400"
                    : "bg-gray-900/50 text-gray-300 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 focus:border-gray-500",
              )}
            >
              <div
                className={cn(
                  "transition-colors duration-300",
                  activeTab === index ? "text-white" : isLightTheme ? "text-gray-600" : "text-gray-400",
                )}
              >
                {item.icon}
              </div>
              <span className="text-sm md:text-base">{item.title}</span>
            </button>
          ))}
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Points Section - Left Side */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <h3 className={`text-2xl font-bold mb-2 ${isLightTheme ? "text-gray-900" : "text-white"}`}>
                <a href={websiteUrls[activeTab]} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {technologyItems[activeTab].title}
                </a>
              </h3>
              <p className={`text-lg ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
                {technologyItems[activeTab].description}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                {technologyItems[activeTab].points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-500 border-2",
                      isLightTheme
                        ? "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                        : "bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50",
                    )}
                    onMouseEnter={() => setHoveredPoint(index)}
                    // Intentionally keep last hovered image; no onMouseLeave reset
                  >
                    <h4 className={`font-semibold mb-2 ${isLightTheme ? "text-gray-900" : "text-white"}`}>
                      <a
                        href={websiteUrls[activeTab]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {point.title}
                      </a>
                    </h4>
                    <p className={`text-sm ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>{point.description}</p>
                    {hoveredPoint === index && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.6 }}
                        className={`h-1 bg-gradient-to-r ${technologyItems[activeTab].color} mt-3 rounded-full`}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Visit Site Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-8"
            >
              <a
                href={websiteUrls[activeTab]}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                  "bg-gradient-to-r shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
                  `${technologyItems[activeTab].color} text-white w-full md:w-auto`,
                )}
              >
                <span>Visit Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Image Display - Right Side */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${hoveredPoint}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="relative h-full w-full">
                  {/* Main image - Clean without overlays */}
                  <Image
                    src={getCurrentImage() || "/placeholder.svg"}
                    alt={getCurrentPointInfo().title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={activeTab === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
