interface DashboardMetricProps {
  title: string
  data: any[] // Replace with proper type based on your data structure
}

const DashboardMetric = ({ title, data }: DashboardMetricProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="h-64">
        {/* Add your chart/visualization here */}
        <p className="text-gray-500">Chart coming soon...</p>
      </div>
    </div>
  )
}

export default DashboardMetric 