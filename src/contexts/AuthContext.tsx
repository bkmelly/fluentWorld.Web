import { createContext, useContext, useEffect, useState } from 'react'
import { 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { UserProfile } from '../types/profile'

interface AuthContextType {
  currentUser: UserProfile | null
  isAdmin: boolean
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Separate hook component
function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Separate provider component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = async (email: string, password: string) => {
    try {
      // First create the auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log('User created in Auth:', user) // Debug log

      // Create user document in Firestore
      const userRef = doc(db, 'users', user.uid)
      
      const userData = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        role: 'user',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        bio: '',
        preferences: {
          notifications: true,
          emailUpdates: true,
          language: 'en'
        }
      }

      console.log('Creating user document:', userData) // Debug log

      await setDoc(userRef, userData)

      // Log new user creation
      await addDoc(collection(db, 'adminLogs'), {
        action: 'create_user',
        userId: user.uid,
        timestamp: serverTimestamp(),
        details: `New user registered: ${user.email}`
      })

      console.log('User document created successfully') // Debug log

    } catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(error.message || 'Failed to create account')
    }
  }

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      if (!user) {
        throw new Error('No user data returned from Google sign in')
      }

      try {
        // Create or update user document
        const userRef = doc(db, 'users', user.uid)
        
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          bio: '',
          preferences: {
            notifications: true,
            emailUpdates: true,
            language: 'en'
          }
        }, { merge: true })

        // Log user login
        await addDoc(collection(db, 'adminLogs'), {
          action: 'user_login',
          userId: user.uid,
          timestamp: serverTimestamp(),
          details: `User logged in via Google: ${user.email}`
        })

      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError)
        // Continue even if logging fails - user can still log in
      }

    } catch (error: any) {
      console.error('Google login error:', error.code, error.message)
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login cancelled. Please try again.')
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection.')
      } else {
        throw new Error(`Login error: ${error.message}`)
      }
    }
  }

  const logout = async () => {
    try {
      // Update last seen timestamp before logging out
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.id)
        await updateDoc(userRef, {
          lastLogin: serverTimestamp()
        })
      }

      // Sign out from Firebase
      await signOut(auth)

      // Clear local state
      setCurrentUser(null)

      // Log the logout
      if (currentUser) {
        await addDoc(collection(db, 'adminLogs'), {
          action: 'user_logout',
          userId: currentUser.id,
          timestamp: serverTimestamp(),
          details: `User logged out: ${currentUser.email}`
        })
      }

      // Clear presence status
      if (currentUser) {
        const statusRef = doc(db, 'status', currentUser.id)
        await setDoc(statusRef, {
          state: 'offline',
          lastChanged: serverTimestamp()
        })
      }

    } catch (error) {
      console.error('Logout error:', error)
      throw new Error('Failed to logout. Please try again.')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          
          if (!userDoc.exists()) {
            throw new Error('User document not found')
          }

          const userData = userDoc.data()
          setCurrentUser({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: userData.role || 'user',
            createdAt: userData.createdAt?.toDate() || new Date(),
            lastLogin: userData.lastLogin?.toDate(),
            phoneNumber: user.phoneNumber,
            bio: userData.bio,
            preferences: userData.preferences
          })
        } else {
          setCurrentUser(null)
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error)
        if (error.code === 'failed-precondition' || error.code === 'unavailable') {
          // Handle offline state
          if (user) {
            setCurrentUser({
              id: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: 'user',
              createdAt: new Date()
            })
          } else {
            setCurrentUser(null)
          }
        }
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentUser) return

    const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
    let sessionTimer: NodeJS.Timeout;

    const userStatusRef = doc(db, 'status', currentUser.id)
    
    const setOnlineStatus = async () => {
      // Clear any existing session timer
      if (sessionTimer) clearTimeout(sessionTimer)

      await setDoc(userStatusRef, {
        state: 'online',
        lastChanged: serverTimestamp(),
        sessionStart: serverTimestamp(),
        sessionExpiry: new Date(Date.now() + SESSION_DURATION)
      })

      // Set new session timer
      sessionTimer = setTimeout(setOfflineStatus, SESSION_DURATION)
    }

    const setOfflineStatus = async () => {
      if (sessionTimer) clearTimeout(sessionTimer)
      
      await setDoc(userStatusRef, {
        state: 'offline',
        lastChanged: serverTimestamp(),
        sessionEnd: serverTimestamp()
      })
    }

    const refreshSession = () => {
      setOnlineStatus()
    }

    // Set online when window gains focus or user interacts
    window.addEventListener('focus', setOnlineStatus)
    window.addEventListener('online', setOnlineStatus)
    window.addEventListener('mousemove', refreshSession)
    window.addEventListener('keypress', refreshSession)
    
    // Set offline when window loses focus or connection lost
    window.addEventListener('blur', setOfflineStatus)
    window.addEventListener('offline', setOfflineStatus)
    window.addEventListener('beforeunload', setOfflineStatus)

    // Set initial online status
    setOnlineStatus()

    // Cleanup function
    return () => {
      if (sessionTimer) clearTimeout(sessionTimer)
      window.removeEventListener('focus', setOnlineStatus)
      window.removeEventListener('online', setOnlineStatus)
      window.removeEventListener('mousemove', refreshSession)
      window.removeEventListener('keypress', refreshSession)
      window.removeEventListener('blur', setOfflineStatus)
      window.removeEventListener('offline', setOfflineStatus)
      window.removeEventListener('beforeunload', setOfflineStatus)
      setOfflineStatus()
    }
  }, [currentUser])

  // Return loading component instead of null
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const value = {
    currentUser,
    isAdmin: currentUser?.role === 'admin',
    loading,
    signUp,
    login,
    loginWithGoogle,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, useAuth } 