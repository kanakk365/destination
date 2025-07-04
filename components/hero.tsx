"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ButtonColorful } from "@/components/ui/button-colorful";
import Image from "next/image";

// First, import the useTheme hook to detect the current theme
import { useTheme } from "next-themes";

// Update the Hero component to use theme detection
export default function Hero() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  return (
    <section className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Soccer ball animations on both sides - responsive for all breakpoints */}
      {/* Left soccer ball video, vertically centered with Destination text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute z-10 pointer-events-none 
          left-5 top-[55%] 
          sm:left-10 sm:top-[18%] 
          md:left-10 md:top-[19%] 
          lg:left-16 lg:top-[20%] 
          xl:left-24 xl:top-[22%] 
          2xl:left-3 2xl:top-[24%] 
          -translate-y-1/2"
      >
        <div className="opacity-40 hover:opacity-60 transition-all duration-500
          w-40 h-40
          sm:w-32 sm:h-32 
          md:w-44 md:h-44 
          lg:w-56 lg:h-56 
          xl:w-64 xl:h-64 
          2xl:w-[20rem] 2xl:h-[20rem]">
          <img
            src="/vid/vid2.gif"
            alt="Soccer ball animation"
            className="w-full h-full object-contain filter brightness-110 rotate-90"
          />
        </div>
      </motion.div>

      {/* Right soccer ball video, vertically centered with Destination text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
        className="absolute z-10 pointer-events-none 
          right-7 top-[18%] 
          sm:right-4 sm:top-[18%] 
          md:right-10 md:top-[19%] 
          lg:right-16 lg:top-[20%] 
          xl:right-24 xl:top-[22%] 
          2xl:right-3 2xl:top-[24%] 
          -translate-y-1/2"
      >
        <div className="opacity-40 hover:opacity-60 transition-all duration-500
          w-40 h-40
          sm:w-32 sm:h-32 
          md:w-44 md:h-44 
          lg:w-56 lg:h-56 
          xl:w-64 xl:h-64 
          2xl:w-[20rem] 2xl:h-[20rem]">
          <img
            src="/vid/vid1.gif"
            alt="Soccer ball animation"
            className="w-full h-full object-contain filter brightness-110 rotate-90"
          />
        </div>
      </motion.div>

      <HeroGeometric
        badge="Opening January 2026"
        title1="Destination"
        title2="KP"
      />

      {/* Custom text with responsive positioning and sizing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-36 left-0 right-0 z-20 text-center px-4"
      >
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ${
            isLightTheme ? "text-gray-700/80" : "text-white/60"
          } font-light tracking-wide max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto leading-relaxed`}
        >
          The Future of Long Island Youth Sports
        </p>
      </motion.div>

      {/* Responsive button section */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-0 right-0 z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-lg mx-auto"
        >
          <ButtonColorful
            label="Explore Facilities"
            icon={
              <ArrowRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-white`} />
            }
            onClick={() => {
              const element = document.getElementById("about");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
}
