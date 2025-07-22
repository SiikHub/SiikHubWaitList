"use client"

import { Mail, MessageCircle, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FaqContactSection() {
  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "Send Email",
      gradient: "from-blue-500 to-cyan-500",
      href: "mailto:support@siikhub.com",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      gradient: "from-green-500 to-emerald-500",
      href: "#",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      gradient: "from-purple-500 to-pink-500",
      href: "tel:+1-555-123-4567",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Still Need Help?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help you succeed.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <option.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>

                  {/* CTA Button */}
                  <a
                    href={option.href}
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r ${option.gradient} text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <span>{option.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with other SiikHub users, share tips, and get help from the community.
          </p>
          <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl px-8 py-3 font-semibold">
            Join Community Forum
          </Button>
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
