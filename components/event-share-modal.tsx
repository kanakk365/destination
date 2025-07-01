"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Check, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EventShareModalProps {
  isOpen: boolean
  onClose: () => void
  eventTitle: string
  eventDate: string
  eventId: number
}

export default function EventShareModal({ isOpen, onClose, eventTitle, eventDate, eventId }: EventShareModalProps) {
  const [copied, setCopied] = useState(false)

  // Generate the shareable link
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/events?event=${eventId}`
  const shareText = `Check out this event: ${eventTitle} on ${eventDate}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)

    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodedText}%0A%0A${encodedUrl}`
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400")
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Share Event</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{eventTitle}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Copy Link Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Link</label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              {copied && <p className="text-sm text-green-600 mt-1">Link copied to clipboard!</p>}
            </div>

            {/* Social Share Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Share on Social Media
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleSocialShare("facebook")}
                  variant="outline"
                  className="flex items-center gap-2 justify-center border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  onClick={() => handleSocialShare("twitter")}
                  variant="outline"
                  className="flex items-center gap-2 justify-center border-gray-300 dark:border-gray-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 dark:hover:border-sky-600"
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter
                </Button>
                <Button
                  onClick={() => handleSocialShare("linkedin")}
                  variant="outline"
                  className="flex items-center gap-2 justify-center border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </Button>
                <Button
                  onClick={() => handleSocialShare("email")}
                  variant="outline"
                  className="flex items-center gap-2 justify-center border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                >
                  <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  Email
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Done
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
