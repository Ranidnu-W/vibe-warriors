import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for Vercel
const participants: Array<{
  id: string
  email: string
  nickname: string
  city: string
  createdAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { email, nickname, city } = await request.json()

    // Validate required fields
    if (!email || !nickname || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingParticipant = participants.find(p => p.email === email)

    if (existingParticipant) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new participant
    const participant = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      nickname,
      city,
      createdAt: new Date().toISOString()
    }

    participants.push(participant)

    return NextResponse.json(participant, { status: 201 })
  } catch (error) {
    console.error('Error creating participant:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(participants)
  } catch (error) {
    console.error('Error fetching participants:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}