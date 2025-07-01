"use client"

import { useState } from "react"
import { MapPin, MapIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { LOCATION, MAPBOX_ACCESS_TOKEN } from "./types"

export default function SimpleMapSection() {
  const [mapType, setMapType] = useState<"static" | "iframe">("static")

  // Static map URL using Mapbox Static Images API
  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+dc2626(${LOCATION.lng},${LOCATION.lat})/${LOCATION.lng},${LOCATION.lat},13,0/800x500?access_token=${MAPBOX_ACCESS_TOKEN}`

  // Mapbox GL JS iframe URL
  const iframeMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12.html?title=false&access_token=${MAPBOX_ACCESS_TOKEN}#13/${LOCATION.lat}/${LOCATION.lng}`

  // Google Maps URL for directions
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}`

  return (
    <section className="py-16 bg-[rgb(16,16,20)]" id="map">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-text-shine">
          Explore Long Island
        </h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          Discover beautiful beaches, exciting attractions, and historical sites around Kings Park, New York.
        </p>
      </div>

      {/* Map type toggle buttons */}
      <div className="container mx-auto px-4 mb-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMapType("static")}
            className={`px-4 py-2 rounded-md transition-colors ${
              mapType === "static" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Static Map
          </button>
          <button
            onClick={() => setMapType("iframe")}
            className={`px-4 py-2 rounded-md transition-colors ${
              mapType === "iframe" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Interactive Map
          </button>
        </div>
      </div>

      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="font-medium text-white">{LOCATION.address}</h2>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {mapType === "static" ? (
            <div className="relative w-full h-[500px]">
              <img
                src={staticMapUrl || "/placeholder.svg"}
                alt={`Map of ${LOCATION.name}`}
                className="w-full h-full object-cover"
                style={{ background: "#f0f0f0" }}
              />
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-1">{LOCATION.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{LOCATION.address}</p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full h-[500px]">
              <iframe
                src={iframeMapUrl}
                title="Interactive Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-3 text-sm text-gray-500 border-t flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapIcon className="h-4 w-4" />
            <p>Powered by Mapbox</p>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View in Google Maps
          </a>
        </CardFooter>
      </Card>
    </section>
  )
}
