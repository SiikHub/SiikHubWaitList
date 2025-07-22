"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Lightbulb, Briefcase, DollarSign, CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [position, setPosition] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsSuccess(false)
    setPosition(null)

    try {
      // Try FastAPI backend first
      const response = await fetch("http://localhost:8000/api/waitlist/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          source: "website",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
        setIsSuccess(true)
        setPosition(data.position)
        setEmail("")
      } else {
        setMessage(data.message || "Something went wrong. Please try again.")
        setIsSuccess(false)
      }
    } catch (error) {
      console.error("Error submitting email:", error)

      // Fallback to Next.js API route if FastAPI is not available
      try {
        const fallbackResponse = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            source: "website",
          }),
        })

        const fallbackData = await fallbackResponse.json()

        if (fallbackData.success) {
          setMessage(fallbackData.message + " (Using fallback)")
          setIsSuccess(true)
          setPosition(fallbackData.position)
          setEmail("")
        } else {
          setMessage(fallbackData.message || "Something went wrong. Please try again.")
          setIsSuccess(false)
        }
      } catch (fallbackError) {
        setMessage("Network error. Please check your connection and try again.")
        setIsSuccess(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    { icon: Users, text: "Network with Purpose", color: "from-blue-500 to-cyan-500", position: "top-left" },
    { icon: Lightbulb, text: "Creativity that Counts", color: "from-yellow-500 to-orange-500", position: "top-right" },
    {
      icon: Briefcase,
      text: "Get Hired for Projects",
      color: "from-green-500 to-emerald-500",
      position: "bottom-left",
    },
    { icon: DollarSign, text: "Get Funded & Earn", color: "from-purple-500 to-pink-500", position: "bottom-right" },
  ]

  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Subtle pattern overlay */}
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

        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto pt-24 sm:pt-32 pb-12 sm:pb-16">
        {/* Main Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700 font-medium text-sm">The Future of Professional Networking</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Connect.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
              Grow.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-800 via-pink-800 to-red-800 bg-clip-text text-transparent flex items-center justify-center sm:inline-flex">
              Earn
              <span className="ml-2 sm:ml-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300 shadow-lg">
                <span className="flex items-center justify-center">
                  <Image
                    src="/coins.png"
                    alt="Money"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </span>
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 font-medium px-4">
            Where Professionals Meet Opportunities
          </p>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-12 px-4">
            The revolutionary platform designed for real growth across all industries
          </p>
        </div>

        {/* Feature Grid */}
        <div className="relative max-w-4xl mx-auto mb-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-105 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <div className="relative max-w-md mx-auto px-4">
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/50">
            {!isSuccess ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join the Revolution</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Be among the first to experience the future of professional networking
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 sm:h-14 text-center text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm sm:text-base">Joining...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm sm:text-base">Join the Waitlist</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome to the Future! 🎉</h3>
                  {position && (
                    <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      #{position}
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    You&apos;re officially part of the SiikHub revolution!
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    setMessage("")
                    setPosition(null)
                  }}
                  className="w-full h-10 sm:h-12 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-colors duration-300 text-sm sm:text-base bg-white text-gray-900"
                >
                  Add Another Email
                </Button>
              </div>
            )}

            {message && !isSuccess && (
              <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl">
                <p className="text-xs sm:text-sm text-red-600 text-center">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Join thousands of professionals already on the waitlist
          </p>

          <div className="flex justify-center space-x-4 sm:space-x-6">
            {[
              { icon: "𝕏", bg: "bg-gray-900", hover: "hover:bg-gray-700" },
              {
                icon: "ig",
                bg: "bg-gradient-to-r from-purple-500 to-pink-500",
                hover: "hover:from-purple-600 hover:to-pink-600",
              },
              { icon: "in", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
            ].map((social, index) => (
              <div
                key={index}
                className={`w-10 h-10 sm:w-12 sm:h-12 ${social.bg} ${social.hover} rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <span className="text-white font-bold text-sm sm:text-lg">{social.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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
