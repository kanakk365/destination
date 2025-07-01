"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

// Mock subscription function that simulates an API call
async function mockSubscribe(email: string) {
  // API request simulation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (email.includes("error")) {
    return { success: false, error: "Something went wrong!" }
  }

  return { success: true }
}

export default function Newsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    try {
      const result = await mockSubscribe(email)
      if (result.success) {
        setStatus("success")
        setMessage("Thank you for subscribing!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(result.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <section
      id="newsletter"
      className={`py-20 ${
        isLightTheme
          ? "bg-gradient-to-b from-gray-50 to-white"
          : "bg-gradient-to-b from-[rgb(18,18,22)] to-[rgb(22,22,26)] dark:from-[rgb(18,18,22)] dark:to-[rgb(22,22,26)]"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
                <div className="max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 ${isLightTheme ? "bg-gray-100" : "bg-white/10"} backdrop-blur-sm rounded-full`}
                    >
                      <Mail className={`h-5 w-5 ${isLightTheme ? "text-purple-500" : "text-purple-300"}`} />
                    </div>
                    <h3
                      className={`text-base font-medium uppercase tracking-wider ${
                        isLightTheme ? "text-purple-600" : "text-purple-300"
                      }`}
                    >
                      Newsletter
                    </h3>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                      Stay Connected
                    </span>
                  </h2>
                  <p className={`text-lg ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
                    Subscribe to our newsletter to receive the latest news, exclusive offers, and updates about
                    Destination KP's progress and upcoming events.
                  </p>
                </div>

                <div className="w-full md:w-auto">
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading" || status === "success"}
                        className={`${
                          isLightTheme
                            ? "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400"
                            : "bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        } h-12 pr-12 focus-visible:ring-purple-500`}
                      />
                      <Mail
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                          isLightTheme ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 rounded-md transition-all duration-300"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : status === "success" ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {message && (
                      <div
                        className={`flex items-center text-sm ${status === "error" ? "text-red-400" : "text-green-400"}`}
                      >
                        {status === "error" ? (
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

              <div className="pt-6 border-t border-white/10">
                <p className={`text-xs ${isLightTheme ? "text-gray-500" : "text-gray-400"}`}>
                  By subscribing, you agree to our{" "}
                  <a
                    href="#"
                    className={`${isLightTheme ? "text-purple-600" : "text-purple-300"} hover:${isLightTheme ? "text-purple-700" : "text-purple-200"} underline`}
                  >
                    Privacy Policy
                  </a>
                  . We respect your privacy and will never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
