"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ButtonColorful } from "@/components/ui/button-colorful"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Updated navigation links with new order
  const navLinks = [
    { name: "Facilities", href: "/facilities" },
    { name: "Events", href: "/events" },
    { name: "To Do", href: "/todo" },
    { name: "Advertising", href: "/advertising" },
    { name: "About Us", href: "/#about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Contact Us", href: "/#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLightTheme
            ? "bg-white/70 backdrop-blur-md shadow-md"
            : "bg-black/50 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl sm:text-3xl font-bold ${isLightTheme ? "text-gray-800" : "text-white"}`}>
              Destination
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">KP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-3 xl:space-x-6 mr-4 xl:mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm xl:text-base font-medium transition-colors hover:text-blue-600 ${
                    isLightTheme ? "text-gray-700" : "text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              <Link href="/login">
                <ButtonColorful label="Login" className="h-8 xl:h-9 text-sm xl:text-base text-white px-4 xl:px-6" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              className={`p-2 rounded-full ${isLightTheme ? "bg-gray-200/70" : "bg-black/30"} backdrop-blur-sm focus:outline-none transition-colors`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className={`h-5 w-5 sm:h-6 sm:w-6 ${isLightTheme ? "text-gray-800" : "text-white"}`} />
              ) : (
                <Menu className={`h-5 w-5 sm:h-6 sm:w-6 ${isLightTheme ? "text-gray-800" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${isLightTheme ? "bg-white/95" : "bg-black/95"} backdrop-blur-md border-t ${isLightTheme ? "border-gray-200" : "border-gray-800"}`}
          >
            <div className="container mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block ${
                    isLightTheme
                      ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      : "text-white/80 hover:text-blue-400 hover:bg-white/5"
                  } py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <ButtonColorful label="Login" className="w-full text-white h-12 text-base font-medium" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
