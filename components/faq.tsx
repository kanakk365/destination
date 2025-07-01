"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTheme } from "next-themes"

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const faqs = [
    {
      question: "When will Destination KP officially open?",
      answer:
        "Destination KP is scheduled to open in January 2026. Construction is currently underway, and we're on track to meet our target opening date.",
    },
    {
      question: "What types of sports and activities will be offered?",
      answer:
        "Destination KP will support a wide range of sports including soccer, basketball, volleyball, lacrosse, baseball, and more. We'll also offer fitness classes, training programs, and community events.",
    },
    {
      question: "Will there be membership options available?",
      answer:
        "Yes, we plan to offer various membership options for individuals, families, and teams. Details about membership plans and pricing will be announced closer to our opening date.",
    },
    {
      question: "Can I rent facilities for private events?",
      answer:
        "Destination KP will offer facility rentals for tournaments, birthday parties, corporate events, and other private functions. Contact our events team for more information.",
    },
    {
      question: "Will there be food options available on-site?",
      answer:
        "Yes, Destination KP will feature a café and nutrition bar offering healthy food options and refreshments. We're committed to providing nutritious choices for athletes and visitors.",
    },
    {
      question: "How can I stay updated on construction progress and opening details?",
      answer:
        "You can sign up for our newsletter on this website, follow us on social media, or check back here for regular updates on our progress and announcements.",
    },
  ]

  return (
    <section id="faq" className={`py-20 ${isLightTheme ? "bg-gray-50" : "bg-[rgb(20,20,24)]"}`}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Frequently Asked Questions
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-xl ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
            Find answers to common questions about Destination KP, our facilities, and services.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className={`border-b ${isLightTheme ? "border-gray-200" : "border-gray-800"}`}
                >
                  <AccordionTrigger
                    className={`text-left font-medium text-lg ${isLightTheme ? "text-gray-800" : "text-white"}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className={`text-lg ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
