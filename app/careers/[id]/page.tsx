import { jobData } from "@/data/job-data"
import JobPageClient from "./JobPageClient"

interface PageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: PageProps) {
  return <JobPageClient params={params} />
}

// Generate static params for all job IDs
export async function generateStaticParams() {
  return Object.keys(jobData).map((id) => ({
    id: id,
  }))
}
