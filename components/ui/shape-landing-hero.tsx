"use client"

import { motion } from "framer-motion"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Update the ElegantShape function to support light mode
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  isLightTheme = false,
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  isLightTheme?: boolean
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            isLightTheme
              ? "backdrop-blur-[1px] border-2 border-white/[0.5]"
              : "backdrop-blur-[2px] border-2 border-white/[0.15]",
            isLightTheme ? "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]" : "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            isLightTheme
              ? "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]"
              : "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// Update the HeroGeometric function to support light mode
function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-blue-500/80" />
            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600")}> 
                {title2}
              </span>
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export { HeroGeometric }
