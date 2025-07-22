"use client"

import { Target, Users, Lightbulb, Globe } from "lucide-react"

export function MissionSection() {
  const principles = [
    {
      icon: Target,
      title: "Jobs for All, Not Just Tech",
      description:
        "Our job marketplace is built for everyone — electricians, designers, teachers, doctors, marketers, and more. It's time the tools of professional growth became universally available.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Monetize What You Know",
      description:
        "Share your ideas, tutorials, advice, or creative content and earn directly from your community. SiikHub's coin system lets your audience support what matters.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Lightbulb,
      title: "Live Networking, Reimagined",
      description:
        "Go live, host workshops, or launch your product in front of an engaged, relevant audience. Because your voice deserves to be heard in real time.",
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Globe,
      title: "Fund Your Vision",
      description:
        "Got a bold project or startup idea? Pitch it on SiikHub and connect with investors or philanthropists. We'll even help you protect your concept before revealing the full picture.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The future is borderless, inclusive, and creator-led — and SiikHub is where it begins.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-8"></div>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              <div
                className={`relative ${principle.bgColor} rounded-3xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100`}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${principle.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {principle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
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
