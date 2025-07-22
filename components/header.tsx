"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DownloadModal } from "@/components/download-modal"
import Image from "next/image";


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About Us", href: "/about", hasDropdown: false },
    { name: "Blog", href: "/blog", hasDropdown: false },
    { name: "FAQ", href: "/faq", hasDropdown: false },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/*Logo Section*/}
          <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
            <div className="relative w-150 h-150 sm:w-112 sm:h-112 transition-transform duration-300 transform group-hover:scale-110">
              <Link href="/">
                <Image
                  src="/siikhublogo.png"
                  alt="SiikHub Logo"
                  width={180}
                  height={150}
                  sizes="(max-width: 940px) 40px, (max-width: 968px) 48px, 64px"
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Animated underline */}
                <div
                  className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`}
                ></div>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => setIsDownloadModalOpen(true)}
              className={`relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 ${isScrolled
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                }`}
            >
              <span className="relative z-10">Tap In. Download SiikHub</span>

              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-xl transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl mt-4 border border-gray-200/50 shadow-xl mx-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 sm:px-6 py-2 sm:py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium text-sm sm:text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="px-4 sm:px-6 py-2 sm:py-3">
              <Button
                onClick={() => setIsDownloadModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base"
              >
                Try it - Download SiikHub
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      {/* Download Modal */}
      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </header>
  )
}
