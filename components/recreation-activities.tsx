"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Waves, ClubIcon as GolfIcon, Palmtree, Mountain, UtensilsCrossed, Ticket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function RecreationActivities() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const activities = [
    {
      title: "Beaches",
      description:
        "Long Island is home to some of the most beautiful beaches on the East Coast. From Jones Beach to Robert Moses State Park, enjoy miles of pristine shoreline, perfect for swimming, sunbathing, and water sports.",
      icon: <Waves className="h-10 w-10 text-blue-500 dark:text-blue-400" />,
      image: "https://i.postimg.cc/FsZBySnL/beaches.avif",
    },
    {
      title: "Golf Courses",
      description:
        "With over 100 courses, Long Island is a golfer's paradise. From public courses to exclusive country clubs, experience world-class golfing surrounded by stunning landscapes and challenging terrains.",
      icon: <GolfIcon className="h-10 w-10 text-green-500 dark:text-green-400" />,
      image: "https://i.postimg.cc/76898PW4/golf.avif",
    },
    {
      title: "Amusement Parks",
      description:
        "Thrill-seekers will love Long Island's amusement parks. Adventureland in Farmingdale offers rides, games, and entertainment for all ages, while Splish Splash Water Park provides cooling fun during summer months.",
      icon: <Ticket className="h-10 w-10 text-red-500 dark:text-red-400" />,
      image: "https://i.postimg.cc/9Mhdg8DF/amusment.avif",
    },
    {
      title: "Parks & Nature Preserves",
      description:
        "Explore Long Island's natural beauty through its numerous parks and preserves. Caumsett State Historic Park and Connetquot River State Park offer hiking trails, wildlife viewing, and peaceful natural settings.",
      icon: <Palmtree className="h-10 w-10 text-emerald-500 dark:text-emerald-400" />,
      image: "https://i.postimg.cc/1XYNSJ3F/parks.webp",
    },
    {
      title: "Wineries & Breweries",
      description:
        "Long Island's North Fork is renowned for its vineyards and wineries. Take a tour of the wine country or visit one of the many craft breweries that have emerged across Nassau and Suffolk counties.",
      icon: <UtensilsCrossed className="h-10 w-10 text-purple-500 dark:text-purple-400" />,
      image: "https://i.postimg.cc/xTwcPkJ9/Winchester-Breweries-and-Wineries.webp",
    },
    {
      title: "Historic Sites",
      description:
        "Discover Long Island's rich history through its many historic sites and museums. Visit Sagamore Hill, Theodore Roosevelt's summer home, or explore the Gold Coast mansions that inspired 'The Great Gatsby'.",
      icon: <Mountain className="h-10 w-10 text-amber-500 dark:text-amber-400" />,
      image: "https://i.postimg.cc/wvMqzHyW/Statue-of-Liberty-e1632495792514-750x537-f50-50.webp",
    },
  ]

  return (
    <section id="recreation-activities" className={`py-20 ${isLightTheme ? "bg-gray-50" : "bg-[rgb(22,22,26)]"}`}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Recreation Activities
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-2xl mx-auto text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}
          >
            For those traveling in from outside the Tri-State area, there are a variety of recreational activities we
            recommend so you can take advantage of all that Long Island has to offer.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activities.map((activity, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isLightTheme ? "bg-white border-gray-200" : "bg-zinc-900/50 border-gray-800"
                }`}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className={`rounded-full p-2 ${isLightTheme ? "bg-gray-100" : "bg-gray-800"}`}>
                    {activity.icon}
                  </div>
                  <div>
                    <CardTitle className={isLightTheme ? "text-gray-800" : "text-white"}>{activity.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${isLightTheme ? "text-gray-600" : "text-gray-400"}`}>
                    {activity.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
