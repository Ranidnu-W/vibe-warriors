import { kv } from '@vercel/kv'

interface Participant {
  id: string
  email: string
  nickname: string
  city: string
  createdAt: string
}

export const kvDb = {
  async create(data: Omit<Participant, 'id' | 'createdAt'>) {
    const participant: Participant = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString()
    }
    
    // Store in KV with email as key
    await kv.set(`participant:${participant.email}`, participant)
    
    // Add to participants list
    await kv.lpush('participants', participant.id)
    
    return participant
  },

  async findMany() {
    try {
      const participantIds = await kv.lrange('participants', 0, -1)
      const participants: Participant[] = []
      
      for (const id of participantIds) {
        const participant = await kv.get(`participant:${id}`)
        if (participant) {
          participants.push(participant as Participant)
        }
      }
      
      return participants.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } catch (error) {
      console.error('KV error:', error)
      return []
    }
  },

  async findUnique(where: { email: string }) {
    try {
      const participant = await kv.get(`participant:${where.email}`)
      return participant as Participant | null
    } catch (error) {
      console.error('KV error:', error)
      return null
    }
  }
}
