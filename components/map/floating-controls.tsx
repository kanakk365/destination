"use client"

import { Building2, Mountain } from "lucide-react"

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
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
      {/* 3D button removed */}
      {is3DEnabled && (
        <>
          <button
            onClick={toggleTerrain}
            className={`p-2 rounded-full shadow-lg ${
              showTerrain ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            title={showTerrain ? "Disable Terrain" : "Enable Terrain"}
          >
            <Mountain className="h-5 w-5" />
          </button>
          <button
            onClick={toggleBuildings}
            className={`p-2 rounded-full shadow-lg ${
              showBuildings ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            title={showBuildings ? "Disable 3D Buildings" : "Enable 3D Buildings"}
          >
            <Building2 className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  )
}
