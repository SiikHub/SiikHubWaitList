import { type NextRequest, NextResponse } from "next/server"

// This would connect to the same data store as the main waitlist route
// For now, we'll create a simple implementation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // In a real implementation, you would mark the email as unsubscribed in your database
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from the waitlist.",
      email: normalizedEmail,
    })
  } catch (error) {
    console.error("Error processing unsubscribe:", error)
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
