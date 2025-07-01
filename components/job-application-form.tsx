"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2 } from "lucide-react"

interface JobApplicationFormProps {
  jobTitle: string
  onCancel: () => void
}

export default function JobApplicationForm({ jobTitle, onCancel }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    resumeUrl: "",
    coverLetter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would submit to an API endpoint here
    console.log("Submitting application:", { jobTitle, ...formData })

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
        <p className="text-gray-400 mb-6">
          Thank you for applying to the {jobTitle} position. We've received your application and will be in touch soon.
        </p>
        <Button onClick={onCancel} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
          Back to Job Description
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6">Apply for {jobTitle}</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 focus:border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 focus:border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 focus:border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="location">Current Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 focus:border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Select onValueChange={(value) => handleSelectChange("experience", value)} required>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="resumeUrl">Resume URL (Dropbox, Google Drive, etc.)</Label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              value={formData.resumeUrl}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 focus:border-gray-600"
              placeholder="https://"
            />
          </div>

          <div>
            <Label htmlFor="coverLetter">Cover Letter / Additional Information</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={5}
              className="bg-gray-800 border-gray-700 focus:border-gray-600"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
