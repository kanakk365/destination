"use client"

import { Mountain, Building2, Maximize2, Minimize2, List, Layers, RotateCcw, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { MapStyle } from "./types"

interface FloatingControlsProps {
  is3DEnabled: boolean
  showTerrain: boolean
  showBuildings: boolean
  toggle3DMode: () => void
  toggleTerrain: () => void
  toggleBuildings: () => void
}

export function FloatingControls({
  is3DEnabled,
  showTerrain,
  showBuildings,
  toggle3DMode,
  toggleTerrain,
  toggleBuildings,
}: FloatingControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg z-10 border border-gray-100">
      <div className="flex items-center gap-2">
        <Button
          variant={is3DEnabled ? "default" : "outline"}
          size="sm"
          onClick={toggle3DMode}
          className={`h-9 px-4 font-medium rounded-lg transition-all ${
            is3DEnabled
              ? "bg-primary text-white shadow-md hover:bg-primary/90"
              : "text-gray-800 border-gray-200 hover:bg-gray-50"
          }`}
        >
          3D View
        </Button>

        {is3DEnabled && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showTerrain ? "default" : "outline"}
                    size="icon"
                    onClick={toggleTerrain}
                    className={`h-9 w-9 rounded-lg transition-all ${
                      showTerrain
                        ? "bg-primary text-white shadow-md hover:bg-primary/90"
                        : "text-gray-800 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Mountain className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
                  {showTerrain ? "Hide terrain" : "Show terrain"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showBuildings ? "default" : "outline"}
                    size="icon"
                    onClick={toggleBuildings}
                    className={`h-9 w-9 rounded-lg transition-all ${
                      showBuildings
                        ? "bg-primary text-white shadow-md hover:bg-primary/90"
                        : "text-gray-800 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Building2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
                  {showBuildings ? "Hide buildings" : "Show buildings"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
    </div>
  )
}

interface MapControlsProps {
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
}

export function MapControls({
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
}: MapControlsProps) {
  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-100">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLocationsList}
              className={`h-9 w-9 rounded-lg transition-all ${
                showLocationsList
                  ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white"
                  : "text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <List className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
            {showLocationsList ? "Hide locations list" : "Show locations list"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleHighlightedOnly}
              className={`h-9 w-9 rounded-lg transition-all ${
                showOnlyHighlighted
                  ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600 hover:text-white"
                  : "text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {showOnlyHighlighted ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
            {showOnlyHighlighted ? "Show all locations" : "Show only highlighted locations"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg text-gray-800 border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <Layers className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
              Change map style
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent
          align="end"
          className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-1"
        >
          {mapStyles.map((style) => (
            <DropdownMenuItem
              key={style.name}
              onClick={() => changeMapStyle(style)}
              className={`rounded-md my-1 text-sm font-medium transition-all ${
                currentStyle.name === style.name ? "bg-primary/10 text-primary" : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {style.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={resetView}
              className="h-9 w-9 rounded-lg text-gray-800 border-gray-200 hover:bg-gray-50 transition-all"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
            Reset view
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className={`h-9 w-9 rounded-lg transition-all ${
                isFullscreen
                  ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600 hover:text-white"
                  : "text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-gray-800 font-medium rounded-lg shadow-lg border border-gray-100">
            {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
