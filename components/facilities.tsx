"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Compass, Palmtree, Mountain, UtensilsCrossed, Coffee, ShoppingCart, Truck } from "lucide-react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { useTheme } from "next-themes"

export default function Facilities() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const facilitiesData = [
    {
      category: "Sports",
      title: "Multi-Sport Fields",
      description:
        "Our state-of-the-art turf fields are designed to support a wide range of sports including soccer, football, lacrosse, and more. With professional-grade surfaces and lighting, these fields provide the perfect environment for training and competition.",
      icon: <Compass className="h-6 w-6 text-blue-500" />,
      src: "https://i.postimg.cc/CKKJH6fy/landingimage4.avif",
    },
    {
      category: "Indoor",
      title: "Indoor Courts",
      description:
        "Our premium indoor courts feature professional-grade flooring and equipment for basketball, volleyball, and other court sports. With excellent lighting and climate control, these versatile spaces can accommodate tournaments, practices, and recreational play year-round.",
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      src: "https://i.postimg.cc/nrq1cyNm/landingimage5.avif",
    },
    {
      category: "Training",
      title: "Fitness Center",
      description:
        "Our comprehensive fitness center is equipped with modern strength training, cardio, and recovery equipment. Designed for athletes of all levels, the center includes dedicated areas for team training, personal workouts, and specialized conditioning programs.",
      icon: <Mountain className="h-6 w-6 text-red-500" />,
      src: "https://i.postimg.cc/fbxWCB4K/equipments-gym.jpg",
    },
    {
      category: "Events",
      title: "Event Spaces",
      description:
        "Our flexible event spaces can be configured for tournaments, camps, parties, and community gatherings. With modern amenities and customizable layouts, these areas provide the perfect setting for both athletic and social events throughout the year.",
      icon: <Palmtree className="h-6 w-6 text-purple-500" />,
      src: "https://i.postimg.cc/PqzhYJZV/landingpage6.avif",
    },
    {
      category: "Dining",
      title: "Gourmet Food Court",
      description:
        "Our gourmet food court offers diverse culinary options featuring healthy, locally-sourced ingredients. With multiple stations serving everything from nutritious meals to quick snacks, athletes and visitors can enjoy quality food that fuels performance and satisfies taste buds.",
      icon: <UtensilsCrossed className="h-6 w-6 text-green-500" />,
      src: "https://i.postimg.cc/7hcyw28h/summer-restaurant-mediterranean-coast-beautiful-sunset-tekirova-kemer-turkey.jpg",
    },
    {
      category: "Refreshments",
      title: "Coffee House",
      description:
        "Our premium coffee house serves specialty coffees, teas, and light refreshments in a comfortable setting. With ample seating and a relaxed atmosphere, it's the perfect place for parents to wait during practices or for teams to gather after events.",
      icon: <Coffee className="h-6 w-6 text-amber-500" />,
      src: "https://i.postimg.cc/3x2HQNLr/cafe-bar-hotel-loft-style.jpg",
    },
    {
      category: "Convenience",
      title: "Remote Vending Machines",
      description:
        "Strategically placed throughout the complex, our vending machines offer convenient access to drinks, snacks, and essential items from local providers. These self-service stations ensure that refreshments are always available, even during the busiest events.",
      icon: <ShoppingCart className="h-6 w-6 text-blue-500" />,
      src: "https://i.postimg.cc/ZKyG60zP/26294.jpg",
    },
    {
      category: "Food",
      title: "Food Truck Row",
      description:
        "Our dedicated food truck area features a rotating selection of popular local vendors offering diverse cuisine options. Perfect for events and weekends, Food Truck Row provides fresh, exciting dining alternatives that showcase the best of local food culture.",
      icon: <Truck className="h-6 w-6 text-purple-500" />,
      src: "https://i.postimg.cc/zXKJ8xv1/istockphoto-635727790-612x612.jpg",
    },
  ]

  const FacilityContent = ({ description }: { description: string }) => {
    const { theme } = useTheme()
    const isLightTheme = theme === "light"

    return (
      <div className={`${isLightTheme ? "bg-gray-50" : "bg-gray-100 dark:bg-zinc-800"} p-6 md:p-8 rounded-2xl`}>
        <p className={`${isLightTheme ? "text-gray-700" : "text-gray-700 dark:text-gray-300"} text-base md:text-lg`}>
          {description}
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${isLightTheme ? "bg-white shadow-sm" : "bg-white dark:bg-zinc-700"} p-4 rounded-xl`}>
            <h4 className={`font-semibold ${isLightTheme ? "text-gray-900" : "text-gray-900 dark:text-white"} mb-2`}>
              Features
            </h4>
            <ul
              className={`list-disc list-inside ${isLightTheme ? "text-gray-700" : "text-gray-700 dark:text-gray-300"} text-sm`}
            >
              <li>Professional-grade equipment</li>
              <li>Climate-controlled environment</li>
              <li>Accessible design</li>
              <li>State-of-the-art technology</li>
            </ul>
          </div>
          <div className={`${isLightTheme ? "bg-white shadow-sm" : "bg-white dark:bg-zinc-700"} p-4 rounded-xl`}>
            <h4 className={`font-semibold ${isLightTheme ? "text-gray-900" : "text-gray-900 dark:text-white"} mb-2`}>
              Availability
            </h4>
            <ul
              className={`list-disc list-inside ${isLightTheme ? "text-gray-700" : "text-gray-700 dark:text-gray-300"} text-sm`}
            >
              <li>Open 7 days a week</li>
              <li>Extended hours during events</li>
              <li>Reservation options available</li>
              <li>Special rates for members</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const cards = facilitiesData.map((facility, index) => (
    <Card
      key={index}
      card={{
        category: facility.category,
        title: facility.title,
        src: facility.src,
        icon: facility.icon,
        content: <FacilityContent description={facility.description} />,
      }}
      index={index}
    />
  ))

  return (
    <section
      id="facilities"
      className={`py-20 ${isLightTheme ? "bg-gray-100" : "bg-[rgb(24,24,28)]"} ${isLightTheme ? "text-gray-800" : "text-white"}`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              World-Class Facilities
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-2xl mx-auto text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}
          >
            Destination KP offers comprehensive facilities designed to support a wide range of sports, activities, and
            events for youth athletes and the community.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <Carousel items={cards} />
        </motion.div>
      </div>
    </section>
  )
}
