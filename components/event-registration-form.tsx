"use client"

import type * as React from "react"
import { useState } from "react"
import { X, Calendar, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EventRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  eventTitle: string
  eventDate: string
  eventId: number
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  eventId,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numberOfPersons: "1",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration submitted:", { eventId, ...formData })
    // Implement registration logic here
    alert("Registration submitted successfully!")
    onClose()
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      numberOfPersons: "1",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Event Registration</h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    <Calendar size={14} />
                    <span>{eventTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    <Users size={14} />
                    <span>{eventDate}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-zinc-500 dark:text-zinc-400">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                      text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500
                      focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-zinc-500 dark:text-zinc-400">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                      text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500
                      focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-zinc-500 dark:text-zinc-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                    text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500
                    focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-zinc-500 dark:text-zinc-400">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                    text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500
                    focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Number of Persons */}
                <div>
                  <Label htmlFor="numberOfPersons" className="text-zinc-500 dark:text-zinc-400">
                    Number of Persons
                  </Label>
                  <Input
                    id="numberOfPersons"
                    name="numberOfPersons"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.numberOfPersons}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                    text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500
                    focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 
                    ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 
                    transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
                  >
                    Register for Event
                  </Button>
                </div>

                {/* Terms */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                  By registering, you agree to our{" "}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy.
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default EventRegistrationForm
