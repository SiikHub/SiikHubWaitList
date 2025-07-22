"use client"

import { useState } from "react"
import { Briefcase, DollarSign, Users, User, Target, ArrowRight } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "Find Jobs Across All Sectors — Not Just Tech",
    description:
      "Break free from the world of traditional job boards. SiikHub connects professionals across all industries, from healthcare and education to construction, healthcare, education, media, skilled trades, and more. Whether you're a creative, a corporate professional, or a blue-collar worker, there's something here for you.",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    illustration: "/findjob.jpg?height=200&width=300",
    delay: "0s",
  },
  {
    title: "Monetize Your Knowledge & Creativity",
    description:
      "Turn your insights, skills and unique experiences into income. Share your expertise, create or sell services, and earn directly from your professional knowledge, or the community using our built-in monetization tools.",
    icon: DollarSign,
    gradient: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    illustration: "/monietize.jpg?height=200&width=300",
    delay: "0.2s",
  },
  {
    title: "Go Live and Get Support from Your Community",
    description:
      "Host live sessions to teach, pitch ideas, showcase your skills, or network with others - all while engaged with a supportive community. Build meaningful connections that help you grow professionally and personally.",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    illustration: "/live.jpg?height=200&width=300",
    delay: "0.4s",
  },
  {
    title: "Showcase Your Work with a Dynamic Profile",
    description:
      "Go beyond resumes. Build a living, evolving profile where you can highlight your portfolio, achievements, goals, services, and personal brand using our smart resume builder, skills, testimonials, etc.",
    icon: User,
    gradient: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    illustration: "/showcase.jpg?height=200&width=300",
    delay: "0.6s",
  },
  {
    title: "Get Funding for Your Next Big Project or Startup",
    description:
      "Whether you're building a product, launching a service, or scaling a business, connect with investors, collaborators, and supporters. Pitch your idea, show traction, and raise funds transparently and securely.",
    icon: Target,
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    illustration: "/funded.jpg?height=200&width=300",
    delay: "0.8s",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)
              `,
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 px-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <span className="text-white/90 font-medium text-sm sm:text-base">Explore Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Explore a New Way
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              to Work, Connect & Grow
            </span>
          </h2>

          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `slideInFromLeft 0.8s ease-out ${feature.delay} both`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Feature Card */}
              <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 mx-4 sm:mx-0">
                <div className="flex flex-col lg:flex-row items-center">
                  {/* Content Side */}
                  <div className="flex-1 p-6 sm:p-8 lg:p-12">
                    {/* Icon */}
                    <div className="relative mb-4 sm:mb-6">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
                      >
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                      {feature.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold group-hover:text-blue-600 transition-colors duration-300">
                      <span className="text-sm sm:text-base">Learn More</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Illustration Side */}
                  <div className="w-full lg:w-96 h-64 sm:h-80 p-4 sm:p-8">
                    <div className="relative h-full">
                      {/* Background */}
                      <div
                        className={`absolute inset-0 ${feature.bgColor} rounded-xl sm:rounded-2xl transform group-hover:scale-105 transition-transform duration-500`}
                      ></div>

                      {/* Main illustration container */}
                      <Image
                        src={feature.illustration || "/placeholder.svg"}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-xl sm:rounded-2xl transform group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 384px"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gray-200">
                  <div
                    className={`h-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}`}
                  ></div>
                </div>
              </div>

              {/* Connecting line */}
              {index < features.length - 1 && (
                <div className="flex justify-center my-6 sm:my-8">
                  <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
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
