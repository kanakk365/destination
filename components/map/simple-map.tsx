"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function SimpleMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Kings Park location
  const KINGS_PARK = {
    lng: -73.2261,
    lat: 40.8858,
    zoom: 13,
    name: "Kings Park Sports Complex",
    address: "350 Old Northport Road, Kings Park, NY 11754",
  }

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Check if the map is already initialized
    if (map.current) return

    // Check if the container exists
    if (!mapContainer.current) {
      setMapError("Map container not found")
      return
    }

    const initializeMap = async () => {
      try {
        console.log("Initializing map...")

        // Dynamically import mapbox-gl
        const mapboxgl = (await import("mapbox-gl")).default
        await import("mapbox-gl/dist/mapbox-gl.css")

        // Set access token
        mapboxgl.accessToken = "pk.eyJ1IjoiaHVidCIsImEiOiJjbWFwbms3dHUwMGpjMmtvZ2U0emNmcGY1In0.FgBZjeyxQD5cJA6e8_4KfQ"

        // Create map instance
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [KINGS_PARK.lng, KINGS_PARK.lat],
          zoom: KINGS_PARK.zoom,
          pitch: 45,
          bearing: 0,
          antialias: true,
        })

        // Add navigation control
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        // Handle map load
        map.current.on("load", () => {
          console.log("Map loaded successfully")
          setMapLoaded(true)

          // Add marker for Kings Park
          new mapboxgl.Marker({ color: "#dc2626" })
            .setLngLat([KINGS_PARK.lng, KINGS_PARK.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div style="padding: 10px;">
                  <h3 style="font-weight: bold; margin-bottom: 5px;">${KINGS_PARK.name}</h3>
                  <p style="font-size: 12px; color: #666;">${KINGS_PARK.address}</p>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=${KINGS_PARK.lat},${KINGS_PARK.lng}" 
                     target="_blank" rel="noopener noreferrer" 
                     style="font-size: 12px; color: #3b82f6; text-decoration: none;">
                    Get Directions
                  </a>
                </div>
              `),
            )
            .addTo(map.current)
        })

        // Handle map error
        map.current.on("error", (e: any) => {
          console.error("Mapbox error:", e)
          setMapError(`Map error: ${e.error?.message || "Unknown error"}`)
        })
      } catch (error) {
        console.error("Error initializing map:", error)
        setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    // Add a delay to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      initializeMap()
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Show error state if there's an error
  if (mapError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold text-red-500">Map Error</h2>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{mapError}</p>
          <p className="text-sm text-gray-500">
            Please check your internet connection and try refreshing the page. If the problem persists, please contact
            support.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4 bg-white flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-red-500" />
          <h2 className="font-medium">{KINGS_PARK.address}</h2>
        </div>
      </CardHeader>

      <div className="relative">
        {/* Map container */}
        <div
          ref={mapContainer}
          className="w-full h-[500px] bg-gray-100"
          style={{ background: "#242424" }} // Dark background while loading
        />

        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent animate-spin"></div>
              <p className="mt-4 text-white">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      <CardFooter className="p-3 text-sm text-gray-500 border-t">
        <p>Powered by Mapbox</p>
      </CardFooter>
    </Card>
  )
}
