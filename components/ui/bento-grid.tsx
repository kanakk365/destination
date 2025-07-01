"use client"

import type React from "react"

import { cn } from "@/lib/utils"

export interface BentoItem {
  title: string
  description: string
  icon: React.ReactNode
  status?: string
  tags?: string[]
  meta?: string
  cta?: string
  colSpan?: number
  hasPersistentHover?: boolean
}

interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 max-w-7xl mx-auto", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
            "border border-gray-100/10 dark:border-white/10 bg-white/5 dark:bg-black/20",
            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_2px_12px_rgba(59,130,246,0.2)]",
            "hover:-translate-y-0.5 will-change-transform",
            "col-span-1", // Always span 1 column in the grid
            {
              "shadow-[0_2px_12px_rgba(0,0,0,0.2)] -translate-y-0.5": item.hasPersistentHover,
              "dark:shadow-[0_2px_12px_rgba(59,130,246,0.2)]": item.hasPersistentHover,
            },
          )}
        >
          <div
            className={`absolute inset-0 ${
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 dark:bg-blue-500/20 group-hover:bg-gradient-to-br from-blue-500/20 to-blue-600/20 transition-all duration-300">
                {item.icon}
              </div>
              {item.status && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                    "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300",
                    "transition-colors duration-300 group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30",
                  )}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-white tracking-tight text-[15px] flex items-center">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-blue-300 dark:text-blue-400 font-normal">{item.meta}</span>
                )}
              </h3>
              <p className="text-sm text-gray-300 leading-snug font-[425]">{item.description}</p>
            </div>

            {(item.tags || item.cta) && (
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/20 dark:hover:bg-blue-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                {item.cta && (
                  <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.cta}
                  </span>
                )}
              </div>
            )}
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-blue-500/10 to-transparent dark:via-blue-500/20 ${
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  )
}

export { BentoGrid }
export type { BentoItem }
