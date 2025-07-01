"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface RouteMapProps {
  origin: {
    lng: number
    lat: number
    name: string
  }
  destination: {
    lng: number
    lat: number
    name: string
  }
  title: string
  icon: React.ReactNode
  tags?: string[]
  meta?: string
  isDark?: boolean
  customZoom?: number
}

export default function RouteMap({
  origin,
  destination,
  title,
  icon,
  tags,
  meta,
  isDark = false,
  customZoom,
}: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [routeDistance, setRouteDistance] = useState<string>("")
  const [routeDuration, setRouteDuration] = useState<string>("")
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (map.current) return
    if (!mapContainer.current) return

    const initializeMap = async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default
        await import("mapbox-gl/dist/mapbox-gl.css")

        mapboxgl.accessToken = "pk.eyJ1IjoiaHVidCIsImEiOiJjbWFwbms3dHUwMGpjMmtvZ2U0emNmcGY1In0.FgBZjeyxQD5cJA6e8_4KfQ"

        // Calculate bounds to fit both points
        const bounds = new mapboxgl.LngLatBounds()
        bounds.extend([origin.lng, origin.lat])
        bounds.extend([destination.lng, destination.lat])

        // Calculate appropriate zoom level based on distance or use custom zoom
        let zoom = customZoom
        if (!customZoom) {
          const distance = Math.sqrt(
            Math.pow(destination.lng - origin.lng, 2) + Math.pow(destination.lat - origin.lat, 2),
          )
          zoom = distance > 1 ? 8 : distance > 0.5 ? 9 : distance > 0.1 ? 10 : 11
        }

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${isDark ? "dark" : "light"}-v11`,
          bounds: bounds,
          fitBoundsOptions: {
            padding: customZoom ? 80 : 50, // More padding for custom zoom
            maxZoom: zoom,
          },
          pitch: 30,
          bearing: 0,
          antialias: true,
        })

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        map.current.on("load", async () => {
          setMapLoaded(true)

          // Add origin marker (colored based on transport type)
          const originMarker = new mapboxgl.Marker({
            color: getMarkerColor(title),
            scale: 1.2,
          })
            .setLngLat([origin.lng, origin.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="p-3">
                  <h3 class="font-bold text-lg mb-1">${origin.name}</h3>
                  <p class="text-sm text-gray-600">Starting Point</p>
                  ${tags ? `<span class="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">#${tags[0]}</span>` : ""}
                </div>
              `),
            )
            .addTo(map.current)

          // Add destination marker (red)
          const destinationMarker = new mapboxgl.Marker({
            color: "#dc2626",
            scale: 1.2,
          })
            .setLngLat([destination.lng, destination.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="p-3">
                  <h3 class="font-bold text-lg mb-1">${destination.name}</h3>
                  <p class="text-sm text-gray-600">Destination</p>
                  <span class="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Sports Complex</span>
                </div>
              `),
            )
            .addTo(map.current)

          // Fetch and display route
          await fetchAndDisplayRoute()
        })

        map.current.on("error", (e: any) => {
          console.error("Mapbox error:", e)
          setMapError(`Map error: ${e.error?.message || "Unknown error"}`)
        })

        const fetchAndDisplayRoute = async () => {
          try {
            const response = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?geometries=geojson&access_token=pk.eyJ1IjoiaHVidCIsImEiOiJjbWFwbms3dHUwMGpjMmtvZ2U0emNmcGY1In0.FgBZjeyxQD5cJA6e8_4KfQ`,
            )

            if (!response.ok) {
              throw new Error("Failed to fetch route")
            }

            const data = await response.json()

            if (data.routes && data.routes.length > 0) {
              const route = data.routes[0]

              // Set route info
              const distanceKm = (route.distance / 1000).toFixed(1)
              const durationMin = Math.round(route.duration / 60)
              setRouteDistance(`${distanceKm} km`)
              setRouteDuration(`${durationMin} min`)

              // Add route line
              map.current.addSource("route", {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: route.geometry,
                },
              })

              map.current.addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": getRouteColor(title),
                  "line-width": customZoom ? 5 : 4, // Thicker line for zoomed maps
                  "line-opacity": 0.8,
                },
              })

              // Add route outline for better visibility
              map.current.addLayer({
                id: "route-outline",
                type: "line",
                source: "route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#ffffff",
                  "line-width": customZoom ? 7 : 6, // Thicker outline for zoomed maps
                  "line-opacity": 0.4,
                },
              })

              // Move route layers below markers
              map.current.moveLayer("route-outline")
              map.current.moveLayer("route")
            }
          } catch (error) {
            console.error("Error fetching route:", error)
            setMapError("Failed to load route information")
          }
        }
      } catch (error) {
        console.error("Error initializing map:", error)
        setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    const timer = setTimeout(() => {
      initializeMap()
    }, 500)

    return () => {
      clearTimeout(timer)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [origin, destination, title, isDark, customZoom])

  const getMarkerColor = (transportTitle: string) => {
    const colors = {
      "Proximity to NYC": "#9333ea", // purple
      "Airport Access": "#06b6d4", // cyan
      "Train Station": "#10b981", // green
      "Highway Access": "#3b82f6", // blue
    }
    return colors[transportTitle as keyof typeof colors] || "#3b82f6"
  }

  const getRouteColor = (transportTitle: string) => {
    const colors = {
      "Proximity to NYC": "#9333ea", // purple
      "Airport Access": "#06b6d4", // cyan
      "Train Station": "#10b981", // green
      "Highway Access": "#3b82f6", // blue
    }
    return colors[transportTitle as keyof typeof colors] || "#3b82f6"
  }

  if (mapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center p-6">
          <p className="text-red-500 font-medium mb-2">Map Error</p>
          <p className="text-sm text-gray-600">{mapError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      {/* Map container */}
      <div
        ref={mapContainer}
        className="w-full h-full rounded-xl"
        style={{ background: isDark ? "#242424" : "#f5f5f5" }}
      />

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl z-10">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent animate-spin"></div>
            <p className="mt-4 text-white">Loading route...</p>
          </div>
        </div>
      )}

      {/* Map overlay elements */}
      {mapLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Route title at the top center */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-4 left-0 right-0 flex justify-center"
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 inline-block">
              <h3 className="text-lg font-bold text-white">
                {origin.name} → {destination.name}
              </h3>
            </div>
          </motion.div>

          {/* Floating icon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-6 right-6 p-3 bg-black/70 backdrop-blur-md rounded-full"
          >
            <div className="text-2xl">{icon}</div>
          </motion.div>

          {/* Floating tag */}
          {tags && tags[0] && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-6 left-6 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg"
            >
              <span className="text-sm font-bold text-white">#{tags[0]}</span>
            </motion.div>
          )}

          {/* Route info card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute bottom-6 left-6 right-6 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-gray-800"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Distance: {routeDistance}</span>
              <span className="text-gray-300">Duration: {routeDuration}</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">{meta || "Driving route"}</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
