"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { MapStyle } from "./types"

interface StyleSwitcherProps {
  showOnlyHighlighted: boolean
  toggleHighlightedOnly: () => void
  currentStyle: MapStyle
  changeMapStyle: (style: MapStyle) => void
  mapStyles: MapStyle[]
}

export function StyleSwitcher({
  showOnlyHighlighted,
  toggleHighlightedOnly,
  currentStyle,
  changeMapStyle,
  mapStyles,
}: StyleSwitcherProps) {
  return (
    <div className="absolute top-4 left-4 flex gap-2 z-10">
      <Button
        variant={showOnlyHighlighted ? "default" : "outline"}
        size="sm"
        onClick={toggleHighlightedOnly}
        className={`h-9 px-4 font-medium rounded-lg transition-all ${
          showOnlyHighlighted
            ? "bg-emerald-500 text-white shadow-md hover:bg-emerald-600"
            : "bg-white/90 backdrop-blur-sm text-gray-800 border-gray-200 hover:bg-gray-50"
        }`}
      >
        <Star className="h-4 w-4 mr-2" />
        {showOnlyHighlighted ? "Highlighted Only" : "All Locations"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 font-medium rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 border-gray-200 hover:bg-gray-50 transition-all"
          >
            Map Style
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-1"
        >
          <DropdownMenuLabel className="text-gray-500 font-medium px-3 py-2">Map Styles</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          {mapStyles.map((style) => (
            <DropdownMenuItem
              key={style.id}
              className={`rounded-md my-1 text-sm font-medium transition-all ${
                currentStyle.id === style.id ? "bg-primary/10 text-primary" : "text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => changeMapStyle(style)}
            >
              {style.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
