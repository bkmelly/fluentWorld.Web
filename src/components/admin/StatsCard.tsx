interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsCard 