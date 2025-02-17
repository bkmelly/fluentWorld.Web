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

export async function initializeBlogPosts() {
  try {
    // Create blogs collection if it doesn't exist
    const blogRef = collection(db, 'blogs')
    const snapshot = await getDocs(blogRef)
    
    if (snapshot.empty) {
      console.log('Initializing blogs collection with sample posts...')
      
      const samplePosts = [
        {
          title: 'Getting Started with Language Learning',
          excerpt: 'Discover effective strategies for mastering a new language...',
          content: `
            Learning a new language can be an exciting journey. Here are some key strategies:
            1. Immerse yourself in the language
            2. Practice daily
            3. Use language learning apps
            4. Join conversation groups
            5. Watch movies and shows in your target language
          `,
          image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
          date: new Date().toISOString(),
          readTime: '5 min',
          category: 'Language Learning',
          author: {
            name: 'Sarah Johnson',
            role: 'Language Expert',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
          }
        },
        {
          title: 'Mastering Grammar: Essential Tips',
          excerpt: 'Learn the fundamentals of grammar and improve your language skills...',
          content: `
            Good grammar is essential for effective communication. Here's what you need to know:
            1. Understanding basic sentence structure
            2. Proper use of tenses
            3. Common grammar pitfalls to avoid
            4. Practice exercises and examples
          `,
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
          date: new Date().toISOString(),
          readTime: '7 min',
          category: 'Grammar',
          author: {
            name: 'Michael Chen',
            role: 'Senior Instructor',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
          }
        },
        {
          title: 'Effective Study Techniques',
          excerpt: 'Maximize your learning potential with these proven study methods...',
          content: `
            The right study techniques can make a huge difference in your learning journey:
            1. Spaced repetition
            2. Active recall
            3. Mind mapping
            4. The Pomodoro Technique
            5. Creating study schedules
          `,
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
          date: new Date().toISOString(),
          readTime: '6 min',
          category: 'Study Tips',
          author: {
            name: 'Emily Wilson',
            role: 'Education Specialist',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
          }
        }
      ]

      // Add sample posts to Firestore
      const addedPosts = await Promise.all(
        samplePosts.map(post => addDoc(blogRef, post))
      )
      
      console.log(`Created ${addedPosts.length} sample blog posts`)
      return true
    } else {
      console.log('Blogs collection already exists')
      return false
    }
  } catch (error) {
    console.error('Error initializing blog posts:', error)
    throw error
  }
} 