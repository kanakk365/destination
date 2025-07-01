"use client"

import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdvertisingSection from "@/components/advertising-section"
import Newsletter from "@/components/newsletter"
import Loading from "@/components/loading"

export default function AdvertisingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <main>
          <AdvertisingSection />
          <Newsletter />
        </main>
      </Suspense>
      <Footer />
    </div>
  )
}
