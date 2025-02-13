import { FiUsers, FiAward, FiBookOpen, FiGlobe } from 'react-icons/fi'

const stats = [
  {
    label: 'Active Students',
    value: '10,000+',
    icon: FiUsers,
    description: 'Learning worldwide'
  },
  {
    label: 'Course Completion',
    value: '94%',
    icon: FiAward,
    description: 'Success rate'
  },
  {
    label: 'Total Courses',
    value: '50+',
    icon: FiBookOpen,
    description: 'In various fields'
  },
  {
    label: 'Countries',
    value: '120+',
    icon: FiGlobe,
    description: 'Global presence'
  }
]

const StatsSection = () => {
  return (
    <section className="py-20 bg-[#024D5E]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-[#024D5E] rounded-xl hover:bg-[#024D5E]/90 transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#C18721]" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="font-medium text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-white/80">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection 