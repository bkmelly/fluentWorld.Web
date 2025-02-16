import { useState, Suspense, useEffect, lazy } from 'react'
import { FiUsers, FiDollarSign, FiBookOpen, FiTrendingUp, FiActivity, FiClock } from 'react-icons/fi'
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

// Lazy load heavy components
const RevenueChart = lazy(() => import('../../components/admin/RevenueChart'))
const EnrollmentTable = lazy(() => import('../../components/admin/EnrollmentTable'))
const TransactionList = lazy(() => import('../../components/admin/TransactionList'))
const DashboardMetric = lazy(() => import('../../components/admin/DashboardMetric'))

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
) 

const Dashboard = () => {
  const { stats, logs, isLoading } = useAdmin()
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState<(UserProfile & {
    isOnline: boolean
    enrollments: Enrollment[]
  })[]>([])
  const [timeRange, setTimeRange] = useState('month')

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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={stats?.totalUsers.toLocaleString() || "0"}
          icon={<FiUsers className="w-6 h-6" />}
        />
        <StatsCard
          title="Revenue"
          value={`$${stats?.revenue.toLocaleString() || "0"}`}
          icon={<FiDollarSign className="w-6 h-6" />}
        />
        <StatsCard
          title="Active Programs"
          value={stats?.totalPrograms.toLocaleString() || "0"}
          icon={<FiBookOpen className="w-6 h-6" />}
        />
        <StatsCard
          title="Active Enrollments"
          value={stats?.activeEnrollments.toLocaleString() || "0"}
          icon={<FiTrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* User Management Section */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500">Manage your users and their enrollments</p>
        </div>
        <UserTable 
          users={users} 
          onDeleteUser={deleteUser}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {logs.slice(0, 5).map(log => (
            <div key={log.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <FiActivity className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {log.action.replace(/_/g, ' ').toLowerCase()}
                  </span>
                  {log.details && `: ${log.details}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <FiClock className="w-3 h-3 inline mr-1" />
                  {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Suspense fallback={<LoadingPlaceholder />}>
          <RevenueChart 
            timeRange={timeRange as 'month' | 'week' | 'year'}
            setTimeRange={setTimeRange}
          />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <DashboardMetric 
            title="Program Enrollments"
            data={[]} // Pass enrollment data when ready
          />
        </Suspense>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Suspense fallback={<LoadingPlaceholder />}>
          <EnrollmentTable />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <TransactionList />
        </Suspense>
      </div>

      <div className="stats">
        <div>Total Users: {stats?.totalUsers}</div>
        <div>Total Programs: {stats?.totalPrograms}</div>
        <div>Active Enrollments: {stats?.activeEnrollments}</div>
        <div>Revenue: ${stats?.revenue.toFixed(2)}</div>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-gray-500">
        Last updated: {stats?.lastUpdated.toLocaleString()}
      </div>
    </div>
  )
}

export default Dashboard 