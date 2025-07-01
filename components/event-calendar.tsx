"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EventCalendar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentMonth, setCurrentMonth] = useState("May 2024")

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

  const events = [
    {
      title: "Community Open House",
      date: "May 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Main Building",
      category: "Community",
      description: "Join us for a preview of the Destination KP facilities and learn about our programs.",
    },
    {
      title: "Youth Soccer Tournament",
      date: "May 22-23, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Outdoor Fields",
      category: "Sports",
      description: "Regional youth soccer tournament featuring teams from across Long Island.",
    },
    {
      title: "Health & Wellness Expo",
      date: "May 28, 2024",
      time: "11:00 AM - 4:00 PM",
      location: "Event Hall",
      category: "Wellness",
      description: "Explore health resources, fitness demonstrations, and wellness activities for the whole family.",
    },
    {
      title: "Basketball Skills Camp",
      date: "June 5-7, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Indoor Courts",
      category: "Sports",
      description: "Three-day skills development camp for youth basketball players ages 10-16.",
    },
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case "Community":
        return "bg-blue-500/20 text-blue-400"
      case "Sports":
        return "bg-green-500/20 text-green-400"
      case "Wellness":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <section id="events" className="py-20 bg-[rgb(16,16,20)]">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Upcoming Events
              </span>
            </h2>
            <p className="max-w-2xl text-xl text-gray-300">
              Stay up-to-date with the latest events, tournaments, and activities happening at Destination KP.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent border-gray-700 hover:bg-gray-800 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <span className="font-medium text-white">{currentMonth}</span>
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent border-gray-700 hover:bg-gray-800 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6"
        >
          {events.map((event, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md bg-[rgb(20,20,24)] border-gray-800 text-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={`mb-2 ${getCategoryColor(event.category)}`}>{event.category}</Badge>
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                      Add to Calendar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{event.location}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg text-gray-300">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white gap-2">
            View Full Calendar <Calendar className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
