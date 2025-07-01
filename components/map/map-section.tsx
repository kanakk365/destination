"use client"

import { useRef, useState, useEffect } from "react"
import { AlertCircle, Settings } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { longIslandLocations } from "@/data/long-island-locations"
import { MapSidebar } from "./map-sidebar"
import { MapLegend } from "./map-legend"
import { StyleSwitcher } from "./style-switcher"
import { add3DBuildings, createPopupHTML, createMainLocationPopupHTML } from "./map-utils"
import { LOCATION, LONG_ISLAND_CENTER, MAPBOX_ACCESS_TOKEN, CATEGORY_COLORS, MAP_STYLES, type MapStyle } from "./types"

// Fallback static map component
const StaticMap = () => {
  // Create a static map URL using Mapbox Static Images API
  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+dc2626(${LOCATION.lng},${LOCATION.lat})/${LOCATION.lng},${LOCATION.lat},13,0/800x500?access_token=${MAPBOX_ACCESS_TOKEN}`

  return (
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
          href={`https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Get Directions
        </a>
      </div>
    </div>
  )
}

// Consolidated dropdown menu for all map controls
function MapControlsDropdown({
  isFullscreen,
  showLocationsList,
  showOnlyHighlighted,
  currentStyle,
  toggleFullscreen,
  toggleLocationsList,
  toggleHighlightedOnly,
  changeMapStyle,
  resetView,
  mapStyles,
}: {
  isFullscreen: boolean
  showLocationsList: boolean
  showOnlyHighlighted: boolean
  currentStyle: MapStyle
  toggleFullscreen: () => void
  toggleLocationsList: () => void
  toggleHighlightedOnly: () => void
  changeMapStyle: (style: MapStyle) => void
  resetView: () => void
  mapStyles: MapStyle[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-1"
      >
        <DropdownMenuItem onClick={toggleLocationsList} className="cursor-pointer">
          {showLocationsList ? "Hide Locations List" : "Show Locations List"}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleHighlightedOnly} className="cursor-pointer">
          {showOnlyHighlighted ? "Show All Locations" : "Show Only Highlighted"}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={resetView} className="cursor-pointer">
          Reset View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleFullscreen} className="cursor-pointer">
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </DropdownMenuItem>

        {mapStyles.map((style) => (
          <DropdownMenuItem
            key={style.name}
            onClick={() => changeMapStyle(style)}
            className={`cursor-pointer ${currentStyle.name === style.name ? "bg-primary/10 text-primary" : ""}`}
          >
            {style.name} Style
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLocationsList, setShowLocationsList] = useState(false)
  const [activeCategories, setActiveCategories] = useState<string[]>(["beach", "attraction", "park", "historical"])
  const [activeTab, setActiveTab] = useState("all")
  const [is3DEnabled, setIs3DEnabled] = useState(false) // Start with 3D disabled for stability
  const [showBuildings, setShowBuildings] = useState(false)
  const [showTerrain, setShowTerrain] = useState(false)
  const [currentStyle, setCurrentStyle] = useState(MAP_STYLES[0]) // Default to dark theme
  const [mapboxgl, setMapboxgl] = useState<any>(null)
  const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false)
  const [useStaticMap, setUseStaticMap] = useState(false)
  const [mapInitAttempts, setMapInitAttempts] = useState(0)
  const MAX_INIT_ATTEMPTS = 3

  // Function to toggle between interactive and static map
  const toggleMapType = () => {
    setUseStaticMap(!useStaticMap)
  }

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Function to toggle locations list sidebar
  const toggleLocationsList = () => {
    setShowLocationsList(!showLocationsList)
  }

  // Function to toggle a category
  const toggleCategory = (category: string) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category))
    } else {
      setActiveCategories([...activeCategories, category])
    }
  }

  // Function to toggle showing only highlighted locations
  const toggleHighlightedOnly = () => {
    setShowOnlyHighlighted(!showOnlyHighlighted)
  }

  // Function to filter locations by category and highlighted status
  const filterLocations = () => {
    let filtered = longIslandLocations

    // Filter by tab/category
    if (activeTab !== "all") {
      filtered = filtered.filter((location) => location.category === activeTab)
    }

    // Filter by active categories
    filtered = filtered.filter((location) => activeCategories.includes(location.category))

    // Filter by highlighted status if needed
    if (showOnlyHighlighted) {
      filtered = filtered.filter((location) => location.highlighted)
    }

    return filtered
  }

  // Function to fly to a location
  const flyToLocation = (lng: number, lat: number) => {
    if (map.current) {
      try {
        map.current.flyTo({
          center: [lng, lat],
          zoom: 15,
          pitch: is3DEnabled ? 60 : 0,
          bearing: is3DEnabled ? 30 : 0,
          essential: true,
        })
      } catch (error) {
        console.error("Error flying to location:", error)
      }
    }
  }

  // Function to reset the view
  const resetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [LONG_ISLAND_CENTER.lng, LONG_ISLAND_CENTER.lat],
        zoom: 9,
        pitch: is3DEnabled ? 60 : 0,
        bearing: is3DEnabled ? 30 : 0,
        essential: true,
      })
    }
  }

  // Function to toggle 3D mode
  const toggle3DMode = () => {
    const newState = !is3DEnabled
    setIs3DEnabled(newState)

    if (map.current) {
      try {
        map.current.easeTo({
          pitch: newState ? 60 : 0,
          bearing: newState ? 30 : 0,
          duration: 1000,
        })
      } catch (error) {
        console.error("Error toggling 3D mode:", error)
      }
    }
  }

  // Function to toggle terrain
  const toggleTerrain = () => {
    const newState = !showTerrain
    setShowTerrain(newState)

    if (map.current && mapLoaded) {
      try {
        if (newState) {
          // Check if the source exists first
          if (!map.current.getSource("mapbox-dem")) {
            map.current.addSource("mapbox-dem", {
              type: "raster-dem",
              url: "mapbox://mapbox.mapbox-terrain-dem-v1",
              tileSize: 512,
              maxzoom: 14,
            })
          }
          map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
        } else {
          map.current.setTerrain(null)
        }
      } catch (error) {
        console.error("Error toggling terrain:", error)
      }
    }
  }

  // Function to toggle buildings
  const toggleBuildings = () => {
    const newState = !showBuildings
    setShowBuildings(newState)

    if (map.current && mapLoaded) {
      try {
        const buildingLayerId = "3d-buildings"
        if (newState) {
          if (!map.current.getLayer(buildingLayerId)) {
            add3DBuildings(map.current, currentStyle)
          } else {
            map.current.setLayoutProperty(buildingLayerId, "visibility", "visible")
          }
        } else if (map.current.getLayer(buildingLayerId)) {
          map.current.setLayoutProperty(buildingLayerId, "visibility", "none")
        }
      } catch (error) {
        console.error("Error toggling buildings:", error)
      }
    }
  }

  // Function to change map style
  const changeMapStyle = (style: MapStyle) => {
    if (map.current && mapLoaded) {
      try {
        setCurrentStyle(style)

        // Store current camera position
        const center = map.current.getCenter()
        const zoom = map.current.getZoom()
        const pitch = map.current.getPitch()
        const bearing = map.current.getBearing()

        // Change the style
        map.current.setStyle(style.url)

        // When the style is loaded, restore 3D settings and markers
        map.current.once("style.load", () => {
          try {
            // Restore camera position
            map.current.setCenter(center)
            map.current.setZoom(zoom)
            map.current.setPitch(pitch)
            map.current.setBearing(bearing)

            // Re-add terrain source and 3D settings
            if (is3DEnabled) {
              // Add terrain source
              if (showTerrain) {
                map.current.addSource("mapbox-dem", {
                  type: "raster-dem",
                  url: "mapbox://mapbox.mapbox-terrain-dem-v1",
                  tileSize: 512,
                  maxzoom: 14,
                })
                map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
              }

              // Add 3D buildings if enabled
              if (showBuildings) {
                add3DBuildings(map.current, style)
              }
            }

            // Re-add markers
            addLocationMarkers()
          } catch (error) {
            console.error("Error in style.load handler:", error)
          }
        })
      } catch (error) {
        console.error("Error changing map style:", error)
      }
    }
  }

  // Function to add markers for all locations
  const addLocationMarkers = async () => {
    if (!map.current || !mapLoaded || !mapboxgl) return

    try {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Add marker for the main location
      const mainMarker = new mapboxgl.Marker({
        color: CATEGORY_COLORS.main,
        scale: 1.2, // Make it slightly larger
      })
        .setLngLat([LOCATION.lng, LOCATION.lat])
        .setPopup(
          new mapboxgl.Popup({
            offset: 25,
            className: currentStyle.category === "dark" ? "dark-popup" : "",
          }).setHTML(createMainLocationPopupHTML(LOCATION)),
        )
        .addTo(map.current)

      markersRef.current.push(mainMarker)

      // Filter locations based on current filters
      const filteredLocations = filterLocations()

      // Add markers for all filtered locations
      filteredLocations.forEach((location) => {
        // Determine marker color based on highlighted status
        const markerColor = location.highlighted
          ? CATEGORY_COLORS.highlighted
          : CATEGORY_COLORS[location.category as keyof typeof CATEGORY_COLORS]

        // Determine marker scale based on highlighted status
        const markerScale = location.highlighted ? 1.3 : 1.0

        const marker = new mapboxgl.Marker({
          color: markerColor,
          scale: markerScale,
        })
          .setLngLat([location.lng, location.lat])
          .setPopup(
            new mapboxgl.Popup({
              offset: 25,
              className: currentStyle.category === "dark" ? "dark-popup" : "",
            }).setHTML(createPopupHTML(location, currentStyle.category === "dark")),
          )
          .addTo(map.current)

        markersRef.current.push(marker)
      })
    } catch (error) {
      console.error("Error adding location markers:", error)
    }
  }

  // Check if the container is ready for map initialization
  const isContainerReady = () => {
    if (!mapContainer.current) return false

    const { offsetWidth, offsetHeight } = mapContainer.current
    console.log(`Container dimensions: ${offsetWidth}x${offsetHeight}`)

    // Container must have positive dimensions
    return offsetWidth > 0 && offsetHeight > 0
  }

  // Initialize the map
  const initializeMapWithRetry = async () => {
    // Only initialize once
    if (map.current) return

    // Check if container is ready
    if (!isContainerReady()) {
      console.log("Container not ready yet, will retry...")

      // Increment attempt counter
      setMapInitAttempts((prev) => {
        const newCount = prev + 1
        console.log(`Initialization attempt ${newCount} of ${MAX_INIT_ATTEMPTS}`)

        // If we've reached max attempts, show static map
        if (newCount >= MAX_INIT_ATTEMPTS) {
          console.log("Max attempts reached, falling back to static map")
          setUseStaticMap(true)
          setMapError("Failed to initialize map after multiple attempts. Using static map instead.")
        }

        return newCount
      })

      // Try again after a delay, unless we've reached max attempts
      if (mapInitAttempts < MAX_INIT_ATTEMPTS - 1) {
        setTimeout(initializeMapWithRetry, 1000)
      }

      return
    }

    try {
      console.log("Container is ready, initializing map...")

      // Dynamic import of mapbox-gl to avoid SSR issues
      const mapboxglModule = await import("mapbox-gl")
      await import("mapbox-gl/dist/mapbox-gl.css")

      setMapboxgl(mapboxglModule.default)

      // Set the Mapbox access token
      mapboxglModule.default.accessToken = MAPBOX_ACCESS_TOKEN

      // Create the map instance with basic settings first
      console.log("Creating map instance...")
      const mapInstance = new mapboxglModule.default.Map({
        container: mapContainer.current!,
        style: currentStyle.url,
        center: [LONG_ISLAND_CENTER.lng, LONG_ISLAND_CENTER.lat],
        zoom: 9,
        pitch: 0, // Start with 2D for stability
        bearing: 0,
        antialias: true,
        failIfMajorPerformanceCaveat: false, // Allow fallback to lower performance
        preserveDrawingBuffer: true, // Needed for some browsers
      })

      map.current = mapInstance

      // Add basic controls
      mapInstance.addControl(new mapboxglModule.default.NavigationControl(), "top-right")
      mapInstance.addControl(new mapboxglModule.default.FullscreenControl(), "top-right")

      // Set up error handling
      mapInstance.on("error", (e: any) => {
        console.error("Mapbox error:", e)
        setMapError(`Map error: ${e.error?.message || "Unknown error"}`)
      })

      // Set up load handler
      mapInstance.on("load", () => {
        console.log("Map loaded successfully!")
        console.log(
          "Map container dimensions:",
          mapContainer.current?.offsetWidth,
          "x",
          mapContainer.current?.offsetHeight,
        )
        console.log("Map canvas dimensions:", mapInstance.getCanvas().width, "x", mapInstance.getCanvas().height)
        setMapLoaded(true)

        // Add markers after the map is loaded
        addLocationMarkers()

        // Force a resize to ensure the map renders correctly
        setTimeout(() => {
          console.log("Forcing map resize...")
          mapInstance.resize()
        }, 100)
      })
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : "Unknown error"}`)
      setUseStaticMap(true) // Fall back to static map
    }
  }

  // Initialize map when component mounts
  useEffect(() => {
    // Add a small delay to ensure the container is fully rendered
    setTimeout(() => {
      console.log("Starting map initialization...")
      initializeMapWithRetry()
    }, 1000)

    // Add resize handler to ensure map renders correctly when container size changes
    const handleResize = () => {
      if (map.current) {
        map.current.resize()
      }
    }

    window.addEventListener("resize", handleResize)

    // Return cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Update markers when filters change
  useEffect(() => {
    if (mapLoaded && mapboxgl && map.current) {
      addLocationMarkers()
    }
  }, [activeCategories, activeTab, showOnlyHighlighted, mapLoaded, mapboxgl])

  // If there's an error, show error message with option to use static map
  if (mapError && !useStaticMap) {
    return (
      <Card className="w-full border border-[#050a18]">
        <CardHeader className="bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-red-700">Interactive Map Error</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4 text-gray-700">{mapError}</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Debug Information:</h4>
            <p className="text-sm text-gray-600">Token Status: Using provided token</p>
            <p className="text-sm text-gray-600">Error Details: Check browser console for more information</p>
            <p className="text-sm text-gray-600 mt-2">
              Try refreshing the page or using a different browser if the issue persists.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setUseStaticMap(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Use Static Map Instead
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`w-full overflow-hidden border border-[#050a18] ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}
    >
      {useStaticMap ? (
        <StaticMap />
      ) : (
        <div className="relative flex">
          {/* Sidebar */}
          <MapSidebar
            showLocationsList={showLocationsList}
            toggleLocationsList={toggleLocationsList}
            activeCategories={activeCategories}
            toggleCategory={toggleCategory}
            showOnlyHighlighted={showOnlyHighlighted}
            toggleHighlightedOnly={toggleHighlightedOnly}
            is3DEnabled={is3DEnabled}
            toggle3DMode={toggle3DMode}
            showTerrain={showTerrain}
            toggleTerrain={toggleTerrain}
            showBuildings={showBuildings}
            toggleBuildings={toggleBuildings}
            currentStyle={currentStyle}
            changeMapStyle={changeMapStyle}
            mapStyles={MAP_STYLES}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filterLocations={filterLocations}
            flyToLocation={flyToLocation}
            isFullscreen={isFullscreen}
          />

          {/* Map container - Full width */}
          <div
            ref={mapContainer}
            className={`flex-1 map-container ${isFullscreen ? "h-[calc(100vh-120px)]" : "h-[600px]"}`}
            style={{ background: "#f0f0f0" }}
          />

          {/* Map Legend */}
          <MapLegend />

          {/* Style switcher and highlighted toggle for quick access */}
          <StyleSwitcher
            showOnlyHighlighted={showOnlyHighlighted}
            toggleHighlightedOnly={toggleHighlightedOnly}
            currentStyle={currentStyle}
            changeMapStyle={changeMapStyle}
            mapStyles={MAP_STYLES}
          />
        </div>
      )}

      <CardFooter className="p-3 text-sm text-gray-500 border-t border-[#050a18] flex justify-between items-center">
        <p>Powered by Mapbox</p>
        <div className="flex items-center gap-2">
          {!useStaticMap && (
            <>
              <p className="text-xs">Style: {currentStyle.name}</p>
              {showOnlyHighlighted && <Badge className="bg-emerald-500 text-xs">Showing Highlighted Locations</Badge>}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
