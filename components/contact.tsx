"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("loading")

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success (in a real app, this would be based on the API response)
    setFormStatus("success")
    setMessage("Your message has been sent! We'll get back to you soon.")

    // Reset form (would use a form ref in a real implementation)
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <section
      id="contact"
      className={`py-20 ${
        isLightTheme
          ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
          : "bg-gradient-to-b from-[rgb(24,24,28)] to-[rgb(20,20,24)] text-white"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Contact Us
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
            Have questions about Destination KP? We're here to help. Reach out to our team for more information about
            our facilities, events, or partnership opportunities.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Decorative elements */}
          <div
            className={`absolute -top-20 -left-20 w-40 h-40 ${
              isLightTheme
                ? "bg-gradient-to-r from-purple-500/5 to-blue-500/3"
                : "bg-gradient-to-r from-purple-500/10 to-blue-500/5"
            } rounded-full blur-3xl opacity-50`}
          />
          <div
            className={`absolute -bottom-20 -right-20 w-40 h-40 ${
              isLightTheme
                ? "bg-gradient-to-r from-blue-500/3 to-purple-500/5"
                : "bg-gradient-to-r from-blue-500/5 to-purple-500/10"
            } rounded-full blur-3xl opacity-50`}
          />

          <div
            className={`relative z-10 ${
              isLightTheme
                ? "bg-white/90 backdrop-blur-lg border border-gray-200"
                : "bg-black/40 backdrop-blur-lg border border-white/10"
            } rounded-2xl p-8 md:p-12 overflow-hidden`}
          >
            {/* Subtle grid pattern overlay */}
            <div
              className={`absolute inset-0 ${
                isLightTheme
                  ? "bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
                  : "bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)]"
              } bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]`}
            ></div>

            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <ContactItem
                      icon={<Mail className={`h-5 w-5 ${isLightTheme ? "text-purple-500" : "text-purple-300"}`} />}
                      title="Email"
                      content="info@destinationkp.com"
                      href="mailto:info@destinationkp.com"
                      isLightTheme={isLightTheme}
                    />

                    <ContactItem
                      icon={<Phone className={`h-5 w-5 ${isLightTheme ? "text-purple-500" : "text-purple-300"}`} />}
                      title="Phone"
                      content="(631) 555-0123"
                      href="tel:+16315550123"
                      isLightTheme={isLightTheme}
                    />

                    <ContactItem
                      icon={<MapPin className={`h-5 w-5 ${isLightTheme ? "text-purple-500" : "text-purple-300"}`} />}
                      title="Address"
                      content={
                        <>
                          350 Old Northport Road
                          <br />
                          Kings Park, NY 11753
                        </>
                      }
                      href="https://maps.google.com/?q=350+Old+Northport+Road,+Kings+Park,+NY+11753"
                      isLightTheme={isLightTheme}
                    />
                  </div>

                  <div
                    className={`${
                      isLightTheme ? "bg-gray-50 backdrop-blur-sm" : "bg-white/5 backdrop-blur-sm"
                    } rounded-xl p-6`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 ${isLightTheme ? "bg-gray-100" : "bg-white/10"} backdrop-blur-sm rounded-full`}
                      >
                        <Clock className={`h-5 w-5 ${isLightTheme ? "text-purple-500" : "text-purple-300"}`} />
                      </div>
                      <h3 className={`font-semibold ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                        Hours of Operation
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={isLightTheme ? "text-gray-600" : "text-gray-300"}>Monday - Friday</span>
                        <span className={`font-medium ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                          6:00 AM - 10:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isLightTheme ? "text-gray-600" : "text-gray-300"}>Saturday</span>
                        <span className={`font-medium ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                          7:00 AM - 9:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isLightTheme ? "text-gray-600" : "text-gray-300"}>Sunday</span>
                        <span className={`font-medium ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                          8:00 AM - 8:00 PM
                        </span>
                      </div>
                    </div>
                    <p className={`text-sm ${isLightTheme ? "text-gray-500" : "text-gray-400"} mt-4`}>
                      Note: Hours may vary during special events and holidays.
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 ${isLightTheme ? "bg-gray-100" : "bg-white/10"} backdrop-blur-sm rounded-full`}
                      >
                        <Send className={`h-5 w-5 ${isLightTheme ? "text-purple-500" : "text-purple-300"}`} />
                      </div>
                      <h3
                        className={`text-base font-medium uppercase tracking-wider ${isLightTheme ? "text-purple-600" : "text-purple-300"}`}
                      >
                        Send a Message
                      </h3>
                    </div>
                    <p className={isLightTheme ? "text-gray-600" : "text-gray-300"}>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className={`text-base font-medium ${isLightTheme ? "text-gray-700" : "text-gray-300"}`}
                        >
                          First Name
                        </label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          className={`${
                            isLightTheme
                              ? "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus-visible:ring-purple-500"
                              : "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
                          }`}
                          disabled={formStatus === "loading" || formStatus === "success"}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className={`text-base font-medium ${isLightTheme ? "text-gray-700" : "text-gray-300"}`}
                        >
                          Last Name
                        </label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          className={`${
                            isLightTheme
                              ? "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus-visible:ring-purple-500"
                              : "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
                          }`}
                          disabled={formStatus === "loading" || formStatus === "success"}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className={`text-base font-medium ${isLightTheme ? "text-gray-700" : "text-gray-300"}`}
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className={`${
                          isLightTheme
                            ? "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus-visible:ring-purple-500"
                            : "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
                        }`}
                        disabled={formStatus === "loading" || formStatus === "success"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className={`text-base font-medium ${isLightTheme ? "text-gray-700" : "text-gray-300"}`}
                      >
                        Phone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        className={`${
                          isLightTheme
                            ? "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus-visible:ring-purple-500"
                            : "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
                        }`}
                        disabled={formStatus === "loading" || formStatus === "success"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className={`text-base font-medium ${isLightTheme ? "text-gray-700" : "text-gray-300"}`}
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={4}
                        className={`${
                          isLightTheme
                            ? "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus-visible:ring-purple-500"
                            : "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
                        }`}
                        disabled={formStatus === "loading" || formStatus === "success"}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 rounded-md transition-all duration-300"
                      disabled={formStatus === "loading" || formStatus === "success"}
                    >
                      {formStatus === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : formStatus === "success" ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Sent!
                        </>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {message && (
                      <div
                        className={`flex items-center text-sm ${formStatus === "error" ? "text-red-400" : isLightTheme ? "text-green-600" : "text-green-400"}`}
                      >
                        {formStatus === "error" ? (
                          <AlertCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        )}
                        {message}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ContactItemProps {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
  href?: string
  isLightTheme: boolean
}

const ContactItem = ({ icon, title, content, href, isLightTheme }: ContactItemProps) => {
  return (
    <div className="flex items-start gap-4 group">
      <div
        className={`p-3 ${
          isLightTheme
            ? "bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-purple-600/20 group-hover:to-blue-600/20"
            : "bg-white/10 group-hover:bg-gradient-to-r group-hover:from-purple-600/50 group-hover:to-blue-600/50"
        } backdrop-blur-sm rounded-full mt-1 transition-all duration-300`}
      >
        {icon}
      </div>
      <div>
        <h3 className={`text-lg font-semibold ${isLightTheme ? "text-gray-800" : "text-white"} mb-1`}>{title}</h3>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isLightTheme ? "text-gray-600 hover:text-purple-600" : "text-gray-300 hover:text-purple-300"
            } transition-colors duration-300`}
          >
            {content}
          </a>
        ) : (
          <p className={isLightTheme ? "text-gray-600" : "text-gray-300"}>{content}</p>
        )}
      </div>
    </div>
  )
}
