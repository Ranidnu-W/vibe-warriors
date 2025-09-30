import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    // Clear existing data and add sample data
    await prisma.participant.deleteMany()
    
    for (const participant of sampleParticipants) {
      await prisma.participant.create({
        data: participant
      })
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
