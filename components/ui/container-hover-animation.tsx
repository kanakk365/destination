"use client"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export const ContainerHover = ({
  titleComponent,
  children,
  isActive = false,
}: {
  titleComponent?: string | React.ReactNode
  children: React.ReactNode
  isActive?: boolean
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [0.95, 1.05]
  }

  // Start with a more horizontal position (higher rotateX value)
  const rotate = useMotionValue(isActive ? 0 : 60)
  const scale = useMotionValue(isActive ? scaleDimensions()[1] : scaleDimensions()[0])
  const translateY = useMotionValue(isActive ? 0 : 0) // Removed the translateY effect

  // Update values when isActive changes
  useEffect(() => {
    const [scaleMin, scaleMax] = scaleDimensions()
    rotate.set(isActive ? 0 : 60) // More dramatic rotation
    scale.set(isActive ? scaleMax : scaleMin)
    translateY.set(0) // Keep centered
  }, [isActive, rotate, scale, translateY])

  // Add spring physics with more bounce for the dramatic effect
  const springConfig = { stiffness: 150, damping: 15, mass: 1 }
  const springRotate = useSpring(rotate, springConfig)
  const springScale = useSpring(scale, springConfig)
  const springTranslateY = useSpring(translateY, springConfig)

  return (
    <div className="h-full w-full flex items-center justify-center relative" ref={containerRef}>
      <div
        className="w-full h-full relative"
        style={{
          perspective: "1200px", // Increased perspective for more dramatic effect
        }}
      >
        {titleComponent && <Header translateY={springTranslateY} titleComponent={titleComponent} />}
        <Card rotate={springRotate} scale={springScale} translateY={springTranslateY}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({ translateY, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY,
      }}
      className="div max-w-5xl mx-auto text-center absolute top-0 left-0 right-0 z-10"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  translateY,
  children,
}: {
  rotate: any
  scale: any
  translateY: any
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // This creates the horizontal-to-vertical effect
        scale,
        translateY,
        transformOrigin: "center center", // Changed to center for better centering
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mx-auto h-full w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">{children}</div>
    </motion.div>
  )
}
