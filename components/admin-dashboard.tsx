"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Calendar, Download } from "lucide-react"

interface WaitlistStats {
  total_signups: number
  recent_signups: number
  active_signups: number
  latest_signups: Array<{
    email: string
    timestamp: string
    source: string
    position: number
  }>
}

export function AdminDashboard() {
  const [stats, setStats] = useState<WaitlistStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchStats = async () => {
    try {
      setLoading(true)

      // Try FastAPI backend first
      let response = await fetch("http://localhost:8000/api/waitlist/stats")

      if (!response.ok) {
        // Fallback to Next.js API
        response = await fetch("/api/waitlist")
      }

      if (!response.ok) {
        throw new Error("Failed to fetch stats")
      }

      const data = await response.json()
      setStats(data)
      setError("")
    } catch (err) {
      setError("Failed to load waitlist statistics")
      console.error("Error fetching stats:", err)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    if (!stats?.latest_signups) return

    const csvContent = [
      ["Email", "Position", "Source", "Timestamp"],
      ...stats.latest_signups.map((signup) => [
        signup.email,
        signup.position.toString(),
        signup.source,
        new Date(signup.timestamp).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `siikhub-waitlist-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  useEffect(() => {
    fetchStats()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">SiikHub Waitlist Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={exportData} disabled={!stats?.latest_signups?.length}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchStats}>
            Refresh Stats
          </Button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_signups}</div>
                <p className="text-xs text-muted-foreground">All time registrations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Signups</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active_signups}</div>
                <p className="text-xs text-muted-foreground">Currently subscribed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recent_signups}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
          </div>

          {stats.latest_signups && stats.latest_signups.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.latest_signups.map((signup, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium">{signup.email}</div>
                        <div className="text-sm text-gray-500">
                          Position #{signup.position} • {signup.source}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(signup.timestamp).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <strong>POST</strong> /api/waitlist - Add email to waitlist
            </div>
            <div>
              <strong>GET</strong> /api/waitlist - Get waitlist statistics
            </div>
            <div>
              <strong>POST</strong> /api/waitlist/unsubscribe - Remove from waitlist
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
