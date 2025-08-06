"use client"
import React from 'react';
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Ticket, UserPlus, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
import News from "@/components/news"
import EventRegistrationForm from "@/components/event-registration-form"
import EventShareModal from "@/components/event-share-modal"
import { AdsSection } from "@/components/ads-section"
import { promoSlides,sliderConfig } from "@/data/slider-data"
import { Slider } from "@/components/sliders"
export default function EventsPage() {
  const [registrationForm, setRegistrationForm] = useState({
    isOpen: false,
    eventId: 0,
    eventTitle: "",
    eventDate: "",
  })

  const [shareModal, setShareModal] = useState({
    isOpen: false,
    eventId: 0,
    eventTitle: "",
    eventDate: "",
  })

  const getCurrentMonth = () => {
    const now = new Date()
    const currentMonthIndex = now.getMonth() // 0-11
    const monthIds = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ]
    return monthIds[currentMonthIndex]
  }

  const allMonths = [
    { id: "january", name: "January 2025" },
    { id: "february", name: "February 2025" },
    { id: "march", name: "March 2025" },
    { id: "april", name: "April 2025" },
    { id: "may", name: "May 2025" },
    { id: "june", name: "June 2025" },
    { id: "july", name: "July 2025" },
    { id: "august", name: "August 2025" },
    { id: "september", name: "September 2025" },
    { id: "october", name: "October 2025" },
    { id: "november", name: "November 2025" },
    { id: "december", name: "December 2025" },
  ]

  // Filter to show only current month and future months
  const currentMonthId = "july"
  const currentMonthIndex = allMonths.findIndex((month) => month.id === currentMonthId)
  const months = allMonths.slice(currentMonthIndex)

  const [selectedMonth, setSelectedMonth] = useState("july")
  const [currentMonthIndexForView, setCurrentMonthIndex] = useState(0)

  // Replace: const monthsPerView = 4
  // With responsive monthsPerView logic
  const [monthsPerView, setMonthsPerView] = useState(4)

  // Add useEffect to handle responsive monthsPerView
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // sm breakpoint
        setMonthsPerView(2)
      } else if (window.innerWidth < 768) {
        // md breakpoint
        setMonthsPerView(3)
      } else {
        setMonthsPerView(4)
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalGroups = Math.ceil(months.length / monthsPerView)

  const getVisibleMonths = () => {
    const startIndex = currentMonthIndexForView * monthsPerView
    return months.slice(startIndex, startIndex + monthsPerView)
  }

  const handlePreviousMonths = () => {
    if (currentMonthIndexForView > 0) {
      setCurrentMonthIndex(currentMonthIndexForView - 1)
    }
  }

  const handleNextMonths = () => {
    if (currentMonthIndexForView < totalGroups - 1) {
      setCurrentMonthIndex(currentMonthIndexForView + 1)
    }
  }

  const eventsData = {
    january: [],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [
      {
        id: 1,
        title: "Fireworks Spectacular 2025",
        date: "July 4, 2025",
        time: "9:30 PM",
        location: "Jones Beach State Park",
        category: "Entertainment",
        description:
          "Join us for the spectacular Jovia Financial Credit Union Fireworks Spectacular at Jones Beach State Park. A dazzling display of fireworks to celebrate Independence Day with family and friends.",
        capacity: "Unlimited",
        price: "Free",
        image: "/images/events2.jpg",
      },
      {
        id: 2,
        title: "Polo Match & Event",
        date: "July 19 & 26, 2025",
        time: "2:00 PM - 6:00 PM",
        location: "900 Lumber Lane, Bridgehampton, NY",
        category: "Sports",
        description:
          "Experience the elegance and excitement of polo at this exclusive event in the Hamptons. Two exciting match days featuring world-class polo players in a beautiful setting.",
        capacity: "500 people",
        price: "$75",
        image: "/images/events3.jpg",
      },
    ],
    august: [],
    september: [
      {
        id: 3,
        title: "Ryder Cup 2025",
        date: "September 23-28, 2025",
        time: "8:00 AM - 6:00 PM",
        location: "Bethpage Black Course",
        category: "Sports",
        description:
          "Witness golf history at Bethpage Black Course as it hosts the Ryder Cup for the very first time. The legendary course designed by A.W. Tillinghast in 1936 will be the stage for this prestigious international golf competition.",
        capacity: "40,000 people",
        price: "$150 - $500",
        image: "/images/events1.webp",
      },
    ],
    october: [],
    november: [],
    december: [],
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Community":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Sports":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Wellness":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Entertainment":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleGetTicket = (eventId: number) => {
    console.log(`Getting ticket for event ${eventId}`)
    // Implement ticket purchase logic
  }

  const handleRegister = (event: any) => {
    setRegistrationForm({
      isOpen: true,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
    })
  }

  const handleCloseRegistration = () => {
    setRegistrationForm({
      isOpen: false,
      eventId: 0,
      eventTitle: "",
      eventDate: "",
    })
  }

  const handleShare = (event: any) => {
    setShareModal({
      isOpen: true,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
    })
  }

  const handleCloseShare = () => {
    setShareModal({
      isOpen: false,
      eventId: 0,
      eventTitle: "",
      eventDate: "",
    })
  }

  return (
    <div className="min-h-screen bg-[#050a18]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover exciting events, tournaments, and activities happening at Destination KP throughout the year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          <Tabs value={selectedMonth} onValueChange={setSelectedMonth} className="w-full">
            {/* Month Navigation */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousMonths}
                  disabled={currentMonthIndexForView === 0}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Month Tabs - Responsive Grid */}
                <div className="flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 gap-1">
                    {getVisibleMonths().map((month) => (
                      <TabsTrigger
                        key={month.id}
                        value={month.id}
                        className="text-gray-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2"
                      >
                        <span className="block sm:hidden">{month.name.split(" ")[0].slice(0, 3)}</span>
                        <span className="hidden sm:block">{month.name.split(" ")[0]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextMonths}
                  disabled={currentMonthIndexForView >= totalGroups - 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Month Range Indicator - Responsive Text */}
              <div className="text-center text-xs sm:text-sm text-gray-400 px-4">
                <span className="hidden sm:inline">
                  Showing months {currentMonthIndexForView * monthsPerView + 1} -{" "}
                  {Math.min((currentMonthIndexForView + 1) * monthsPerView, months.length)} of {months.length}
                </span>
                <span className="sm:hidden">
                  {currentMonthIndexForView + 1} of {totalGroups} groups
                </span>
              </div>
            </div>

            {/* Events Content */}
            {months.map((month) => (
              <TabsContent key={month.id} value={month.id} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Events in {month.name}</h2>

                  {eventsData[month.id] && eventsData[month.id].length > 0 ? (
                    <div className="grid gap-8 md:gap-12">
                      {eventsData[month.id].map((event, index) => (
                        <React.Fragment key={event.id}>
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300">
                            <div className="grid md:grid-cols-[300px_1fr] gap-6">
                              {/* Event Image */}
                              <div className="relative overflow-hidden">
                                <img
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  className="w-full h-64 md:h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                  <Badge className={`${getCategoryColor(event.category)} border`}>
                                    {event.category}
                                  </Badge>
                                </div>
                              </div>

                              {/* Event Details */}
                              <div className="p-6">
                                <CardHeader className="p-0 mb-4">
                                  <CardTitle className="text-2xl md:text-3xl text-white mb-2">{event.title}</CardTitle>
                                  <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
                                </CardHeader>

                                <CardContent className="p-0">
                                  {/* Event Info Grid */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3 text-gray-300">
                                        <Calendar className="h-5 w-5 text-purple-400" />
                                        <span>{event.date}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-gray-300">
                                        <Clock className="h-5 w-5 text-blue-400" />
                                        <span>{event.time}</span>
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3 text-gray-300">
                                        <MapPin className="h-5 w-5 text-green-400" />
                                        <span>{event.location}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-gray-300">
                                        <Users className="h-5 w-5 text-orange-400" />
                                        <span>{event.capacity}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Price and Action Buttons */}
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="text-2xl font-bold text-white">{event.price}</div>

                                    <div className="flex flex-wrap gap-3">
                                      <Button
                                        onClick={() => handleGetTicket(event.id)}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white gap-2"
                                      >
                                        <Ticket className="h-4 w-4" />
                                        Get Ticket
                                      </Button>
                                      <Button
                                        onClick={() => handleRegister(event)}
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white gap-2"
                                      >
                                        <UserPlus className="h-4 w-4" />
                                        Register
                                      </Button>
                                      <Button
                                        onClick={() => handleShare(event)}
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white gap-2"
                                      >
                                        <Share2 className="h-4 w-4" />
                                        Share
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                        {index % 2 === 0 && index !== eventsData[month.id].length - 1 && (
                            <Slider
                              slides={promoSlides}
                              {...sliderConfig}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">No events scheduled</h3>
                      <p className="text-gray-500">Check back later for upcoming events in {month.name}.</p>
                    </div>
                  )}
                </motion.div>
              
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Our Partners
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Supporting our community through quality products and services
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <AdsSection />
          </div>
        </div>
      </section>
      {/* Registration Form Modal */}
      <EventRegistrationForm
        isOpen={registrationForm.isOpen}
        onClose={handleCloseRegistration}
        eventTitle={registrationForm.eventTitle}
        eventDate={registrationForm.eventDate}
        eventId={registrationForm.eventId}
      />

      {/* Share Modal */}
      <EventShareModal
        isOpen={shareModal.isOpen}
        onClose={handleCloseShare}
        eventTitle={shareModal.eventTitle}
        eventDate={shareModal.eventDate}
        eventId={shareModal.eventId}
      />

      {/* Contact Section */}
      <Contact />

      {/* Newsletter Section */}
      <Newsletter />

      {/* News/Blogs Section */}
      <News />

      <Footer />
    </div>
  )
}
