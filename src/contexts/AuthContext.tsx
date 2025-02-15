import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

interface UserProfile extends User {
  role?: 'user' | 'admin'
  displayName: string | null
  email: string | null
  photoURL: string | null
}

interface AuthContextType {
  currentUser: UserProfile | null
  isAdmin: boolean
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        role: 'user',
        createdAt: serverTimestamp()
      })
    } catch (error: any) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      try {
        const userDocRef = doc(db, 'users', userCredential.user.uid)
        const userDoc = await getDoc(userDocRef)
        
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
            role: 'user',
            createdAt: serverTimestamp()
          })
        }
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError)
        // Continue with auth even if Firestore fails
      }
    } catch (error: any) {
      console.error('Google login error:', error)
      throw error
    }
  }

  const logout = () => signOut(auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          const userData = userDoc.data()
          
          setCurrentUser({
            ...user,
            role: userData?.role || 'user'
          } as UserProfile)
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Set basic user data if Firestore is unavailable
          setCurrentUser({
            ...user,
            role: 'user'
          } as UserProfile)
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const isAdmin = currentUser?.role === 'admin'

  const value = {
    currentUser,
    isAdmin,
    loading,
    signUp,
    login,
    loginWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 