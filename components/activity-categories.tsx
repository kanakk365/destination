"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Filter, Star, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import ActivityFilter from "./activity-filter"

const categories = [
  {
    id: "restaurants",
    title: "Restaurants",
    description: "Dining experiences and culinary delights",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
        />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-600/20 to-red-600/20",
    hoverBorder: "hover:border-orange-400/50",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Fun activities and exciting experiences",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-600/20 to-pink-600/20",
    hoverBorder: "hover:border-purple-400/50",
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Retail therapy and unique finds",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-600/20 to-cyan-600/20",
    hoverBorder: "hover:border-blue-400/50",
  },
  {
    id: "events",
    title: "Events",
    description: "Special occasions and celebrations",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-600/20 to-emerald-600/20",
    hoverBorder: "hover:border-green-400/50",
  },
  {
    id: "beaches-parks",
    title: "Beaches & Parks",
    description: "Natural beauty and outdoor spaces",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    gradient: "from-teal-500 to-green-500",
    bgGradient: "from-teal-600/20 to-green-600/20",
    hoverBorder: "hover:border-teal-400/50",
  },
  {
    id: "health",
    title: "Health",
    description: "Wellness and healthcare services",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-600/20 to-rose-600/20",
    hoverBorder: "hover:border-pink-400/50",
  },
]

