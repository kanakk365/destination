// Mapbox access token - Replace with your actual token
export const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiaHVidCIsImEiOiJjbWFwbms3dHUwMGpjMmtvZ2U0emNmcGY1In0.FgBZjeyxQD5cJA6e8_4KfQ"

// Main location (Kings Park Sports Complex)
export const LOCATION = {
  id: "main",
  name: "Kings Park Sports Complex",
  address: "350 Old Northport Road, Kings Park, NY 11753",
  description: "Premier sports facility in Long Island offering state-of-the-art amenities for athletes of all ages.",
  lng: -73.2457,
  lat: 40.8865,
  category: "main",
  highlighted: true,
  image: "/images/kings-park-sports-aerial.png",
}

// Center of Long Island for initial map view
export const LONG_ISLAND_CENTER = {
  lng: -73.2457,
  lat: 40.8865,
  zoom: 10,
}

// Category colors for map markers - Updated with new color scheme
export const CATEGORY_COLORS = {
  main: "#dc2626", // Red color for main location
  highlighted: "#0037c0", // Deep blue for highlighted locations
  beach: "#7b53c6", // Medium purple for beaches
  attraction: "#4755bb", // Blue-purple for attractions
  park: "#48c4bc", // Teal/turquoise for parks
  historical: "#b55fc2", // Purple/magenta for historical sites (reusing first color)
}

// Map styles
export const MAP_STYLES = [
  {
    id: "dark",
    name: "Dark",
    description: "Dark theme with subtle details",
    url: "mapbox://styles/mapbox/dark-v11",
    category: "dark",
    iconName: "moon",
  },
  {
    id: "light",
    name: "Light",
    description: "Clean, light theme for daytime viewing",
    url: "mapbox://styles/mapbox/light-v11",
    category: "light",
    iconName: "sun",
  },
  {
    id: "streets",
    name: "Streets",
    description: "Detailed street map",
    url: "mapbox://styles/mapbox/streets-v12",
    category: "standard",
    iconName: "map",
  },
  {
    id: "satellite",
    name: "Satellite",
    description: "Satellite imagery with street overlays",
    url: "mapbox://styles/mapbox/satellite-streets-v12",
    category: "satellite",
    iconName: "map",
  },
]

// Location type definition
export interface Location {
  id: string | number
  name: string
  address: string
  description: string
  lng: number
  lat: number
  category: string
  highlighted: boolean
  image?: string
}

// Map style type definition
export interface MapStyle {
  id: string
  name: string
  description: string
  url: string
  category: string
  iconName: string
}
