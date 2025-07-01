"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Location, MapStyle } from "./types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, Mountain, Building2 } from "lucide-react"
import { useState } from "react"
import { LocationsList } from "./locations-list"

interface MapSidebarProps {
  showLocationsList: boolean
  toggleLocationsList: () => void
  activeCategories: string[]
  toggleCategory: (category: string) => void
  showOnlyHighlighted: boolean
  toggleHighlightedOnly: () => void
  is3DEnabled: boolean
  toggle3DMode: () => void
  showTerrain: boolean
  toggleTerrain: () => void
  showBuildings: boolean
  toggleBuildings: () => void
  currentStyle: MapStyle
  changeMapStyle: (style: MapStyle) => void
  mapStyles: MapStyle[]
  activeTab: string
  setActiveTab: (tab: string) => void
  filterLocations: () => Location[]
  flyToLocation: (lng: number, lat: number) => void
  isFullscreen: boolean
}

export function MapSidebar({
  showLocationsList,
  toggleLocationsList,
  activeCategories,
  toggleCategory,
  showOnlyHighlighted,
  toggleHighlightedOnly,
  is3DEnabled,
  toggle3DMode,
  showTerrain,
  toggleTerrain,
  showBuildings,
  toggleBuildings,
  currentStyle,
  changeMapStyle,
  mapStyles,
  activeTab,
  setActiveTab,
  filterLocations,
  flyToLocation,
  isFullscreen,
}: MapSidebarProps) {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  if (!showLocationsList) {
    return null
  }

  return (
    <div
      className={`w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg ${
        isFullscreen ? "h-[calc(100vh-120px)]" : "h-[500px]"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-900">Nearby Locations</h3>
        <Button variant="ghost" size="icon" onClick={toggleLocationsList} className="text-gray-700 hover:bg-gray-200">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="beach"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Beaches
            </TabsTrigger>
            <TabsTrigger
              value="attraction"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Attractions
            </TabsTrigger>
            <TabsTrigger
              value="park"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Parks
            </TabsTrigger>
            <TabsTrigger
              value="historical"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Historical
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant={showOnlyHighlighted ? "default" : "outline"}
              size="sm"
              onClick={toggleHighlightedOnly}
              className={`h-9 w-full rounded-lg font-medium transition-all ${
                showOnlyHighlighted ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border-gray-200 text-gray-800"
              }`}
            >
              <Star className="h-4 w-4 mr-2" />
              {showOnlyHighlighted ? "Showing Highlighted Only" : "Show Highlighted Only"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="h-9 rounded-lg font-medium border-gray-200 text-gray-800 hover:bg-gray-50 transition-all"
            >
              {showAdvancedOptions ? "Hide Advanced Options" : "Show Advanced Options"}
            </Button>
          </div>

          {showAdvancedOptions && (
            <div className="mt-4 space-y-3 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Button
                  variant={is3DEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={toggle3DMode}
                  className={`h-9 w-full rounded-lg font-medium transition-all ${
                    is3DEnabled ? "bg-primary hover:bg-primary/90 text-white" : "border-gray-200 text-gray-800"
                  }`}
                >
                  {is3DEnabled ? "Disable 3D View" : "Enable 3D View"}
                </Button>
              </div>

              {is3DEnabled && (
                <div className="flex items-center gap-2">
                  <Button
                    variant={showTerrain ? "default" : "outline"}
                    size="sm"
                    onClick={toggleTerrain}
                    className={`h-9 flex-1 rounded-lg font-medium transition-all ${
                      showTerrain ? "bg-primary hover:bg-primary/90 text-white" : "border-gray-200 text-gray-800"
                    }`}
                  >
                    <Mountain className="h-4 w-4 mr-2" />
                    {showTerrain ? "Hide Terrain" : "Show Terrain"}
                  </Button>

                  <Button
                    variant={showBuildings ? "default" : "outline"}
                    size="sm"
                    onClick={toggleBuildings}
                    className={`h-9 flex-1 rounded-lg font-medium transition-all ${
                      showBuildings ? "bg-primary hover:bg-primary/90 text-white" : "border-gray-200 text-gray-800"
                    }`}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    {showBuildings ? "Hide Buildings" : "Show Buildings"}
                  </Button>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-sm font-semibold mb-2 text-gray-900">Map Style</h4>
                <div className="grid grid-cols-2 gap-2">
                  {mapStyles.slice(0, 4).map((style) => (
                    <Button
                      key={style.id}
                      variant={currentStyle.id === style.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeMapStyle(style)}
                      className={`h-9 rounded-lg font-medium transition-all ${
                        currentStyle.id === style.id
                          ? "bg-primary hover:bg-primary/90 text-white"
                          : "border-gray-200 text-gray-800"
                      }`}
                    >
                      {style.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="all" className="m-0">
            <LocationsList locations={filterLocations()} flyToLocation={flyToLocation} />
          </TabsContent>
          <TabsContent value="beach" className="m-0">
            <LocationsList locations={filterLocations()} flyToLocation={flyToLocation} />
          </TabsContent>
          <TabsContent value="attraction" className="m-0">
            <LocationsList locations={filterLocations()} flyToLocation={flyToLocation} />
          </TabsContent>
          <TabsContent value="park" className="m-0">
            <LocationsList locations={filterLocations()} flyToLocation={flyToLocation} />
          </TabsContent>
          <TabsContent value="historical" className="m-0">
            <LocationsList locations={filterLocations()} flyToLocation={flyToLocation} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