const categoryData = {
  restaurants: {
    title: "Restaurants",
    sponsors: [
      {
        id: "r1",
        name: "The Rustic Table",
        type: "American",
        rating: 4.8,
        distance: "0.5 miles",
        url: "https://www.facebook.com/RusticTableWinchester/",

        image: "https://i.postimg.cc/Y0CqWz4X/kayleigh-harrington-yhn4okt6ci0-unsplash.jpg",
        isSponsored: true,
      },
      {
        id: "r2",
        name: "Mario's Italian Bistro",
        type: "Italian",
        rating: 4.7,
        distance: "0.8 miles",
        url: "https://mariositalianrestaurant.com/",

        image: "https://i.postimg.cc/X7GftfqS/shawn-nmp-W-Www-VSc-unsplash.jpg",
        isSponsored: true,
      },
      {
        id: "r3",
        name: "Sakura Sushi Bar",
        type: "Asian",
        rating: 4.9,
        distance: "1.2 miles",
        url: "https://sakurajapanesesushibar.com/",

        image: "https://i.postimg.cc/J4F8KBY2/sebastian-schuppik-H7x-Tpv-Bj-JS4-unsplash.jpg",
        isSponsored: true,
      },
    ],
    regular: [
      {
        id: "r4",
        name: "Coastal Seafood House",
        type: "Seafood",
        rating: 4.6,
        distance: "1.5 miles",
        url: "https://www.coastalfishcompany.com/",

        image: "https://i.postimg.cc/TwXGXMrM/jenn-kosar-jr-Wo-DRmhw-RY-unsplash.jpg",
      },
      {
        id: "r5",
        name: "Burger Junction",
        type: "Fast Food",
        rating: 4.3,
        distance: "0.7 miles",
        url: "https://www.doordash.com/store/burger-junction-sacramento-29040813/54004148/",

        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/83/dd/6b/hard-rock-cafe-new-delhi.jpg?w=600&h=-1&s=1",
      },
      {
        id: "r6",
        name: "Green Garden Cafe",
        type: "Healthy",
        rating: 4.5,
        distance: "1.0 miles",
        url: "https://greengardencafe.net/",

        image:
          "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2016/09/170916_WheelchairAccessibleRestaurants_AllAmericanDiner.jpg?w=1200&h=628&fill=blur&fit=fill",
      },
      {
        id: "r7",
        name: "Steakhouse Prime",
        type: "Steak",
        rating: 4.8,
        distance: "2.1 miles",
        url: "https://www.primestkhouse.com/",

        image: "https://b.zmtcdn.com/data/pictures/0/20590850/cfe18427e6cef1fd090ca66f25beafa5_featured_v2.jpg",
      },
    ],
  },
  entertainment: {
    title: "Entertainment",
    sponsors: [
      {
        id: "e1",
        name: "Dave & Buster's",
        type: "Arcade",
        rating: 4.7,
        distance: "1.2 miles",
        url: "https://daveandbustersindia.com/",
        image: "https://i.postimg.cc/MpFypwQL/dave-and-buster.jpg",
        isSponsored: true,
      },
      {
        id: "e2",
        name: "Topgolf Long Island",
        type: "Trampoline",
        rating: 4.8,
        distance: "0.9 miles",
        url: "https://topgolf.com/us/holtsville/",
        image: "https://i.postimg.cc/PrRFwgGg/top-golf.jpg",
        isSponsored: true,
      },
      {
        id: "e3",
        name: "Splish Splash",
        type: "Axe Throwing",
        rating: 4.6,
        distance: "1.5 miles",
        url: "https://www.splishsplash.com/",
        image: "https://i.postimg.cc/fTZPsccP/splish-splash.jpg",
        isSponsored: true,
      },
    ],
    regular: [
      {
        id: "e4",
        name: "Go Carts",
        type: "Axe Throwing",
        rating: 4.5,
        distance: "2.0 miles",
        url: "https://www.rpmraceway.com/locations/long-island-ny",
        image: "https://i.postimg.cc/nhVBnzwZ/rpm-raceway.jpg",
      },
      {
        id: "e5",
        name: "Amc Theatres",
        type: "Rock Climbing",
        rating: 4.4,
        distance: "1.8 miles",
        url: "https://www.amctheatres.com/",
        image: "https://i.postimg.cc/GtTkD5nQ/amc-theaters.jpg",
      },
      {
        id: "e6",
        name: "Heartland Golf Park",
        type: "Wineries",
        rating: 4.9,
        distance: "3.2 miles",
        url: "https://heartlandgolfpark.com/",
        image: "https://i.postimg.cc/CLmq108g/heartland-golf-park.jpg",
      },
      {
        id: "e7",
        name: "The Adventure Park",
        type: "Wineries",
        rating: 4.9,
        distance: "3.2 miles",
        url: "https://myadventurepark.com/location/wheatley-heights-ny/",
        image: "https://i.postimg.cc/vmgynrSz/the-adventure-park.jpg",
      },
    ],
  },
  shopping: {
    title: "Shopping",
    sponsors: [
      {
        id: "s1",
        name: "Smith Haven Mall",
        type: "Malls",
        rating: 4.3,
        distance: "0.8 miles",
        url: "https://www.simon.com/mall/smith-haven-mall",
        image: "https://i.postimg.cc/Dy82r3DF/smith-haven-mall.jpg",
        isSponsored: true,
      },
      {
        id: "s2",
        name: "Walt WHitman Mall",
        type: "Malls",
        rating: 4.7,
        distance: "1.1 miles",
        url: "https://www.simon.com/mall/walt-whitman-shops",
        image: "https://assets.simon.com/htmlcontent/waltwhitman_lp_hero_1_20240927143829.jpg",
        isSponsored: true,
      },
      {
        id: "s3",
        name: "Roosevelt Field",
        type: "Malls",
        rating: 4.5,
        distance: "1.3 miles",
        url: "https://www.simon.com/mall/roosevelt-field",
        image: "https://assets.simon.com/content/SEARCH/102.jpg",
        isSponsored: true,
      },
    ],
    regular: [
      {
        id: "s4",
        name: "Americana",
        type: "Malls",
        rating: 4.2,
        distance: "2.5 miles",
        url: "https://americanaatbrand.com/",
        image: "https://i.postimg.cc/fRCBD1zt/americana-manhasset.jpg",
      },
      {
        id: "s5",
        name: "Tanger Outlet Mall",
        type: "Malls",
        rating: 4.4,
        distance: "0.6 miles",
        url: "https://www.tanger.com/deerpark",
        image:
          "https://www.tanger.com/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fblt1b696824a455b27c%2Fblt6e9ad56f90679061%2F68365d804758b63722e185cb%2FSummerOfSavings_June_HERO_V2.webp%3Fauto%3Dwebp%26quality%3D75&w=1080&q=72",
      },
      {
        id: "s6",
        name: "Huntington Shopping center",
        type: "Spirits",
        rating: 4.6,
        distance: "1.4 miles",
        url: "https://properties.federalrealty.com/property/huntington-shopping-center/3313989",
        image: "https://i.postimg.cc/BQQjRzVw/huntington-shopping-center.jpg",
      },
    ],
  },
  events: {
    title: "Events",
    sponsors: [
      {
        id: "ev1",
        name: "Bethpage Black Ryders Cup",
        type: "Concerts",
        rating: 4.8,
        distance: "1.0 miles",
        url: "https://www.rydercup.com/",
        image: "https://i.postimg.cc/sXdWTvjx/events1.webp",
        isSponsored: true,
      },
      {
        id: "ev2",
        name: "4th of July Fireworks",
        type: "Theater",
        rating: 4.7,
        distance: "0.7 miles",
        url: "https://www.discoverlongisland.com/blog/stories/post/celebrate-fourth-of-july-on-long-island/",
        image: "https://i.postimg.cc/Mp8wy2RP/events2.jpg",
        isSponsored: true,
      },
      {
        id: "ev3",
        name: "Polo Hamptons",
        type: "Sports Events",
        rating: 4.6,
        distance: "0.5 miles",
        url: "https://polohamptons.com/",
        image: "https://i.postimg.cc/T1D8DCPv/events3.jpg",
        isSponsored: true,
      },
    ],
    regular: [
      {
        id: "ev4",
        name: "Harvest Festival",
        type: "Festivals",
        rating: 4.5,
        distance: "1.2 miles",
        url: "https://harvestfestival.com/home",
        image:
          "https://images.squarespace-cdn.com/content/v1/5a60f55d29f18717fce46ab8/ea7a399a-0295-47ca-99e2-800ee1acb214/Capture.PNG",
      },
    ],
  },
  "beaches-parks": {
    title: "Beaches & Parks",
    sponsors: [
      {
        id: "bp1",
        name: "Robert Moses beach",
        type: "Beach",
        rating: 4.9,
        distance: "15 miles",
        url: "https://parks.ny.gov/parks/7/",
        image: "https://parks.ny.gov/photos/parks/94f071b4-74c0-482e-9276-2ae4b2789afe.jpg",
        isSponsored: true,
      },
      {
        id: "bp2",
        name: "Smiths Point",
        type: "Park",
        rating: 4.8,
        distance: "18 miles",
        url: "https://www.discoverlongisland.com/listing/smith-point-county-park/547/",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/bd/5e/b9/beach-at-various-times.jpg?w=1200&h=-1&s=1",
        isSponsored: true,
      },
      {
        id: "bp3",
        name: "Sunken Meadow Beach",
        type: "Sunken Meadow",
        rating: 4.7,
        distance: "12 miles",
        url: "https://parks.ny.gov/parks/37/",
        image: "https://parks.ny.gov/photos/parks/fd81177a-f3b3-4ede-8dc8-0c361a8580ec.jpg",
        isSponsored: true,
      },
    ],
    regular: [
      {
        id: "bp4",
        name: "Blydenburg Park",
        type: "Park",
        rating: 4.6,
        distance: "20 miles",
        url: "https://www.discoverlongisland.com/listing/blydenburgh-county-park/673/",
        image:
          "https://assets.simpleviewinc.com/simpleview/image/upload/crm/longisland/blydenburgh_DD514808-A8A5-896F-833173AEABABE65C-dd514700d820c90_dd515516-c6de-3417-2c187038aa3c19e3.jpg",
      },
      {
        id: "bp5",
        name: "Eisenhower Park",
        type: "Park",
        rating: 4.5,
        distance: "25 miles",
        url: "https://eisenhowerparkny.org/",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/15/21/57/veterans-memorial.jpg?w=1200&h=-1&s=1",
      },
      {
        id: "bp6",
        name: "Dix Hills Park",
        type: "Park",
        rating: 4.8,
        distance: "22 miles",
        url: "https://dixhillsmelvillehistory.org/dix-hills-park",
        image: "https://www.huntingtonny.gov/filestorage/13749/13843/15193/banner.jpg",
      },
    ],
  },
  health: {
    title: "Health",
    sponsors: [
      {
        id: "h1",
        name: "St Catherines Hospital",
        type: "Hospital",
        rating: 4.6,
        distance: "0.8 miles",
        image: "https://i.postimg.cc/nLm0qr8g/hospital1.png",
        url: "https://www.catholichealthli.org/st-catherine-siena-hospital",
        isSponsored: true,
      },
      {
        id: "h2",
        name: "City MD Walk in",
        type: "Hospital",
        rating: 4.8,
        distance: "1.2 miles",
        image: "https://i.postimg.cc/9Mj1b2CM/hospital2.jpg",
        url: " https://www.citymd.com/urgent-care-locations/ny/commack?utm_source=google&utm_medium=GMB_listings&utm_campaign=citymd_locations_GMB_listings",
        isSponsored: true,
      },
      {
        id: "h3",
        name: "CVS",
        type: "Hospital",
        rating: 4.7,
        distance: "1.5 miles",
        image: "https://i.postimg.cc/GhpKqqwk/hospital3.png",
        url: "https://www.cvs.com/store-locator/commack-ny-pharmacies/341-commack-rd-commack-ny-11725/storeid=5061?WT.mc_id=LS_GOOGLE_FS_5061",
        isSponsored: true,
      },
    ],
    regular: [
      {
        id: "h4",
        name: "QuickCare Walk-in",
        type: "Walk In",
        rating: 4.3,
        distance: "0.5 miles",
        url: "https://quickcaremed.com/",

        image: "https://www.internationalinsurance.com/wp-content/uploads/2017/10/united-states-hospital-database.jpg",
      },
      {
        id: "h5",
        name: "Vitamin World",
        type: "Vitamin",
        rating: 4.4,
        distance: "1.0 miles",
        url: "https://www.vitaminworld.com/?srsltid=AfmBOoqwWXwptPGZSzJ7rh6-44uJCbZd9BPf55BTFI30zVeL29a2Sz_r",

        image: "https://hospitalsmagazine.com/wp-content/uploads/2023/01/Cedars-Sinai-Beverly-Hills-Campus-copy.jpg",
      },
    ],
  },
}

