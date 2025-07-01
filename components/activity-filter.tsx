"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface ActivityFilterProps {
  isOpen: boolean
  onClose: () => void
  categoryId: string
  categoryTitle: string
  activeFilters: string[]
  onFiltersChange: (filters: string[]) => void
}

const filterOptions: Record<string, string[]> = {
  restaurants: [
    "Partners",
    "American",
    "Steak",
    "Italian",
    "Greek",
    "Asian",
    "Mexican",
    "Indian",
    "Portuguese",
    "Seafood",
    "Delis",
    "Pizzerias",
    "Fast Food",
    "Healthy",
    "Sweets",
    "Coffee",
    "Pub",
  ],
  entertainment: [
    "Concerts",
    "Theater",
    "Amusement Parks",
    "Golf",
    "Rock Climbing",
    "Axe Throwing",
    "Surf Park",
    "Paint Ball",
    "Arcade",
    "Trampoline",
    "Wineries",
    "Fishing",
    "Boating",
  ],
  shopping: ["Malls", "Boutique", "Outlets", "Supermarkets", "Sporting Goods", "Spirits"],
  events: ["Concerts", "Sports Events", "Festivals", "Community Events", "Private Events", "Seasonal Events"],
  "beaches-parks": [
    "Robert Moses",
    "Sunken Meadow",
    "Smiths Point",
    "Jones Beach",
    "Long Beach",
    "Hamptons",
    "Fire Island",
  ],
  health: ["Walk In", "Hospital", "Vitamin", "Recovery", "Beauty", "Hair", "Nails", "Pharmacy"],
}

const categoryGradients: Record<string, string> = {
  restaurants: "from-orange-600 to-red-600",
  entertainment: "from-purple-600 to-pink-600",
  shopping: "from-blue-600 to-cyan-600",
  events: "from-green-600 to-emerald-600",
  "beaches-parks": "from-teal-600 to-green-600",
  health: "from-pink-600 to-rose-600",
}

export default function ActivityFilter({
  isOpen,
  onClose,
  categoryId,
  categoryTitle,
  activeFilters,
  onFiltersChange,
}: ActivityFilterProps) {
  const [tempFilters, setTempFilters] = useState<string[]>(activeFilters)

  useEffect(() => {
    setTempFilters(activeFilters)
  }, [activeFilters, categoryId])

  if (!isOpen) return null

  const options = filterOptions[categoryId] || []
  const gradient = categoryGradients[categoryId] || "from-purple-600 to-blue-600"

  const handleFilterToggle = (filter: string) => {
    setTempFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const handleApply = () => {
    onFiltersChange(tempFilters)
    onClose()
  }

  const handleClear = () => {
    setTempFilters([])
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a1628] border border-white/10 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${gradient} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{categoryTitle} Filters</h2>
              <p className="text-white/80 text-sm mt-1">Select your preferences for {categoryTitle.toLowerCase()}</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Checkbox
                  id={option}
                  checked={tempFilters.includes(option)}
                  onCheckedChange={() => handleFilterToggle(option)}
                  className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <label htmlFor={option} className="text-sm text-gray-300 hover:text-white cursor-pointer flex-1">
                  {option}
                </label>
              </div>
            ))}
          </div>

          {options.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No filters available for this category yet.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-[#050a18]">
          <div className="text-sm text-gray-400">
            {tempFilters.length} filter{tempFilters.length !== 1 ? "s" : ""} selected
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-white/20 text-gray-300 hover:text-white hover:border-white/40"
            >
              Clear All
            </Button>
            <Button onClick={handleApply} className={`bg-gradient-to-r ${gradient} hover:opacity-90 text-white`}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
