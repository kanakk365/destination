"use client";

import React from "react";
import { Cover } from "@/components/ui/cover";
import { Spotlight } from "../components/ui/spotlight-new";
import Navbar from "./navbar";

const Hero = () => {
  return (
    <section
      id="voicebot-hero"
      className="relative w-full bg-black text-white pt-20 lg:mt-20 lg:pt-12 overflow-hidden"
    >
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Spotlight />
        <div className="w-full flex flex-col lg:flex-row items-center justify-between py-16 lg:py-24  ">
          {/* Left Content */}
          <div className="w-full lg:w-[60%] mb-12 lg:mb-0">
            <div className="w-full">
              <div className="w-full">
                <div className="mb-8">
                  {/* <HoverBorderGradient
            containerClassName="rounded-full"
            as="div"
            className=" text-[#D1AAD7] px-4 py-1 tracking-[3px] text-xs md:px-5 md:py-2 lg:text-xs uppercase"
            duration={2}
          >
            Opening January 2026
          </HoverBorderGradient> */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 space-y-4 text-center sm:text-left">
                    <div className="sm:mb-4">
                      Future of Long Island{" "}
                    </div>
                    <span className="  relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600  ">
                      Youth Sports
                    </span>
                  </h1>
                </div>
                <div className="mb-8 sm:pr-20">
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-center sm:text-left">
                    Destination KP is a premier youth sports complex in Kings
                    Park, Long Island,opening
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                      {" "}
                      January 2026.
                    </span>
                  </p>
                </div>
                <div className="w-full flex flex-col sm:flex-row gap-4">
                  <button className="css-a0ww07 relative bg-white cursor-pointer text-black font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 group overflow-hidden">
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <span>Explore Facilities</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>
                  {/* Gradient hover effect CSS moved to globals.css */}
                  {/* <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                    <span className="flex items-center justify-center">
                      <span>About Destination KP</span>
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="w-full lg:w-[40%] flex lg:justify-end lg:pr-4 ">
            <div className="w-96 h-96">
              <video
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
