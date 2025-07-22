import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for demo (in production, use a real database)
const waitlistData: Array<{
  id: number
  email: string
  source: string
  timestamp: string
  position: number
  isActive: boolean
}> = []

let nextId = 1

function updatePositions() {
  const activeEntries = waitlistData.filter((entry) => entry.isActive)
  activeEntries.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  activeEntries.forEach((entry, index) => {
    entry.position = index + 1
  })
}

export async function GET() {
  try {
    const activeEntries = waitlistData.filter((entry) => entry.isActive)
    const totalSignups = activeEntries.length
    const recentSignups = activeEntries.filter((entry) => {
      const entryDate = new Date(entry.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    }).length

    return NextResponse.json({
      success: true,
      total_signups: totalSignups,
      active_signups: totalSignups,
      recent_signups: recentSignups,
      latest_signups: activeEntries
        .slice(-10)
        .reverse()
        .map((entry) => ({
          email: entry.email,
          timestamp: entry.timestamp,
          source: entry.source,
          position: entry.position,
        })),
    })
  } catch (error) {
    console.error("Error fetching waitlist stats:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch statistics" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source = "website" } = body

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const existingEntry = waitlistData.find((entry) => entry.email === normalizedEmail && entry.isActive)

    if (existingEntry) {
      return NextResponse.json({
        success: false,
        message: "You're already on our waitlist! We'll notify you when SiikHub launches.",
        email: normalizedEmail,
        position: existingEntry.position,
      })
    }

    // Check if email was previously inactive
    const inactiveEntry = waitlistData.find((entry) => entry.email === normalizedEmail && !entry.isActive)

    if (inactiveEntry) {
      // Reactivate the entry
      inactiveEntry.isActive = true
      inactiveEntry.timestamp = new Date().toISOString()
      inactiveEntry.source = source

      updatePositions()

      return NextResponse.json({
        success: true,
        message: `🎉 Welcome back! You're #${inactiveEntry.position} on the SiikHub waitlist.`,
        email: normalizedEmail,
        position: inactiveEntry.position,
      })
    }

    // Create new entry
    const newEntry = {
      id: nextId++,
      email: normalizedEmail,
      source,
      timestamp: new Date().toISOString(),
      position: 0, // Will be updated by updatePositions
      isActive: true,
    }

    waitlistData.push(newEntry)
    updatePositions()

    const activeCount = waitlistData.filter((entry) => entry.isActive).length

    return NextResponse.json({
      success: true,
      message: `🎉 You're in! You're #${newEntry.position} on the SiikHub waitlist. We'll notify you when we launch!`,
      email: normalizedEmail,
      position: newEntry.position,
      total_signups: activeCount,
    })
  } catch (error) {
    console.error("Error processing waitlist signup:", error)
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
