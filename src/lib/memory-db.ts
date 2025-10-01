// Simple in-memory database for Vercel deployment
interface Participant {
  id: string
  email: string
  nickname: string
  city: string
  createdAt: string
}

const participants: Participant[] = []

export const memoryDb = {
  async create(data: Omit<Participant, 'id' | 'createdAt'>) {
    const participant: Participant = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString()
    }
    participants.push(participant)
    return participant
  },

  async findMany() {
    return participants.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  },

  async findUnique(where: { email: string }) {
    return participants.find(p => p.email === where.email) || null
  }
}
