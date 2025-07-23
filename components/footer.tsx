"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, ArrowRight, Heart, Linkedin, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        // { name: "Our Story", href: "#story" },
        // { name: "Careers", href: "#careers" },
        // { name: "Press Kit", href: "#press" },
      ],
        },
        {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        // { name: "Pricing", href: "#pricing" },
        // { name: "API Docs", href: "#api" },
        // { name: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#blog" },
        { name: "Help Center", href: "#help" },
        { name: "Community", href: "https://whatsapp.com/channel/0029VaqenYl7IUYX4g5jiW40" },
        // { name: "Webinars", href: "#webinars" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        // { name: "Cookie Policy", href: "#cookies" },
        // { name: "GDPR", href: "#gdpr" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/SiikHub?t=3CJLtG0hMHbHPvf63ilM-w&s=08", color: "hover:text-blue-400", name: "Twitter" },
    { icon: Instagram, href: "#instagram", color: "hover:text-pink-400", name: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/siikhub/", color: "hover:text-blue-600", name: "LinkedIn" },
    // { icon: Youtube, href: "#youtube", color: "hover:text-red-500", name: "YouTube" },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)
            `,
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center">
                <Image
                  src="/siikhublogomain.png"
                  alt="SiikHub Logo"
                  width={180}
                  height={150}
                  sizes="(max-width: 940px) 40px, (max-width: 968px) 48px, 64px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-black text-xl sm:text-2xl text-white">SiikHub</span>
                <div className="text-xs sm:text-sm text-gray-400">Connet. Grow. Earn</div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md text-sm sm:text-base">
              Revolutionizing how professionals connect, collaborate, and grow across all industries. Join thousands
              building the future of work.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-white text-sm sm:text-base">Stay Updated</h4>
              {!isSubscribed ? (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 text-sm sm:text-base h-10 sm:h-auto"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 h-10 sm:h-auto"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 rounded-lg px-3 sm:px-4 py-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">Thanks for subscribing!</span>
                </div>
              )}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {footerSections.map((section, index) => (
              <div key={section.title} className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-white text-base sm:text-lg relative">
                  {section.title}
                  <div className="absolute -bottom-1 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-white/10 pt-8 sm:pt-12 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-400">Email</div>
                <div className="font-medium text-sm sm:text-base">siikhub.official@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-400">WhatsApp</div>
                <div className="font-medium text-sm sm:text-base">+1 (435) 319-3873</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-300 sm:col-span-2 md:col-span-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-400">Location</div>
                <div className="font-medium text-sm sm:text-base">New York, NY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              <span>© 2024 SiikHub Technologies Ltd. All rights reserved.</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span className="block sm:inline mt-1 sm:mt-0">Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 inline mx-1" />
              <span>for professionals worldwide</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="text-gray-400 text-xs sm:text-sm mr-2 hidden sm:inline">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 text-gray-400 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </footer>
  )
}
