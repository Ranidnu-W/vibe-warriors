'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, MapPin, Calendar, Mail, User, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'

interface Participant {
    id: string
    email: string
    nickname: string
    city: string
    createdAt: string
}

export default function ParticipantsPage() {
    const [participants, setParticipants] = useState<Participant[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchParticipants()
    }, [])

    const fetchParticipants = async () => {
        try {
            const response = await fetch('/api/participants')
            if (response.ok) {
                const data = await response.json()
                setParticipants(data)
            } else {
                setError('Failed to fetch participants')
            }
        } catch {
            setError('Network error')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
                />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-10 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                </div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 py-8"
                >
                    <nav className="flex justify-between items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Home</span>
                        </Link>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2"
                        >
                            <Zap className="h-8 w-8 text-yellow-400" />
                            <span className="text-2xl font-bold text-white">Vibe Battle</span>
                        </motion.div>
                    </nav>
                </motion.header>

                {/* Main Content */}
                <motion.main
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="container mx-auto px-4 py-8"
                >
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-block mb-6"
                        >
                            <Trophy className="h-16 w-16 text-yellow-400 mx-auto" />
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                                Tournament Participants
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8">
                            Meet the brave coders ready to battle it out!
                        </p>

                        <div className="flex items-center justify-center space-x-2 text-yellow-400">
                            <Users className="h-6 w-6" />
                            <span className="text-2xl font-bold">{participants.length} Participants</span>
                        </div>
                    </div>

                    {/* Participants Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-6xl mx-auto"
                    >
                        {error ? (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 text-center">
                                <p className="text-red-400 text-lg">{error}</p>
                                <button
                                    onClick={fetchParticipants}
                                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : participants.length === 0 ? (
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20">
                                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold text-white mb-2">No Participants Yet</h3>
                                <p className="text-gray-300 mb-6">Be the first to join the battle!</p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-pink-300 transition-all duration-300"
                                >
                                    <span>Join Now</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-white/5">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rank</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nickname</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">City</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {participants.map((participant, index) => (
                                                <motion.tr
                                                    key={participant.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="hover:bg-white/5 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-2">
                                                            {index < 3 ? (
                                                                <Trophy className={`h-5 w-5 ${index === 0 ? 'text-yellow-400' :
                                                                        index === 1 ? 'text-gray-300' :
                                                                            'text-orange-400'
                                                                    }`} />
                                                            ) : (
                                                                <span className="text-gray-400 font-mono">#{index + 1}</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                                                                <User className="h-4 w-4 text-black" />
                                                            </div>
                                                            <span className="text-white font-medium">{participant.nickname}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-2 text-gray-300">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{participant.city}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-2 text-gray-300">
                                                            <Mail className="h-4 w-4" />
                                                            <span>{participant.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-2 text-gray-300">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>{formatDate(participant.createdAt)}</span>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Call to Action */}
                    {participants.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-center mt-12"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-bold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-pink-300 transition-all duration-300"
                            >
                                <span>Join the Battle</span>
                                <ArrowLeft className="h-5 w-5 rotate-180" />
                            </Link>
                        </motion.div>
                    )}
                </motion.main>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="container mx-auto px-4 py-8 text-center text-gray-400"
                >
                    <p>&copy; 2024 Vibe Battle. All rights reserved.</p>
                </motion.footer>
            </div>
        </div>
    )
}
