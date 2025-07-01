"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
import News from "@/components/news"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Building2 } from "lucide-react"

const pressReleases = [
  {
    id: 1,
    title: "Town of Smithtown Celebrates Groundbreaking on Destination KP Sports Park",
    description:
      "State-of-the-Art Sports Complex to Bring Athletic Facilities, Economic Growth, and Community Revitalization to Kings Park",
    source: "Town of Smithtown",
    url: "https://www.smithtownny.gov/",
    date: "2024",
    category: "Government",
    image: "https://www.smithtownny.gov/ImageRepository/Document?documentID=8217",
  },
  {
    id: 2,
    title: "Sports Facilities Companies to Operate Destination KP on Long Island",
    description: "Tim O'Connell has been appointed general manager of youth sports facility",
    source: "Sports Travel Magazine",
    url: "https://www.sportstravelmagazine.com/sports-facilities-companies-to-operate-destination-kp-on-long-island/",
    date: "2024",
    category: "Industry News",
    image: "https://media.sportstravelmagazine.com/wp-content/uploads/2025/02/10015954/Destination-KP.jpg",
  },
  {
    id: 3,
    title: "Town breaks ground on Kings Park's $92 million sports mecca",
    description: "Town officials and developers have broken ground on a $92 million sports complex in Kings Park.",
    source: "Greater Long Island",
    url: "https://greaterlongisland.com/town-breaks-ground-on-kings-parks-92-million-sports-mecca/",
    date: "2024",
    category: "Local News",
    image:
      "https://greaterlongisland.com/cdn-cgi/image/width=768,height=471,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2024/12/Destination-KP-inside.jpg",
  },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#050a18]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Latest Press Releases
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
              Discover the latest news and updates about Destination KP from trusted media sources
            </p>
          
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          

          <div className="space-y-8">
            {pressReleases.map((release) => (
              <Card
                key={release.id}
                className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => window.open(release.url, "_blank")}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Image */}
                  <div className="w-full md:w-96 h-64 md:h-auto">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                      <img
                        src={release.image || "/placeholder.svg"}
                        alt={release.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {release.category}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {release.date}
                      </div>
                    </div>

                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight group-hover:text-blue-300 transition-colors mb-4">
                      {release.title}
                    </h3>

                    <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">{release.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-medium">{release.source}</span>
                      <div className="flex items-center text-blue-300 group-hover:text-blue-200 transition-colors">
                        <span className="mr-2 text-sm">Read Full Article</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
      <section className="py-16 px-4 md:px-6 bg-black/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Media Enquiries
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            For press inquiries, interviews, or additional information about Destination KP, please contact our media
            relations team.
          </p>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-white font-semibold mb-2">Press Contact</h3>
            <p className="text-gray-300 text-sm mb-1">Destination KP Media Relations</p>
            <p className="text-blue-300 text-sm">press@destinationkp.com</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Newsletter Section */}
      <Newsletter />

      {/* News/Blogs Section */}
      <News />

      <Footer />
    </div>
  )
}
