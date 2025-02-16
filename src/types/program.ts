export interface Program {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  duration: number
  thumbnail: string
  lessons: Lesson[]
  enrolledStudents?: number
  rating?: number
  createdAt: Date
}

export interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  resources: string[]
  order: number
} 