"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTheme } from "next-themes"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const testimonials = [
    {
      quote:
        "As a youth soccer coach, I'm thrilled about the state-of-the-art facilities coming to Kings Park. This will be a game-changer for our local athletes.",
      name: "Gid Pfeffer",
      designation: "Youth Soccer Coach",
      src: "https://i.postimg.cc/DZgQbrBj/gidpfeffer.webp",
    },
    {
      quote:
        "The community has needed a comprehensive sports complex like this for years. Destination KP will provide incredible opportunities for our children.",
      name: "Sarah Johnson",
      designation: "Parent & Community Advocate",
      src: "https://i.postimg.cc/wM4hw6KD/1733189306436blob.png",
    },
    {
      quote:
        "Having a premier facility like Destination KP in our area will help elevate youth sports and bring our community together through athletics and events.",
      name: "Tom Dwyer",
      designation: "Local Business Owner",
      src: "https://i.postimg.cc/VkCjFQKb/TomDwyer.webp",
    },
    {
      quote:
        "The multi-sport approach of Destination KP is exactly what our young athletes need. This facility will foster development across various sports disciplines.",
      name: "Ben Saull",
      designation: "Athletic Programs Manager",
      src: "https://i.postimg.cc/Gm8jSsmt/Ben-Saull-Ari.webp",
    },
    {
      quote:
        "This project represents a significant investment in our community's future. The economic and social benefits will be felt throughout Kings Park for generations.",
      name: "Keith DeLucia",
      designation: "CEO & Founder",
      src: "https://i.postimg.cc/9FfbZk3G/keithdelucia.webp",
    },
  ]

  return (
    <section id="testimonials" ref={ref} className={`py-20 ${isLightTheme ? "bg-gray-100" : "bg-[rgb(30,30,34)]"}`}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Community Voices
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
            Hear what local community members, coaches, and parents are saying about Destination KP.
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  )
}
