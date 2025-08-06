import React from "react";
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MapSection from "@/components/map/map-section"
import { AdsSection } from "@/components/ads-section"
import Loading from "@/components/loading"
import ActivityCategories from "@/components/activity-categories"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
import News from "@/components/news"
import { promoSlides,sliderConfig } from "@/data/slider-data"
import { Slider } from "@/components/sliders"
export default function TodoPage() {

  return (
    <main className="min-h-screen bg-[#050a18]">
      <Navbar />
      <Suspense fallback={<Loading />}>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-[#050a18]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  Things To Do
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Discover exciting activities, attractions, and experiences around Kings Park, New York. From dining and
                entertainment to beaches and wellness, find your perfect activity.
              </p>
            </div>
             <Slider
                slides={promoSlides}
                {...sliderConfig}
              />
              <div className="mt-6"></div>
            {/* Activity Categories with Slider and Filter */}
            <ActivityCategories />
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="py-16 bg-[#050a18]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  Plan Your Perfect Day
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Use our interactive map above to explore all the amazing locations and activities around Kings Park.
                Apply filters to find exactly what you're looking for.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Discover Locations</h3>
                  <p className="text-gray-300">Explore restaurants, beaches, entertainment venues, and more</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Filter & Find</h3>
                  <p className="text-gray-300">Use advanced filters to find exactly what you're looking for</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
                  <p className="text-gray-300">Find the best activities and optimize your schedule</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Long Island Section */}
        <section className="py-16 bg-[#050a18]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  Explore Long Island
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Discover beautiful beaches, exciting attractions, and historical sites around Kings Park, New York.
              </p>
            </div>

            {/* Map and Ads Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Map Section - Full width on mobile, 70% on desktop */}
              <div className="w-full lg:w-[70%]">
                <MapSection />
              </div>

              {/* Ads Section - Full width on mobile, 30% on desktop */}
              <div className="w-full lg:w-[30%]">
                <AdsSection />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* Newsletter Section */}
        <Newsletter />

        {/* News/Blogs Section */}
        <News />
      </Suspense>
      <Footer />
    </main>
  )
}
