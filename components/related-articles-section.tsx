"use client"

import { Calendar, Clock, ArrowRight } from "lucide-react"

export function RelatedArticlesSection() {
  const articles = [
    {
      title: "The Rise of Creator Economy in Professional Networking",
      excerpt: "How professionals are monetizing their expertise and building sustainable income streams.",
      date: "December 10, 2024",
      readTime: "4 min read",
      category: "Creator Economy",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Building Inclusive Workplaces: Beyond Traditional Hiring",
      excerpt: "Why companies need to rethink their approach to talent acquisition and retention.",
      date: "December 8, 2024",
      readTime: "6 min read",
      category: "Workplace Culture",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "The Future of Remote Collaboration Tools",
      excerpt: "How technology is reshaping the way we work together across distances.",
      date: "December 5, 2024",
      readTime: "5 min read",
      category: "Technology",
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Related Articles
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Continue exploring the future of professional networking and career growth.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span
                    className={`inline-block bg-gradient-to-r ${article.gradient} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Header Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${article.gradient} opacity-10`}></div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>

                  {/* Read More */}
                  <div className="flex items-center space-x-2 text-gray-700 font-semibold group-hover:text-indigo-600 transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
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
