import { useState, Suspense, lazy } from 'react'
import { FiUsers, FiDollarSign, FiBookOpen, FiTrendingUp, FiActivity } from 'react-icons/fi'
import StatsCard from '../../components/admin/StatsCard'

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
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Quick Stats - Keep these non-lazy as they're lightweight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value="1,234"
          change="+12%"
          icon={<FiUsers className="w-6 h-6" />}
        />
        <StatsCard
          title="Monthly Revenue"
          value="$45,678"
          change="+8%"
          icon={<FiDollarSign className="w-6 h-6" />}
        />
        <StatsCard
          title="Active Programs"
          value="15"
          change="+2"
          icon={<FiBookOpen className="w-6 h-6" />}
        />
        <StatsCard
          title="Monthly Growth"
          value="23%"
          change="+5%"
          icon={<FiTrendingUp className="w-6 h-6" />}
        />
        <StatsCard
          title="Completion Rate"
          value="87%"
          change="+5%"
          icon={<FiActivity className="w-6 h-6" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Suspense fallback={<LoadingPlaceholder />}>
          <RevenueChart 
            timeRange={timeRange} 
            setTimeRange={setTimeRange}
          />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <DashboardMetric 
            title="Program Enrollments"
            data={[]} // Pass data when ready
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
    </div>
  )
}

export default Dashboard 