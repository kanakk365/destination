"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import type React from "react"
import { useTheme } from "next-themes"

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  icon?: React.ReactNode
  className?: string
}

// Update the ButtonColorful component to use the gradient by default
export function ButtonColorful({
  className,
  label = "Explore Components",
  icon = <ArrowUpRight className="w-3.5 h-3.5 text-white" />,
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "relative h-10 px-4 overflow-hidden",
        "bg-gradient-to-r from-purple-600 to-blue-600",
        "hover:from-purple-700 hover:to-blue-700",
        "text-white font-medium",
        "transition-all duration-200",
        "group",
        className,
      )}
      {...props}
    >
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-white">{label}</span>
        {icon}
      </div>
    </Button>
  )
}

// Update the ButtonColorfulSecondary component to support light mode
export function ButtonColorfulSecondary({
  className,
  label = "Explore Components",
  icon = <ArrowUpRight className="w-3.5 h-3.5 text-white" />,
  ...props
}: ButtonColorfulProps) {
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  return (
    <Button
      variant="outline"
      className={cn(
        "relative h-10 px-4 overflow-hidden",
        "bg-transparent",
        isLightTheme ? "border-gray-300 text-gray-800" : "border-white/20 text-white",
        isLightTheme
          ? "hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-blue-600/10"
          : "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20",
        "font-medium",
        "transition-all duration-200",
        "group",
        className,
      )}
      {...props}
    >
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <span className={isLightTheme ? "text-gray-800" : "text-white"}>{label}</span>
        {icon}
      </div>
    </Button>
  )
}

function ButtonDemo() {
  return <ButtonColorful />
}

export { ButtonDemo }
