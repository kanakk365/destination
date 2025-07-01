import mapboxgl from "mapbox-gl"
import type { Location, MapLocation, MapStyle } from "./types"

// Function to create a popup for a location
export function createPopup(location: MapLocation): mapboxgl.Popup {
  return new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
    className: "dark-popup",
    maxWidth: "300px",
  }).setHTML(createPopupHTML(location))
}

// Create a popup HTML for a location
export function createPopupHTML(location: Location, isDarkTheme = false): string {
  return `
    <div class="p-3">
      <h3 class="text-lg font-bold mb-1">${location.name}</h3>
      <p class="text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-2">${location.address}</p>
      <p class="text-sm mb-2">${location.description}</p>
      <div class="flex items-center gap-2 mb-2">
        <span class="px-2 py-1 text-xs rounded-full ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        }">${location.category}</span>
        ${
          location.highlighted
            ? `<span class="px-2 py-1 text-xs rounded-full ${
                isDarkTheme ? "bg-emerald-900 text-emerald-100" : "bg-emerald-100 text-emerald-800"
              }">Featured</span>`
            : ""
        }
      </div>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" 
         target="_blank" rel="noopener noreferrer" 
         class="text-sm text-blue-600 hover:text-blue-800">
        Get Directions
      </a>
    </div>
  `
}

// Create a popup HTML for the main location
export function createMainLocationPopupHTML(location: Location): string {
  return `
    <div class="p-3">
      <h3 class="text-lg font-bold mb-1">${location.name}</h3>
      <p class="text-sm text-gray-400 mb-2">${location.address}</p>
      <p class="text-sm mb-2">${location.description}</p>
      <div class="text-xs px-2 py-1 rounded-full inline-block bg-primary/20 text-primary">
        Main Location
      </div>
    </div>
  `
}

// Function to create a marker element
export function createMarkerElement(location: Location): HTMLDivElement {
  const el = document.createElement("div")
  el.className = `custom-marker marker-${location.category}`

  if (location.highlighted) {
    el.classList.add("marker-highlighted")
  }

  return el
}

// Function to filter locations by category
export function filterLocationsByCategory(locations: MapLocation[], categories: string[]): MapLocation[] {
  if (categories.length === 0) return []
  return locations.filter((location) => categories.includes(location.category))
}

// Function to filter locations by search term
export function filterLocationsBySearchTerm(locations: MapLocation[], searchTerm: string): MapLocation[] {
  if (!searchTerm) return locations

  const term = searchTerm.toLowerCase()
  return locations.filter(
    (location) =>
      location.name.toLowerCase().includes(term) ||
      location.address.toLowerCase().includes(term) ||
      location.description.toLowerCase().includes(term),
  )
}

// Function to fly to a location
export function flyToLocation(map: mapboxgl.Map, location: MapLocation): void {
  map.flyTo({
    center: [location.lng, location.lat],
    zoom: 15,
    pitch: 60,
    bearing: 0,
    essential: true,
    duration: 1500,
  })
}

// Add 3D buildings to the map
export function add3DBuildings(map: any, style: MapStyle): void {
  // Check if the style is loaded
  if (!map.isStyleLoaded()) {
    map.once("style.load", () => add3DBuildings(map, style))
    return
  }

  // Check if the layer already exists
  if (map.getLayer("3d-buildings")) {
    return
  }

  // Add 3D buildings layer
  map.addLayer({
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": style.category === "dark" ? "#aaa" : "#b0b0b5",
      "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
      "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
      "fill-extrusion-opacity": 0.6,
    },
  })
}
