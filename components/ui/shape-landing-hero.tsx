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
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${isLightTheme ? "bg-[rgb(245,245,250)]" : "bg-[rgb(16,16,20)] dark:bg-[rgb(16,16,20)]"}`}
    >
      <div
        className={`absolute inset-0 ${isLightTheme ? "bg-gradient-to-br from-blue-500/[0.03] via-transparent to-blue-500/[0.03]" : "bg-gradient-to-br from-blue-500/[0.05] via-transparent to-blue-500/[0.05]"} blur-3xl`}
      />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient={isLightTheme ? "from-blue-500/[0.08]" : "from-blue-500/[0.15]"}
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          isLightTheme={isLightTheme}
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient={isLightTheme ? "from-blue-400/[0.08]" : "from-blue-400/[0.15]"}
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          isLightTheme={isLightTheme}
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient={isLightTheme ? "from-blue-600/[0.08]" : "from-blue-600/[0.15]"}
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          isLightTheme={isLightTheme}
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient={isLightTheme ? "from-blue-300/[0.08]" : "from-blue-300/[0.15]"}
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          isLightTheme={isLightTheme}
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient={isLightTheme ? "from-blue-500/[0.08]" : "from-blue-500/[0.15]"}
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          isLightTheme={isLightTheme}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isLightTheme ? "bg-white/[0.5] border border-gray-200" : "bg-white/[0.03] border border-white/[0.08]"} mb-8 md:mb-12`}
          >
            <Circle className={`h-2 w-2 ${isLightTheme ? "fill-blue-500" : "fill-blue-500/80"}`} />
            <span className={`text-sm ${isLightTheme ? "text-gray-700" : "text-white/60"} tracking-wide`}>{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
              {/* Restored the original bottom margin */}
              <span
                className={`bg-clip-text text-transparent ${isLightTheme ? "bg-gradient-to-b from-gray-800 to-gray-600" : "bg-gradient-to-b from-white to-white/80"}`}
              >
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

      <div
        className={`absolute inset-0 ${isLightTheme ? "bg-gradient-to-t from-[rgb(245,245,250)] via-transparent to-[rgb(245,245,250)]/80" : "bg-gradient-to-t from-[rgb(16,16,20)] via-transparent to-[rgb(16,16,20)]/80"} pointer-events-none`}
      />
    </div>
  )
}

export { HeroGeometric }
