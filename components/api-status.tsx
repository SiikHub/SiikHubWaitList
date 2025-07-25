"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Clock, Server } from "lucide-react"

export function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "fastapi" | "fallback" | "offline">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkApiStatus = async () => {
    setStatus("checking")

    try {
      // First try FastAPI backend
      const fastapiResponse = await fetch("http://localhost:8000/health", {
        method: "GET",
        signal: AbortSignal.timeout(3000), // 3 second timeout
      })

      if (fastapiResponse.ok) {
        setStatus("fastapi")
        setLastChecked(new Date())
        return
      }
    } catch (error) {
      console.log("FastAPI not available, checking fallback...")
    }

    try {
      // Try Next.js API fallback
      const fallbackResponse = await fetch("/api/waitlist", {
        method: "GET",
        signal: AbortSignal.timeout(3000),
      })

      if (fallbackResponse.ok) {
        setStatus("fallback")
        setLastChecked(new Date())
        return
      }
    } catch (error) {
      console.log("Fallback API not available")
    }

    // Both APIs failed
    setStatus("offline")
    setLastChecked(new Date())
  }

  useEffect(() => {
    checkApiStatus()

    // Check status every 30 seconds
    const interval = setInterval(checkApiStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = () => {
    switch (status) {
      case "checking":
        return {
          icon: <Clock className="w-4 h-4 text-yellow-500 animate-spin" />,
          text: "Checking API status...",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-700",
        }
      case "fastapi":
        return {
          icon: <Server className="w-4 h-4 text-green-500" />,
          text: "FastAPI Backend Online",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700",
        }
      case "fallback":
        return {
          icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
          text: "Using Next.js API",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-700",
        }
      case "offline":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: "APIs Offline - Using Local Storage",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-700",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div
      className={`fixed bottom-4 right-4 ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-3 max-w-xs`}
    >
      <div className="flex items-center space-x-2">
        {config.icon}
        <div className="flex-1">
          <div className={`text-sm font-medium ${config.textColor}`}>{config.text}</div>
          {lastChecked && <div className="text-xs text-gray-500">Last checked: {lastChecked.toLocaleTimeString()}</div>}
        </div>
        <button
          onClick={checkApiStatus}
          className={`text-xs ${config.textColor} hover:underline focus:outline-none`}
          disabled={status === "checking"}
        >
          Refresh
        </button>
      </div>

      {/* Status details */}
      <div className="mt-2 text-xs text-gray-600">
        {status === "fastapi" && "✅ Python FastAPI backend is running"}
        {status === "fallback" && "⚠️ FastAPI unavailable, using Next.js API"}
        {status === "offline" && "❌ All APIs unavailable, data stored locally"}
        {status === "checking" && "🔄 Testing API connections..."}
      </div>
    </div>
  )
}
