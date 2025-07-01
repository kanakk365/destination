"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobApplicationForm from "@/components/job-application-form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { jobData } from "@/data/job-data"

interface JobPageClientProps {
  params: {
    id: string
  }
}

export default function JobPageClient({ params }: JobPageClientProps) {
  const [showForm, setShowForm] = useState(false)

  // Get job ID from params
  const jobId = params?.id

  // Debug: Log the ID and available keys
  console.log("Job ID from params:", jobId)
  console.log("Available job keys:", Object.keys(jobData))

  // Get job data
  const job = jobId ? jobData[jobId] : null

  // If job not found, show error message with clickable job links
  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <Link href="/careers" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all positions
            </Link>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Job Not Found</h1>
              <p className="text-gray-400 mb-8 text-center">
                The job position you're looking for doesn't exist or has been removed.
              </p>
              <p className="text-sm text-gray-500 mb-8 text-center">Job ID: "{jobId || "undefined"}"</p>

              <div className="bg-gray-900 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Available Positions:</h2>
                <div className="grid gap-3">
                  {Object.entries(jobData).map(([id, jobInfo]) => (
                    <Link
                      key={id}
                      href={`/careers/${id}`}
                      className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white">{jobInfo.title}</h3>
                          <p className="text-sm text-gray-400">{jobInfo.location}</p>
                        </div>
                        <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">{jobInfo.type}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">ID: {id}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/careers"
                  className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md font-medium"
                >
                  View All Positions
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-20">
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
      <Footer />
    </div>
  )
}
