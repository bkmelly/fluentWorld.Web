interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  const isPositive = change.startsWith('+')

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <span className={`text-sm font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default StatsCard 