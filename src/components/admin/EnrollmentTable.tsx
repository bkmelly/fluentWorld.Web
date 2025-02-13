import { ProgramStats } from '../../types/dashboard'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

const mockData: ProgramStats[] = [
  {
    id: '1',
    name: 'Web Development Bootcamp',
    enrollments: 234,
    revenue: 234000,
    completionRate: 87,
    averageRating: 4.8,
    activeStudents: 198
  },
  {
    id: '2',
    name: 'UI/UX Design Pro',
    enrollments: 189,
    revenue: 189000,
    completionRate: 92,
    averageRating: 4.9,
    activeStudents: 156
  },
  // Add more mock data...
]

const EnrollmentTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Program Enrollments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockData.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{program.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{program.enrollments}</span>
                    <span className="ml-2 text-xs text-green-500">
                      <FiTrendingUp className="inline" /> +12%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${program.revenue.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${program.completionRate}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {program.completionRate}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {program.averageRating}
                    </span>
                    <span className="ml-1 text-yellow-400">★</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EnrollmentTable 