import { createContext, useContext, useState, useEffect } from 'react'
import { collection, query, onSnapshot, getDocs, doc, getDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'
import type { AdminStats, AdminLog } from '../types/admin'

interface AdminContextType {
  stats: AdminStats | null
  logs: AdminLog[]
  isLoading: boolean
  refreshStats: () => Promise<void>
  onlineUsers: Set<string>
  getUserDetails: (userId: string) => Promise<any | null>
  deleteAdminLog: (logId: string) => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, isAdmin } = useAuth()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())

  const refreshStats = async () => {
    if (!isAdmin) return

    try {
      // Get all users
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const totalUsers = usersSnapshot.size

      // Get all programs
      const programsSnapshot = await getDocs(collection(db, 'programs'))
      const totalPrograms = programsSnapshot.size

      // Get active enrollments
      const enrollmentsSnapshot = await getDocs(collection(db, 'enrollments'))
      const activeEnrollments = enrollmentsSnapshot.docs.filter(
        doc => doc.data().status === 'active'
      ).length

      // Calculate total revenue
      const revenue = enrollmentsSnapshot.docs.reduce(
        (total, doc) => total + (doc.data().amount || 0),
        0
      )

      setStats({
        totalUsers,
        totalPrograms,
        activeEnrollments,
        revenue,
        lastUpdated: new Date()
      })
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    }
  }

  const getUserDetails = async (userId: string) => {
    if (!isAdmin) return null
    
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() }
      }
      return null
    } catch (error) {
      console.error('Error fetching user details:', error)
      return null
    }
  }

  const deleteAdminLog = async (logId: string) => {
    if (!isAdmin) return
    
    try {
      await deleteDoc(doc(db, 'adminLogs', logId))
    } catch (error) {
      console.error('Error deleting admin log:', error)
    }
  }

  // Track online users
  useEffect(() => {
    if (!isAdmin) return

    const statusRef = collection(db, 'status')
    const unsubscribe = onSnapshot(statusRef, (snapshot) => {
      const online = new Set<string>()
      
      snapshot.docs.forEach(doc => {
        if (doc.data().state === 'online') {
          online.add(doc.id)
        }
      })
      
      setOnlineUsers(online)
    })

    return () => unsubscribe()
  }, [isAdmin])

  // Listen to admin logs
  useEffect(() => {
    if (!isAdmin) return

    const logsQuery = query(collection(db, 'adminLogs'))
    const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
      const newLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      })) as AdminLog[]

      setLogs(newLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))
    })

    return () => unsubscribe()
  }, [isAdmin])

  // Initial stats fetch
  useEffect(() => {
    if (!isAdmin) return
    
    refreshStats()
    setIsLoading(false)
  }, [isAdmin])

  // Update user presence
  useEffect(() => {
    if (!currentUser) return

    const userStatusRef = doc(db, 'status', currentUser.id)
    const updateOnlineStatus = async () => {
      if (currentUser) {
        await setDoc(userStatusRef, {
          state: 'online',
          lastChanged: serverTimestamp()
        })
      }
    }

    updateOnlineStatus()

    return () => {
      if (currentUser) {
        setDoc(userStatusRef, {
          state: 'offline',
          lastChanged: serverTimestamp()
        })
      }
    }
  }, [currentUser])

  const value = {
    stats,
    logs,
    isLoading,
    refreshStats,
    onlineUsers,
    getUserDetails,
    deleteAdminLog
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
} 