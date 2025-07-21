"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// @ts-ignore
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/new-button";

interface NavItem {
  title: string;
  href: string;
  isHomePageLink?: boolean;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    // Handle scroll logic here if needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as Element).closest(".mobile-menu")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (
    href: string,
    isHashLink?: boolean,
    isMobile = false
  ) => {
    if (isHashLink) {
      if (window.location.pathname === "/" || href.startsWith("/#")) {
        const hash = href.includes("#")
          ? href.substring(href.indexOf("#"))
          : "";
        if (hash) {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            const headerHeight = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerHeight;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      } else {
        window.location.href = `/${
          href.startsWith("#") ? href : "#" + href.split("#")[1]
        }`;
      }
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems: NavItem[] = [
    { title: "Facilities", href: "/facilities" },
    { title: "Events", href: "/events" },
    { title: "To Do", href: "/todo" },
    { title: "Advertising", href: "/advertising" },
    { title: "About Us", href: "#about", isHomePageLink: true },
    { title: "Careers", href: "/careers" },
    { title: "Press", href: "/press" },
    { title: "Contact Us", href: "#contact", isHomePageLink: true },
  ];

  return (
    <header className="fixed z-50 top-0 backdrop-blur-3xl left-0 right-0 p-2 bg-[#0b0b0b]">
      <div className="container mx-auto max-w-7xl min-h-[60px] sm:h-16 flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 rounded-xl transition-all duration-300 ease-in-out bg-[#0b0b0b] ">
        {/* Logo */}
        <div className="flex-shrink-0 max-w-[160px] sm:max-w-[180px] md:max-w-none">
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl text-white  transition-colors duration-300 block"
          >
            <span className="text-xl sm:text-2xl font-bold">
              Destination
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                KP
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu - Centered */}
        <div className="hidden lg:flex backdrop-blur-3xl flex-grow justify-center">
          <nav className="flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href || "#"}
                className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() =>
                  item.href &&
                  handleNavLinkClick(item.href, item.isHomePageLink)
                }
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Buttons & Mobile Menu Toggle - Right Aligned */}
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-100 hover:bg-gray-700/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%+0.25rem)] sm:top-[calc(100%+0.5rem)] left-2 right-2 sm:left-4 sm:right-4 rounded-xl shadow-xl border border-gray-800/50 bg-[#131315] max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-8rem)] overflow-y-auto mobile-menu">
          <div className="container mx-auto py-3 sm:py-4 px-3 sm:px-4 flex flex-col gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href || "#"}
                className="py-2.5 sm:py-3 text-sm sm:text-md text-gray-100 hover:text-white transition-colors"
                onClick={() => {
                  handleNavLinkClick(
                    item.href || "#",
                    item.isHomePageLink,
                    true
                  );
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-600 space-y-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="default" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
