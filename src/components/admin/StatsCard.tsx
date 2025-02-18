interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
}

const StatsCard = ({ title, value, change, trend, icon }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
          trend === 'up' 
            ? 'text-green-700 bg-green-50' 
            : 'text-red-700 bg-red-50'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-500">vs last month</span>
      </div>
    </div>
  )
}

export default StatsCard 