export default function ActivityCategories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>("restaurants")
  const [showFilter, setShowFilter] = useState(false)
  const [categoryFilters, setCategoryFilters] = useState<Record<string, string[]>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const itemsPerPage = 4
  const totalPages = Math.ceil(categories.length / itemsPerPage)
  const INITIAL_ITEMS_COUNT = 3 // Show 3 items initially (1 row of 3)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getCurrentCategories = () => {
    const start = currentIndex * itemsPerPage
    return categories.slice(start, start + itemsPerPage)
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleFiltersChange = (categoryId: string, filters: string[]) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [categoryId]: filters,
    }))
  }

  const getActiveFiltersCount = (categoryId: string) => {
    return categoryFilters[categoryId]?.length || 0
  }

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const getVisibleItems = (categoryId: string) => {
    const currentData = categoryData[categoryId as keyof typeof categoryData]
    const isExpanded = expandedCategories[categoryId]

    if (isExpanded) {
      return currentData.regular
    }

    return currentData.regular.slice(0, INITIAL_ITEMS_COUNT)
  }

  const hasMoreItems = (categoryId: string) => {
    const currentData = categoryData[categoryId as keyof typeof categoryData]
    return currentData.regular.length > INITIAL_ITEMS_COUNT
  }

  return (
    <div className="mb-16">
      {/* Header with Filter Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Activity Categories</h2>
          <p className="text-gray-300">Click on any category to explore options</p>
        </div>
      </div>

      {/* Categories Slider */}
      <div className="relative mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getCurrentCategories().map((category) => {
            const activeFiltersCount = getActiveFiltersCount(category.id)
            const isSelected = selectedCategory === category.id
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`bg-gradient-to-br ${category.bgGradient} backdrop-blur-sm border ${
                  isSelected ? "border-purple-400" : "border-white/10"
                } rounded-xl p-6 ${category.hoverBorder} transition-all duration-300 cursor-pointer group relative ${
                  isSelected ? "ring-2 ring-purple-400/50" : ""
                }`}
              >
                {/* Active Filters Badge */}
                {activeFiltersCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                    {activeFiltersCount}
                  </div>
                )}

                <div
                  className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{category.description}</p>

                {/* Click to explore indicator */}
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {isSelected ? "Selected →" : "Click to explore →"}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <>
            <Button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </Button>
            <Button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2"
              size="sm"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </Button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mb-12 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-purple-500 w-6" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Selected Category Content */}
      {selectedCategory && (
        <div className="space-y-8">
          {/* Sponsors Section */}
          <div className="flex justify-between items-center mb-6">
            {getActiveFiltersCount(selectedCategory) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">{getActiveFiltersCount(selectedCategory)} filters active</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoryFilters((prev) => ({ ...prev, [selectedCategory]: [] }))}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            )}
            <Button
              onClick={() => setShowFilter(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter {categoryData[selectedCategory as keyof typeof categoryData]?.title}
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-semibold text-white">Featured Partners</h3>
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                SPONSORED
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryData[selectedCategory as keyof typeof categoryData].sponsors.map((item) => (
                <div
                  key={item.id}
                  onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                      SPONSOR
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-1">{item.name}</h4>
                    <p className="text-purple-400 text-sm mb-2">{item.type}</p>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regular Items Expandable Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                More {categoryData[selectedCategory as keyof typeof categoryData].title}
              </h3>
            </div>

            {/* Grid with exactly 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleItems(selectedCategory).map((item) => (
                <div
                  key={item.id}
                  onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 group cursor-pointer"
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-1">{item.name}</h4>
                    <p className="text-blue-400 text-sm mb-2">{item.type}</p>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expand/Collapse Button */}
            {hasMoreItems(selectedCategory) && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => toggleExpanded(selectedCategory)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  {expandedCategories[selectedCategory] ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show More (
                      {categoryData[selectedCategory as keyof typeof categoryData].regular.length - INITIAL_ITEMS_COUNT}{" "}
                      more)
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category-Specific Filter Modal */}
      {selectedCategory && (
        <ActivityFilter
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          categoryId={selectedCategory}
          categoryTitle={categoryData[selectedCategory as keyof typeof categoryData]?.title || ""}
          activeFilters={categoryFilters[selectedCategory] || []}
          onFiltersChange={(filters) => handleFiltersChange(selectedCategory, filters)}
        />
      )}
    </div>
  )
}
