import { NextRequest, NextResponse } from 'next/server'
import { memoryDb } from '@/lib/memory-db'

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
    const existingParticipant = await memoryDb.findUnique({ email })

    if (existingParticipant) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new participant
    const participant = await memoryDb.create({
      email,
      nickname,
      city
    })

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
    const participants = await memoryDb.findMany()
    return NextResponse.json(participants)
  } catch (error) {
    console.error('Error fetching participants:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
