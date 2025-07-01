"use client"

import { motion } from "framer-motion"
import { Clock, Wifi, Users, Car, Accessibility } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
import News from "@/components/news"

const facilities = [
  {
    id: 1,
    name: "Multi-Sport Fields",
    category: "Sports",
    image: "https://i.postimg.cc/CKKJH6fy/landingimage4.avif",
    description:
      "Our state-of-the-art turf fields are designed to support a wide range of sports including soccer, football, lacrosse, and more. With professional-grade surfaces and lighting, these fields provide the perfect environment for training and competition.",
    features: [
      "FIFA-approved synthetic turf",
      "Professional LED lighting",
      "Advanced drainage system",
      "Impact-absorbing underlayment",
    ],
    amenities: ["Locker rooms with showers", "Equipment storage", "Referee facilities", "Concession stand access"],
    hours: "6:00 AM - 10:00 PM",
    capacity: "200+ athletes",
  },
  {
    id: 2,
    name: "Indoor Courts",
    category: "Indoor",
    image: "https://i.postimg.cc/nrq1cyNm/landingimage5.avif",
    description:
      "Our premium indoor courts feature professional-grade flooring and equipment for basketball, volleyball, and other court sports. With excellent lighting and climate control, these versatile spaces can accommodate tournaments, practices, and recreational play year-round.",
    features: [
      "Professional hardwood flooring",
      "Retractable seating (500 capacity)",
      "Climate control system",
      "Sound dampening technology",
    ],
    amenities: [
      "Team locker rooms",
      "Officials' changing room",
      "Scoreboard and timing systems",
      "Audio/visual equipment",
    ],
    hours: "6:00 AM - 11:00 PM",
    capacity: "500+ spectators",
  },
  {
    id: 3,
    name: "Fitness Center",
    category: "Training",
    image: "https://i.postimg.cc/fbxWCB4K/equipments-gym.jpg",
    description:
      "Our comprehensive fitness center is equipped with modern strength training, cardio, and recovery equipment. Designed for athletes of all levels, the center includes dedicated areas for team training, personal workouts, and specialized conditioning programs.",
    features: [
      "5,000 sq ft training space",
      "Latest cardio equipment",
      "Free weights and machines",
      "Functional training area",
    ],
    amenities: ["Locker rooms with lockers", "Towel service", "Water stations", "24/7 access for members"],
    hours: "24/7 (Members)",
    capacity: "100+ members",
  },
  {
    id: 4,
    name: "Event Spaces",
    category: "Events",
    image: "https://i.postimg.cc/PqzhYJZV/landingpage6.avif",
    description:
      "Our flexible event spaces can be configured for tournaments, camps, parties, and community gatherings. With modern amenities and customizable layouts, these areas provide the perfect setting for both athletic and social events throughout the year.",
    features: [
      "Main hall (300 guest capacity)",
      "Breakout rooms available",
      "Built-in sound system",
      "Projection and AV equipment",
    ],
    amenities: [
      "Full catering kitchen",
      "Bar service available",
      "Event coordination services",
      "Setup and cleanup included",
    ],
    hours: "8:00 AM - 12:00 AM",
    capacity: "300+ guests",
  },
  {
    id: 5,
    name: "Gourmet Food Court",
    category: "Dining",
    image:
      "https://i.postimg.cc/7hcyw28h/summer-restaurant-mediterranean-coast-beautiful-sunset-tekirova-kemer-turkey.jpg",
    description:
      "Our gourmet food court offers diverse culinary options featuring healthy, locally-sourced ingredients. With multiple stations serving everything from nutritious meals to quick snacks, athletes and visitors can enjoy quality food that fuels performance and satisfies taste buds.",
    features: [
      "Five specialized food stations",
      "Locally-sourced ingredients",
      "Made-to-order meals",
      "Organic salad bar",
    ],
    amenities: [
      "Indoor and outdoor seating",
      "Free Wi-Fi",
      "Family-friendly environment",
      "Dietary restriction options",
    ],
    hours: "7:00 AM - 9:00 PM",
    capacity: "150+ diners",
  },
  {
    id: 6,
    name: "Coffee House",
    category: "Refreshments",
    image: "https://i.postimg.cc/3x2HQNLr/cafe-bar-hotel-loft-style.jpg",
    description:
      "Our premium coffee house serves specialty coffees, teas, and light refreshments in a comfortable setting. With ample seating and a relaxed atmosphere, it's the perfect place for parents to wait during practices or for teams to gather after events.",
    features: [
      "Locally-roasted coffee beans",
      "Expert barista service",
      "Premium tea selection",
      "Fresh pastries daily",
    ],
    amenities: [
      "Free high-speed Wi-Fi",
      "Device charging stations",
      "Comfortable seating areas",
      "Outdoor patio seating",
    ],
    hours: "6:00 AM - 8:00 PM",
    capacity: "75+ guests",
  },
  {
    id: 7,
    name: "Smart Vending Solutions",
    category: "Convenience",
    image: "https://i.postimg.cc/ZKyG60zP/26294.jpg",
    description:
      "Strategically placed throughout the complex, our smart vending machines offer convenient access to drinks, snacks, and essential items. These modern units accept multiple payment methods and feature healthy options alongside traditional favorites.",
    features: [
      "Touchscreen interface",
      "Cashless payment options",
      "Mobile payment compatible",
      "Healthy snack options",
    ],
    amenities: ["24/7 availability", "Multiple locations", "Regular restocking", "Customer service hotline"],
    hours: "24/7",
    capacity: "Unlimited access",
  },
  {
    id: 8,
    name: "Food Truck Plaza",
    category: "Food",
    image: "https://i.postimg.cc/zXKJ8xv1/istockphoto-635727790-612x612.jpg",
    description:
      "Our dedicated food truck area features a rotating selection of popular local vendors offering diverse cuisine options. Perfect for events and weekends, Food Truck Plaza provides fresh, exciting dining alternatives that showcase the best of local food culture.",
    features: [
      "Rotating vendor selection",
      "Diverse cuisine options",
      "Local food truck partnerships",
      "Outdoor dining atmosphere",
    ],
    amenities: [
      "Covered seating areas",
      "Picnic table seating",
      "Family-friendly environment",
      "Waste and recycling stations",
    ],
    hours: "11:00 AM - 8:00 PM (Weekends)",
    capacity: "200+ diners",
  },
]

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Facilities
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover our world-class facilities designed to serve our community with excellence. From sports complexes
            to community centers, we provide spaces for everyone to thrive.
          </motion.p>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 mb-24`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-2xl group">
                  <img
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.name}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    {facility.name}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{facility.description}</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Key Features
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {facility.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      Amenities
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {facility.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{facility.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{facility.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Car className="w-4 h-4" />
                    <span>Parking Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Accessibility className="w-4 h-4" />
                    <span>Accessible</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Ready to Experience Our Facilities?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our facilities, schedule a tour, or make a reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Schedule a Tour
              </button>
              <button className="px-8 py-3 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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
