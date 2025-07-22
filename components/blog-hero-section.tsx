"use client"

import { Calendar, Clock, User, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogHeroSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
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
      </div>

      <div className="relative max-w-4xl mx-auto pt-16">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-white/80">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">December 15, 2024</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">5 min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="text-sm">SiikHub Team</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Why the Future of
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Networking
          </span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            is Inclusive, Monetized, and Borderless
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
          Professional networking is evolving fast. The old model — limited to resumes, job titles, and connections
          within a single industry — no longer serves the dynamic world we live in.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl px-6 py-3">
            <Share2 className="w-4 h-4 mr-2" />
            Share Article
          </Button>
          <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl px-6 py-3">
            <Bookmark className="w-4 h-4 mr-2" />
            Save for Later
          </Button>
        </div>
      </div>
    </section>
  )
}
