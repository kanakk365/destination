"use client"

import { MapPin } from "lucide-react"
import type { Location } from "./types"

interface LocationsListProps {
  locations: Location[]
  flyToLocation: (lng: number, lat: number) => void
}

export function LocationsList({ locations, flyToLocation }: LocationsListProps) {
  return (
    <div className="p-4">
      {locations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="font-medium">No locations found.</p>
          <p className="text-sm mt-1">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
              onClick={() => flyToLocation(location.lng, location.lat)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    location.category === "beach"
                      ? "bg-blue-100 text-blue-600"
                      : location.category === "attraction"
                        ? "bg-amber-100 text-amber-600"
                        : location.category === "park"
                          ? "bg-green-100 text-green-600"
                          : location.category === "historical"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{location.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{location.address}</p>
                  {location.highlighted && (
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full mt-2 font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
