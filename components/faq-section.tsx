"use client"

import { useState } from "react"
import { ChevronDown, DollarSign, Briefcase, Shield, Video, MessageSquare, Zap, HelpCircle } from "lucide-react"

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqCategories = [
    {
      title: "General",
      icon: HelpCircle,
      gradient: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "Who is SiikHub for?",
          answer:
            "SiikHub is for anyone looking to grow professionally — freelancers, creatives, skilled workers, corporate professionals, founders, and more. We welcome all industries.",
        },
        {
          question: "How is SiikHub different from other platforms?",
          answer:
            "SiikHub goes beyond job hunting. It's a full ecosystem — for showcasing, monetizing, collaborating, and even fundraising. Plus, it's open to everyone, not just tech professionals.",
        },
      ],
    },
    {
      title: "Monetization",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "Can I earn money on the platform?",
          answer:
            "Yes! You can monetize your content using our token system. Supporters can send you coins, which are convertible to your local currency or usable within the platform.",
        },
      ],
    },
    {
      title: "Jobs & Hiring",
      icon: Briefcase,
      gradient: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "How do job listings work?",
          answer:
            "Employers can create listings with filters like location, experience, and industry. Users can apply with their profile or upload a resume.",
        },
      ],
    },
    {
      title: "Content Protection",
      icon: Shield,
      gradient: "from-red-500 to-orange-500",
      faqs: [
        {
          question: "Is my content protected?",
          answer:
            "Yes. Monetized content can be watermarked or partially blurred in preview. We also use plagiarism detection and offer community guidelines to protect your work.",
        },
      ],
    },
    {
      title: "Live Streaming",
      icon: Video,
      gradient: "from-indigo-500 to-purple-500",
      faqs: [
        {
          question: "Can I go live on the platform?",
          answer:
            "Our live streaming feature allows video sessions for product launches, workshops, or community talks. You can receive gifts and engage your audience in real time.",
        },
      ],
    },
    {
      title: "Messaging",
      icon: MessageSquare,
      gradient: "from-teal-500 to-cyan-500",
      faqs: [
        {
          question: "Is there a messaging system?",
          answer:
            "Yes. We offer secure direct messaging and group chats. You can connect with mentors, collaborators, recruiters, or peers with voice note and file support.",
        },
      ],
    },
    {
      title: "Funding",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      faqs: [
        {
          question: "What is the funding feature?",
          answer:
            "If you have a project or startup idea, you can pitch it on SiikHub. Investors or donors can reach out after reviewing your teaser or business plan. We also provide NDA templates to protect your ideas.",
        },
      ],
    },
  ]

  // Flatten all FAQs with category info
  const allFaqs = faqCategories.flatMap((category, categoryIndex) =>
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      categoryTitle: category.title,
      categoryIcon: category.icon,
      categoryGradient: category.gradient,
      id: categoryIndex * 100 + faqIndex,
    })),
  )

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* FAQ List */}
        <div className="space-y-4">
          {allFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="group relative"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300">
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Category Icon */}
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${faq.categoryGradient} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <faq.categoryIcon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1">
                        {/* Category Badge */}
                        <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          {faq.categoryTitle}
                        </span>

                        {/* Question */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openFaq === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
