import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Add some sample participants for testing
    const sampleParticipants = [
      {
        id: '1',
        email: 'alex@example.com',
        nickname: 'CodeMaster',
        city: 'San Francisco',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'sarah@example.com', 
        nickname: 'DevNinja',
        city: 'New York',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'mike@example.com',
        nickname: 'HackHero',
        city: 'Seattle',
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json({ 
      message: 'Sample data ready! Visit /participants to see them.',
      participants: sampleParticipants 
    })
  } catch (error) {
    console.error('Error adding sample data:', error)
    return NextResponse.json(
      { error: 'Failed to add sample data' },
      { status: 500 }
    )
  }
}