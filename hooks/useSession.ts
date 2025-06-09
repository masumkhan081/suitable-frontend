// 'use client'
// import { useEffect, useState } from 'react'
// import { authClient } from '@/0.lib/auth-client'

// interface Session {
//   id: string
//   createdAt: Date
//   updatedAt: Date
//   userId: string
//   expiresAt: Date
//   token: string
//   ipAddress?: string | null
//   userAgent?: string | null
//   user?: {
//     id: string
//     role: string  // Add the role here
//     // Add other user properties as needed
//   },
//   session?: {
//     id: string
//     createdAt: Date
//     updatedAt: Date
//     userId: string
//     expiresAt: Date
//     token: string
//     ipAddress?: string | null
//     userAgent?: string | null
//   },
//   role: string
// }

// export default function useSession() {
//   const [session, setSession] = useState<Session | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     authClient.getSession().then(({ data }) => {
//       setSession(data)
//       setLoading(false)
//     })
//   }, [])

//   const role = session?.role
//   const user = session?.user
//   const sessionData = session?.session
//   const isAuthenticated = Boolean(session?.user?.id)

//   return { loading, role, ...user, ...sessionData, isAuthenticated }
// }
