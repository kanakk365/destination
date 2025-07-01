"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobApplicationForm from "@/components/job-application-form"
import { jobData } from "@/data/job-data"

export default function JobDescriptionPage({ id }: { id: string }) {
  const [showForm, setShowForm] = useState(false)

  // Get job data or use a default if not found
  const job = jobData[id] || {
    title: "Job Position",
    department: "Department",
    location: "Location",
    type: "Job Type",
    description: "This job posting is not available or has been removed.",
    responsibilities: [],
    requirements: [],
  }

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <Link href="/careers" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all positions
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm mb-6">
              <span className="bg-gray-800 px-3 py-1 rounded-full">{job.department}</span>
              <span className="bg-gray-800 px-3 py-1 rounded-full">{job.location}</span>
              <span className="bg-gray-800 px-3 py-1 rounded-full">{job.type}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl mb-8">{job.description}</p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mt-10 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                {!showForm ? (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-md w-full md:w-auto"
                  >
                    Apply Now
                  </Button>
                ) : (
                  <JobApplicationForm jobTitle={job.title} onCancel={() => setShowForm(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
