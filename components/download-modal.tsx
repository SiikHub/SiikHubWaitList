"use client"

import type React from "react"

import { useState } from "react"
import { X, Smartphone, Bell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSuccess(true)
    setEmail("")
    setIsSubmitting(false)

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Download SiikHub</h2>
          <p className="text-white/90">Coming Soon to Mobile</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              {/* App Store Logos */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">Available Soon On</h3>

                {/* App Store Buttons (Disabled) */}
                <div className="space-y-3">
                  {/* Google Play Store */}
                  <div className="relative">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 opacity-60">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Google Play</div>
                        <div className="text-sm text-gray-600">Coming Soon</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        In Development
                      </span>
                    </div>
                  </div>

                  {/* Apple App Store */}
                  <div className="relative">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 opacity-60">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">App Store</div>
                        <div className="text-sm text-gray-600">Coming Soon</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        In Development
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Signup */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Notified</h4>
                    <p className="text-sm text-gray-600">Be the first to know when our apps launch</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Joining...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Join Waitlist for Updates</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Meanwhile, you can use SiikHub on the web at{" "}
                  <span className="font-semibold text-blue-600">siikhub.com</span>
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're All Set! 🎉</h3>
              <p className="text-gray-600">We'll notify you as soon as our mobile apps are available for download.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
