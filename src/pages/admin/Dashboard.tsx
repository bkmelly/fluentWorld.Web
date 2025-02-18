import { useState, Suspense, useEffect, lazy } from 'react'
import { FiUsers, FiDollarSign, FiBookOpen, FiTrendingUp, FiActivity, FiClock, FiSearch, FiMenu } from 'react-icons/fi'
import AdminNav from '../../components/admin/AdminNav'
import StatsCard from '../../components/admin/StatsCard'
import UserTable from '../../components/admin/UserTable'
import { useAdmin } from '../../contexts/AdminContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatDistanceToNow } from 'date-fns'
import { subscribeToUsers, deleteUser, trackUserOnlineStatus } from '../../utils/adminUtils'
import { db, auth } from '../../config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import type { UserProfile } from '../../types/profile'
import type { Enrollment } from '../../types/enrollment'
import ErrorBoundary from '../../components/common/ErrorBoundary'

// Lazy load heavy components
const RevenueChart = lazy(() => import('../../components/admin/RevenueChart'))
const EnrollmentTable = lazy(() => import('../../components/admin/EnrollmentTable'))
const TransactionList = lazy(() => import('../../components/admin/TransactionList'))
const DashboardMetric = lazy(() => import('../../components/admin/DashboardMetric'))

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
) 

interface StatsItem {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
}

const Dashboard = () => {
  const { stats, logs, isLoading } = useAdmin()
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState<(UserProfile & {
    isOnline: boolean
    enrollments: Enrollment[]
  })[]>([])
  const [timeRange, setTimeRange] = useState('month')
  const [isNavOpen, setIsNavOpen] = useState(false)

  const statsData: StatsItem[] = [
    {
      title: 'Total Students',
      value: '10,234',
      change: '+12%',
      trend: 'up',
      icon: <FiUsers className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Active Courses',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: <FiBookOpen className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Monthly Revenue',
      value: '$48,234',
      change: '+22%',
      trend: 'up',
      icon: <FiDollarSign className="w-6 h-6 text-purple-500" />
    },
    {
      title: 'Completion Rate',
      value: '84%',
      change: '+5%',
      trend: 'up',
      icon: <FiTrendingUp className="w-6 h-6 text-orange-500" />
    }
  ]

  useEffect(() => {
    if (!isAdmin) return

    // Subscribe to users collection
    const unsubscribe = subscribeToUsers(setUsers)

    // Set up presence tracking
    const presenceRef = doc(db, 'status', auth.currentUser?.uid || 'anonymous')
    const presenceUnsubscribe = onSnapshot(presenceRef, (doc) => {
      if (auth.currentUser) {
        trackUserOnlineStatus(auth.currentUser.uid, doc.data()?.state === 'online')
      }
    })

    return () => {
      unsubscribe()
      presenceUnsubscribe()
    }
  }, [isAdmin])

  if (!isAdmin) {
    return <div>Access denied</div>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <AdminNav 
          isOpen={isNavOpen} 
          onToggle={() => setIsNavOpen(!isNavOpen)} 
        />
        
        <main className="p-6 pt-20">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Revenue Overview</h2>
              <RevenueChart />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
              {/* Activity content */}
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">User Management</h2>
              <div className="max-h-[600px] overflow-y-auto rounded-xl border border-gray-200">
                <UserTable 
                  users={[]} 
                  onDeleteUser={async (id: string) => {
                    console.log('Delete user:', id)
                    return true
                  }} 
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default Dashboard 