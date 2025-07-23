"use client"

import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
  const team = [
    {
      name: "Adebanji Akinsola",
      role: "CEO & Founder - Mobile Developer",
      // bio: "Building SiikHub to reshape how the world works — one connection, one opportunity, one creator at a time. I’m here to unlock access for the next billion professionals — helping them connect, get hired, showcase their skills, earn from what they do best, and get funded to bring big ideas to life.",
      image: "/profile.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/adebanji-akinsola-021564212/",
        // twitter: "#",
        // email: "adebanjiakinsola@gmail.com",
      },
    },
    {
      name: "David Okunola",
      role: "Backend Engineer",
      image: "david.jpg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/cyberride/",
        // twitter: "#",
        // email: "#",
      },
    },
    {
      name: "Olamilekan Micah-Daniels",
      role: "Frontend Engineer",
      image: "/Micha.jpg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/olamilekan-micah-daniels-9a05a5259/",
        // twitter: "#",
        // email: "david@siikhub.com",
      },
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals building the future of professional networking.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Image */}
                <div className="relative mb-6">
                    <Image
                      src={member.image || "/profile.jpeg"}
                      alt={member.name}
                      width={50}
                      height={80}
                      className="object-cover"
                      style={{ width: "100%", height: "80%" }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-4">{member.role}</p>
                  {/* <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p> */}

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                    {/* <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <Twitter className="w-5 h-5 text-gray-600" />
                    </a> */}
                    {/* <a
                      // href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5 text-green-600" />
                    </a> */}
                  </div>
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
