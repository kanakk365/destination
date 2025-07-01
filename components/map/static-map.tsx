import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function StaticMap() {
  // Kings Park location
  const KINGS_PARK = {
    lat: 40.8858,
    lng: -73.2261,
    name: "Kings Park Sports Complex",
    address: "350 Old Northport Road, Kings Park, NY 11754",
  }

  // Create a static map URL using Mapbox Static Images API
  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+dc2626(${KINGS_PARK.lng},${KINGS_PARK.lat})/${KINGS_PARK.lng},${KINGS_PARK.lat},13,0/800x500?access_token=pk.eyJ1IjoiaHVidCIsImEiOiJjbWFwbms3dHUwMGpjMmtvZ2U0emNmcGY1In0.FgBZjeyxQD5cJA6e8_4KfQ`

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4 bg-white flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-red-500" />
          <h2 className="font-medium">{KINGS_PARK.address}</h2>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative">
          <img
            src={staticMapUrl || "/placeholder.svg"}
            alt={`Map of ${KINGS_PARK.name}`}
            className="w-full h-[500px] object-cover"
            style={{ background: "#242424" }}
          />
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-1">{KINGS_PARK.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{KINGS_PARK.address}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${KINGS_PARK.lat},${KINGS_PARK.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Get Directions
            </a>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 text-sm text-gray-500 border-t">
        <p>Powered by Mapbox</p>
      </CardFooter>
    </Card>
  )
}
