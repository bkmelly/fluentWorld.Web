export interface ProgramStats {
  id: string
  name: string
  enrollments: number
  revenue: number
  completionRate: number
  averageRating: number
  activeStudents: number
}

export interface ResourceStats {
  id: string
  name: string
  purchases: number
  revenue: number
  downloadCount: number
  averageRating: number
}

export interface OverallStats {
  totalStudents: number
  totalRevenue: number
  activePrograms: number
  averageCompletionRate: number
  monthlyGrowth: number
  popularPrograms: ProgramStats[]
  recentTransactions: Transaction[]
}

export interface Transaction {
  id: string
  date: Date
  amount: number
  type: 'program' | 'resource' | 'membership'
  itemName: string
  customerName: string
  status: 'completed' | 'pending' | 'failed'
} 