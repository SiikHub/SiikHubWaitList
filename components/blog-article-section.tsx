"use client"

import { CheckCircle, ArrowRight, Quote } from "lucide-react"

export function BlogArticleSection() {
  const keyPoints = [
    "Jobs for All, Not Just Tech",
    "Monetize What You Know",
    "Live Networking, Reimagined",
    "Fund Your Vision",
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            At SiikHub, we&#39;re rethinking what a professional platform should be. Here&#39;s what makes our approach
            different:
          </p>
        </div>

        {/* Key Points Overview */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 mb-16 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What You&#39;ll Learn</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="relative">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Jobs for All, Not Just Tech</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our job marketplace is built for everyone — electricians, designers, teachers, doctors, marketers, and
                  more. It&#39;s time the tools of professional growth became universally available.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="relative">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Monetize What You Know</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Share your ideas, tutorials, advice, or creative content and earn directly from your community.
                  SiikHub coin system lets your audience support what matters.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="relative">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Live Networking, Reimagined</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Go live, host workshops, or launch your product in front of an engaged, relevant audience. Because
                  your voice deserves to be heard in real time.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="relative">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Fund Your Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Got a bold project or startup idea? Pitch it on SiikHub and connect with investors or philanthropists.
                  We&#39;ll even help you protect your concept before revealing the full picture.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 my-16 text-white">
          <Quote className="w-12 h-12 text-white/30 mb-6" />
          <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-6">
            &quot;The future is borderless, inclusive, and creator-led — and SiikHub is where it begins.&quot;
          </blockquote>
          <cite className="text-white/80 font-medium">— SiikHub Team</cite>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-3xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to Join the Future?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the revolution that&#39;s making professional networking inclusive, monetized, and borderless.
          </p>
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-8 py-4 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl text-white">
            <span className="font-semibold text-lg">Join the Waitlist</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
