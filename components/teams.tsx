"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Linkedin, Twitter, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Teams() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const teamMembers = [
    {
      name: "Keith DeLucia",
      position: "CEO & Founder",
      bio: "With over 15 years of experience in sports management, Keith leads our vision to create the premier youth sports destination on Long Island.",
      image: "https://i.postimg.cc/9FfbZk3G/keithdelucia.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "keith@destinationkp.com",
      },
    },
    {
      name: "Anthony Orso",
      position: "Operations Director",
      bio: "Anthony oversees all facility operations, ensuring that our venues meet the highest standards for athletes, coaches, and spectators.",
      image: "https://i.postimg.cc/vZcPFN3Q/anthony-orso.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "anthony@destinationkp.com",
      },
    },
    {
      name: "Ben Saull",
      position: "Athletic Programs Manager",
      bio: "Ben develops and manages our diverse range of athletic programs, focusing on youth development and competitive excellence.",
      image: "https://i.postimg.cc/Gm8jSsmt/Ben-Saull-Ari.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ben@destinationkp.com",
      },
    },
    {
      name: "David Chen",
      position: "Community Relations",
      bio: "David builds and maintains our relationships with local schools, sports organizations, and community groups throughout Long Island.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@destinationkp.com",
      },
    },
    {
      name: "Emily Patel",
      position: "Marketing Director",
      bio: "Emily leads our marketing and communications efforts, sharing the Destination KP story with athletes, families, and partners.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@destinationkp.com",
      },
    },
    {
      name: "Robert Garcia",
      position: "Facilities Manager",
      bio: "Robert ensures that our fields, courts, and training areas are maintained to professional standards for optimal performance and safety.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "robert@destinationkp.com",
      },
    },
  ]

  const cardsPerView = 3
  const totalSlides = Math.ceil(teamMembers.length / cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  // Get the current visible team members
  const visibleTeamMembers = teamMembers.slice(currentIndex * cardsPerView, (currentIndex + 1) * cardsPerView)

  return (
    <section id="teams" className="py-20 bg-[rgb(26,26,30)] dark:bg-[rgb(26,26,30)] text-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Meet Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-gray-300"
          >
            The passionate professionals behind Destination KP, dedicated to creating exceptional experiences for
            athletes and the community.
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: `calc(-${currentIndex * 100}%)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-shrink-0">
                {visibleTeamMembers.map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={prevSlide}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-blue-500/10 text-white hover:bg-blue-500 hover:text-white transition-colors duration-300",
                "hover:bg-blue-500/50 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex space-x-2 items-center">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-6 bg-blue-500" : "bg-blue-500/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-blue-500/10 text-white hover:bg-blue-500 hover:text-white transition-colors duration-300",
                "hover:bg-blue-500/50 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TeamMemberProps {
  member: {
    name: string
    position: string
    bio: string
    image: string
    social: {
      linkedin?: string
      twitter?: string
      email?: string
    }
  }
}

const TeamMemberCard = ({ member }: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/10 to-blue-900/5 border border-blue-500/10 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 h-40 w-40 overflow-hidden rounded-full border-2 border-blue-500/20">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100px, 160px"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-blue-400 text-base font-medium mb-3">{member.position}</p>
        <p className="text-gray-300 text-base mb-5">{member.bio}</p>

        <div className="flex space-x-3">
          {member.social.linkedin && (
            <SocialLink href={member.social.linkedin} aria-label={`${member.name}'s LinkedIn`}>
              <Linkedin className="h-4 w-4" />
            </SocialLink>
          )}
          {member.social.twitter && (
            <SocialLink href={member.social.twitter} aria-label={`${member.name}'s Twitter`}>
              <Twitter className="h-4 w-4" />
            </SocialLink>
          )}
          {member.social.email && (
            <SocialLink href={`mailto:${member.social.email}`} aria-label={`Email ${member.name}`}>
              <Mail className="h-4 w-4" />
            </SocialLink>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-300" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-300" />
    </motion.div>
  )
}

const SocialLink = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      href={href}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full",
        "bg-blue-500/10 text-blue-400 transition-colors duration-300",
        "hover:bg-blue-500 hover:text-white",
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}
