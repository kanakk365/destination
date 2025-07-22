import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Facilities from "@/components/facilities"
import Location from "@/components/location"
import RecreationActivities from "@/components/recreation-activities"
import SportsTechnology from "@/components/sports-technology"
import News from "@/components/news"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
// import Teams from "@/components/teams"

import Faq from "@/components/faq"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import CompanyLogos from "@/components/CompanyLogos"

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(16,16,20)] overflow-x-hidden">
      <Suspense fallback={<Loading />}>
        <Hero />
        <CompanyLogos/>
        <About />
        <Facilities />
        <Location />
        <SportsTechnology />
        <RecreationActivities />
        {/* <Teams /> */}
        <Faq />
        <Contact />
        <Newsletter />
        <News />
        <Footer />
      </Suspense>
    </main>
  )
}
