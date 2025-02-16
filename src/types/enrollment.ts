export interface Enrollment {
  id: string
  userId: string
  programId: string
  progress: number
  startDate: Date
  lastAccessed?: Date
  status: 'active' | 'completed' | 'paused'
  completedLessons: string[]
  paymentStatus: 'pending' | 'completed'
} 