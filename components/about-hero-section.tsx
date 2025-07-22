"use client"

import { useState, useEffect } from "react"
import { Users, Heart, Globe, Zap, ArrowRight, Sparkles } from "lucide-react"

export function AboutHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { icon: Users, label: "All Professionals", value: "Everyone", color: "from-blue-500 to-cyan-500" },
    { icon: Heart, label: "Inclusive Growth", value: "100%", color: "from-pink-500 to-rose-500" },
    { icon: Globe, label: "Global Network", value: "Worldwide", color: "from-green-500 to-emerald-500" },
    { icon: Zap, label: "Future Ready", value: "Always", color: "from-purple-500 to-indigo-500" },
  ]

  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Animated shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto pt-32 pb-16">
        {/* Hero Content */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-gray-700 font-medium text-sm">About SiikHub</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Professional Growth
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              For Everyone
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 font-medium max-w-4xl mx-auto">
            We believe professional growth should be accessible, empowering, and inclusive for everyone — not just a
            privileged few.
          </p>

          <div className="max-w-5xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed space-y-6">
            <p>
              Our platform is built to serve{" "}
              <strong>creators, freelancers, tradespeople, corporate professionals, and founders</strong> alike. Whether
              you&apos;re a skilled carpenter or a software engineer, SiikHub gives you the tools to showcase your
              experience, find meaningful work, monetize your knowledge, and connect with a vibrant network of
              collaborators, recruiters, and supporters.
            </p>

            <p>
              We&apos;re not here to replicate what&apos;s already out there. We&apos;re building the{" "}
              <strong>future of work and collaboration</strong> — one where you can go live, receive support for your
              content, chat securely with mentors, and even get funding for your next big idea.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50">
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-8 py-4 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl text-white">
            <span className="font-semibold text-lg">Join Our Mission</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
