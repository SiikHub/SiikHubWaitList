"use client"

import { Shield, Heart, Zap, Users, Globe, Star } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: "Inclusive",
      description: "Every professional deserves equal opportunities to grow and succeed.",
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Your content, ideas, and connections are protected with industry-leading security.",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Zap,
      title: "Innovative",
      description: "We're constantly pushing boundaries to create new opportunities for professionals.",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Built by professionals, for professionals, with community feedback at our core.",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Globe,
      title: "Global",
      description: "Connecting talent and opportunities across borders and time zones.",
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in everything we build and every interaction we facilitate.",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Values
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do at SiikHub.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${value.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className={`w-7 h-7 ${value.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
