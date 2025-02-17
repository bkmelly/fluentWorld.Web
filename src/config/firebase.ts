import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { 
  getFirestore, 
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

// Initialize Firestore with settings
const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
})

// Get Firebase services
export const auth = getAuth(app)
export const storage = getStorage(app)
// export const analytics = getAnalytics(app)

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.log('Persistence failed: Multiple tabs open')
    } else if (err.code == 'unimplemented') {
      // The current browser doesn't support persistence
      console.log('Persistence not supported')
    }
  })

// Connect to emulators only if explicitly enabled
const USE_EMULATOR = false // Set to true when you want to use emulators

if (USE_EMULATOR && import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectStorageEmulator(storage, 'localhost', 9199)
  } catch (error) {
    console.error('Error connecting to emulators:', error)
  }
}

// Set up presence tracking
if (auth.currentUser) {
  const uid = auth.currentUser.uid
  const userStatusRef = doc(db, 'status', uid)

  // Offline status
  setDoc(userStatusRef, {
    state: 'offline',
    lastChanged: serverTimestamp()
  })

  // Online status
  setDoc(userStatusRef, {
    state: 'online',
    lastChanged: serverTimestamp()
  })
}

export { db }
export default app 