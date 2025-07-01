import { CATEGORY_COLORS } from "./types"

export function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-10 max-w-xs">
      <h3 className="text-sm font-semibold mb-2 dark:text-white">Map Legend</h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS.main }}></span>
          <span className="text-xs dark:text-gray-300">Main Location</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS.highlighted }}></span>
          <span className="text-xs dark:text-gray-300">Highlighted Locations</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS.beach }}></span>
          <span className="text-xs dark:text-gray-300">Beaches</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS.attraction }}></span>
          <span className="text-xs dark:text-gray-300">Attractions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS.park }}></span>
          <span className="text-xs dark:text-gray-300">Parks</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS.historical }}></span>
          <span className="text-xs dark:text-gray-300">Historical Sites</span>
        </div>
      </div>
    </div>
  )
}
