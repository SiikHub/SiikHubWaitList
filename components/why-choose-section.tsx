"use client"

import { useState, useEffect } from "react"
import { Users, TrendingUp, Globe, ArrowRight } from "lucide-react"
import Image from "next/image"

export function WhyChooseSection() {
  const [activePoint, setActivePoint] = useState(0)

  const benefits = [
    {
      title: "Built for Every Talent",
      description:
        "Whether you're a designer, developer, electrician, teacher, nurse, or entrepreneur, SiikHub connects you with opportunities at the hub.",
      icon: Users,
      gradient: "from-emerald-500 to-teal-500",
      delay: "0s",
    },
    {
      title: "More Than Just Jobs",
      description:
        "Start, you can find work and you can also showcase your skills and build your brand. As you grow, use our advanced tools to scale your business and impact.",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
      delay: "0.3s",
    },
    {
      title: "Join a Global, Impact-Driven Network",
      description:
        "Connect with like-minded professionals around the world. We're not just building careers; we're building communities. New York and all-sharing growth and ready to collaborate.",
      icon: Globe,
      gradient: "from-purple-500 to-pink-500",
      delay: "0.6s",
    },
  ]

  const networkNodes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 2,
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % benefits.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Network Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              {/* Network visualization container */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-white/5">
                {/* Animated network nodes */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Connection lines */}
                  {networkNodes.map((node, i) =>
                    networkNodes.slice(i + 1).map((otherNode, j) => {
                      const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
                      if (distance < 25) {
                        return (
                          <line
                            key={`${i}-${j}`}
                            x1={`${node.x}%`}
                            y1={`${node.y}%`}
                            x2={`${otherNode.x}%`}
                            y2={`${otherNode.y}%`}
                            stroke="rgba(59, 130, 246, 0.3)"
                            strokeWidth="1"
                            className="animate-pulse"
                            style={{ animationDelay: `${node.delay}s` }}
                          />
                        )
                      }
                      return null
                    }),
                  )}

                  {/* Network nodes */}
                  {networkNodes.map((node) => (
                    <circle
                      key={node.id}
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r={node.size}
                      fill="rgba(59, 130, 246, 0.6)"
                      className="animate-pulse"
                      style={{ animationDelay: `${node.delay}s` }}
                    />
                  ))}
                </svg>
               
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2 px-4 sm:px-0">
            {/* Section Header */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-white/90 font-medium text-sm sm:text-base">Why Choose Us</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Why choose
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SiikHub
                </span>
              </h2>

              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* Benefits List */}
            <div className="space-y-6 sm:space-y-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ${
                    activePoint === index ? "scale-105" : "scale-100"
                  }`}
                  style={{
                    animation: `slideInFromRight 0.8s ease-out ${benefit.delay} both`,
                  }}
                  onMouseEnter={() => setActivePoint(index)}
                >
                  {/* Benefit Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    {/* Active indicator */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${benefit.gradient} rounded-l-xl sm:rounded-l-2xl transition-all duration-300 ${
                        activePoint === index ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${benefit.gradient} rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
                        >
                          <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                          {benefit.title}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {benefit.description}
                        </p>

                        {/* Progress bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${benefit.gradient} transition-all duration-1000 ${
                              activePoint === index ? "w-full" : "w-0"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="pt-6 sm:pt-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-white font-semibold text-base sm:text-lg">Join the Network</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
