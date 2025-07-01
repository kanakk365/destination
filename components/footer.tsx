"use client"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"

export default function Footer() {
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  return (
    <footer className={`${isLightTheme ? "bg-gray-100 text-gray-700" : "bg-[rgb(26,26,30)] text-gray-300"}`}>
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${isLightTheme ? "text-gray-900" : "text-white"}`}>
              Destination
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">KP</span>
            </h3>
            <p className={isLightTheme ? "text-gray-600" : "text-gray-400"}>
              The premier youth sports and events complex in Kings Park, Long Island. Opening January 2026.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-500" : "text-gray-400"} transition-colors hover:text-[#1877F2]`}
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-500" : "text-gray-400"} transition-colors hover:text-[#1DA1F2]`}
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-500" : "text-gray-400"} transition-colors hover:text-[#E4405F]`}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-500" : "text-gray-400"} transition-colors hover:text-[#FF0000]`}
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-semibold ${isLightTheme ? "text-gray-900" : "text-white"} mb-4`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#facilities"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#news"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-xl font-semibold ${isLightTheme ? "text-gray-900" : "text-white"} mb-4`}>Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/coming-soon?feature=Facility Rental"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Facility Rental
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon?feature=Programs %26 Camps"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Programs & Camps
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon?feature=Community Partners"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Community Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className={`text-base ${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"} transition-colors`}
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-xl font-semibold ${isLightTheme ? "text-gray-900" : "text-white"} mb-4`}>
              Stay Updated
            </h3>
            <p className={`${isLightTheme ? "text-gray-600" : "text-gray-400"} mb-4`}>
              Subscribe to our newsletter for the latest updates on Destination KP.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className={`${
                    isLightTheme ? "bg-white border-gray-300 text-gray-800" : "bg-gray-800 border-gray-700 text-white"
                  } rounded-r-none focus-visible:ring-blue-500`}
                />
                <Button type="submit" className="rounded-l-none">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
              <p className={`text-xs ${isLightTheme ? "text-gray-500" : "text-gray-500"}`}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>

        <div
          className={`border-t ${isLightTheme ? "border-gray-200" : "border-gray-800"} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
        >
          <p className={`text-sm ${isLightTheme ? "text-gray-500" : "text-gray-500"}`}>
            &copy; {new Date().getFullYear()} Destination KP. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className={`text-sm ${isLightTheme ? "text-gray-500 hover:text-gray-900" : "text-gray-500 hover:text-white"} transition-colors`}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className={`text-sm ${isLightTheme ? "text-gray-500 hover:text-gray-900" : "text-gray-500 hover:text-white"} transition-colors`}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className={`text-sm ${isLightTheme ? "text-gray-500 hover:text-gray-900" : "text-gray-500 hover:text-white"} transition-colors`}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
