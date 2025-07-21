"use client";

import React, { useState } from "react";

const CompanyLogos = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: "Youth Sports Organizations",
      description: "Trusted by leading youth sports organizations",
    },
    {
      title: "Educational Institutions", 
      description: "Partnering with schools and academies",
    },
    {
      title: "Community Partners",
      description: "Supporting local communities and businesses",
    }
  ];

  // For now using placeholder company names - you can replace these with actual logos later
  const logoSets = [
    [
      { name: "NY Youth Soccer", alt: "New York Youth Soccer Association" },
      { name: "LI Baseball", alt: "Long Island Baseball League" },
      { name: "Elite Training", alt: "Elite Sports Training Center" },
      { name: "Champions FC", alt: "Champions Football Club" },
      { name: "Future Stars", alt: "Future Stars Academy" },
    ],
    [
      { name: "Kings Park Schools", alt: "Kings Park School District" },
      { name: "Sports Academy", alt: "Long Island Sports Academy" },
      { name: "Youth Development", alt: "Youth Development Institute" },
      { name: "Athletic Foundation", alt: "Athletic Excellence Foundation" },
    ],
    [
      { name: "Kings Park Chamber", alt: "Kings Park Chamber of Commerce" },
      { name: "Local Business", alt: "Local Business Alliance" },
      { name: "Community Center", alt: "Community Recreation Center" },
      { name: "Parks & Rec", alt: "Parks and Recreation Department" },
      { name: "Youth Council", alt: "Youth Sports Council" },
    ]
  ];

  return (
    <section className="py-12 lg:py-16 bg-black ">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Category buttons for desktop */}
          <div className="hidden lg:block mb-8">
            <p className="text-sm leading-6 text-neutral-400 mb-4">
              Destination KP partners with{" "}
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <button
                    className={`section-title inline-block relative cursor-pointer transition-colors duration-300 ${
                      activeCategory === index 
                        ? "text-white" 
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                    type="button"
                    onClick={() => setActiveCategory(index)}
                  >
                    {category.title}
                    <div 
                      className={`transition-opacity duration-300 absolute bottom-0 h-[1px] w-full bg-gray-600 ${
                        activeCategory === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div 
                      className={`transition-all duration-300 absolute bottom-0 h-[1px] w-full bg-white origin-left ${
                        activeCategory === index 
                          ? "opacity-100 scale-x-100" 
                          : "opacity-0 scale-x-0"
                      }`}
                    />
                  </button>
                  {index < categories.length - 1 && (
                    <span className="text-neutral-400">
                      {index === categories.length - 2 ? " & " : ", "}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Mobile description */}
          <div className="lg:hidden mb-8">
            <p className="text-sm leading-6 text-neutral-400">
              Destination KP partners with{" "}
              <span className="text-white">Youth Sports Organizations</span>,{" "}
              <span className="text-white">Educational Institutions</span> &{" "}
              <span className="text-white">Community Partners</span>
            </p>
          </div>
        </div>

        {/* Desktop logo grid */}
        <div className="hidden lg:block">
          <div className="relative h-16 overflow-hidden">
            {logoSets.map((logoSet, setIndex) => (
              <div
                key={setIndex}
                className={`logos absolute w-full top-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                  activeCategory === setIndex 
                    ? "opacity-100 delay-300" 
                    : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-5 gap-8 items-center justify-items-center">
                  {logoSet.map((logo, logoIndex) => (
                    <div
                      key={logoIndex}
                      className="flex justify-center items-center h-12"
                    >
                      <div className="relative">
                        {/* Placeholder for logo - replace with actual logo images */}
                        <div className="text-white text-sm font-medium opacity-60 hover:opacity-100 transition-opacity duration-200 text-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-900/50">
                          {logo.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile scrolling marquee */}
        <div className="lg:hidden">
          <div className="relative w-screen -translate-x-1/2 left-1/2 h-12 overflow-hidden">
            <div className="animate-marquee flex space-x-8 items-center h-full">
              {/* Combine all logos for mobile display */}
              {logoSets.flat().map((logo, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center flex-shrink-0"
                >
                  <div className="text-white text-sm font-medium opacity-60 px-3 py-1 border border-gray-700 rounded bg-gray-900/50">
                    {logo.name}
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {logoSets.flat().map((logo, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex justify-center items-center flex-shrink-0"
                >
                  <div className="text-white text-sm font-medium opacity-60 px-3 py-1 border border-gray-700 rounded bg-gray-900/50">
                    {logo.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
