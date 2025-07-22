"use client"

import { Search, HelpCircle, MessageCircle, Book } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function FaqHeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const quickLinks = [
    { icon: HelpCircle, label: "Getting Started", count: "12 articles" },
    { icon: MessageCircle, label: "Platform Features", count: "8 articles" },
    { icon: Book, label: "Account & Billing", count: "6 articles" },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
              `,
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto pt-16 text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Questions</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Find answers to common questions about SiikHub. Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-indigo-500 transition-colors duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{link.label}</h3>
                <p className="text-sm text-gray-600">{link.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
