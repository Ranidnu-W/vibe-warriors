import { NextResponse } from 'next/server'
import { memoryDb } from '@/lib/memory-db'

export async function POST() {
  try {
    // Add some sample participants for testing
    const sampleParticipants = [
      {
        email: 'alex@example.com',
        nickname: 'CodeMaster',
        city: 'San Francisco'
      },
      {
        email: 'sarah@example.com', 
        nickname: 'DevNinja',
        city: 'New York'
      },
      {
        email: 'mike@example.com',
        nickname: 'HackHero',
        city: 'Seattle'
      }
    ]

    // Add sample data
    for (const participant of sampleParticipants) {
      await memoryDb.create(participant)
    }

    return NextResponse.json({ message: 'Sample data added successfully!' })
  } catch (error) {
    console.error('Error adding sample data:', error)
    return NextResponse.json(
      { error: 'Failed to add sample data' },
      { status: 500 }
    )
  }
}
