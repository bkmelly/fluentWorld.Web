import { doc, setDoc, getDoc, serverTimestamp, collection, addDoc, deleteDoc, query, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { deleteUser as deleteAuthUser } from 'firebase/auth'
import type { AdminLog } from '../types/admin'
import type { UserProfile } from '../types/profile'
import type { Enrollment } from '../types/enrollment'

// Track online users
const onlineUsers = new Set<string>()

// Function to track user online status
export function trackUserOnlineStatus(userId: string, isOnline: boolean) {
  if (isOnline) {
    onlineUsers.add(userId)
  } else {
    onlineUsers.delete(userId)
  }
}

// Function to check if user is online
export function isUserOnline(userId: string): boolean {
  return onlineUsers.has(userId)
}

// Function to get all users with their enrollments
export function subscribeToUsers(callback: (users: (UserProfile & { 
  isOnline: boolean
  enrollments: Enrollment[]
})[]) => void) {
  // Subscribe to users collection
  const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
  
  // Subscribe to status collection for online/offline
  const statusRef = collection(db, 'status')
  const statusUnsubscribe = onSnapshot(statusRef, (statusSnapshot) => {
    const onlineStatuses = new Map<string, boolean>()
    statusSnapshot.docs.forEach(doc => {
      onlineStatuses.set(doc.id, doc.data().state === 'online')
    })

    // Subscribe to users and combine with status
    const unsubscribe = onSnapshot(usersQuery, async (snapshot) => {
      const users = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const userData = doc.data() as UserProfile
          return {
            ...userData,
            id: doc.id,
            isOnline: onlineStatuses.get(doc.id) || false,
            enrollments: [] // We'll fetch enrollments when needed
          }
        })
      )
      callback(users)
    })
  })

  // Return cleanup function
  return () => {
    statusUnsubscribe()
  }
}

// Function to delete a user and all their data
export async function deleteUser(userId: string) {
  try {
    // Get user's auth record
    const userRecord = auth.currentUser
    if (!userRecord) throw new Error('No authenticated user')

    // Delete user's enrollments
    const enrollmentsQuery = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId)
    )
    const enrollmentsSnapshot = await getDocs(enrollmentsQuery)
    await Promise.all(
      enrollmentsSnapshot.docs.map(doc => deleteDoc(doc.ref))
    )

    // Delete user's document
    await deleteDoc(doc(db, 'users', userId))

    // Delete user from authentication
    await deleteAuthUser(userRecord)

    // Log the deletion
    await addDoc(collection(db, 'adminLogs'), {
      action: 'delete_user',
      userId,
      timestamp: serverTimestamp(),
      details: `User ${userId} was deleted with all their data`
    } as AdminLog)

    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export async function promoteToAdmin(userId: string, adminSecret: string) {
  // This should match a secret stored in your environment variables
  const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET

  if (adminSecret !== ADMIN_SECRET) {
    throw new Error('Invalid admin secret')
  }

  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    // Enable offline persistence
    await setDoc(userRef, {
      ...userDoc.data(),
      role: 'admin',
      adminGrantedAt: serverTimestamp()
    }, { merge: true })

    // Log admin promotion
    const logRef = collection(db, 'adminLogs')
    await addDoc(logRef, {
      userId,
      action: 'grant_admin',
      timestamp: serverTimestamp(),
      details: 'Admin access granted via secret key'
    } as AdminLog)

    return true
  } catch (error: any) {
    if (error.code === 'failed-precondition' || error.code === 'unavailable') {
      throw new Error('Unable to connect to the server. Please check your internet connection.')
    }
    throw error
  }
}

export async function checkAdminStatus(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      return false
    }

    return userDoc.data()?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
} 