import { FiTarget, FiUsers, FiBook, FiMonitor } from 'react-icons/fi'

const features = [
  {
    icon: FiTarget,
    title: 'Industry-Focused Learning',
    description: 'Curriculum designed with input from industry leaders to ensure relevance and job readiness'
  },
  {
    icon: FiUsers,
    title: 'Expert Mentorship',
    description: 'Get guidance from experienced professionals who provide personalized feedback and support'
  },
  {
    icon: FiBook,
    title: 'Practical Projects',
    description: 'Build a portfolio with real-world projects that demonstrate your skills to employers'
  },
  {
    icon: FiMonitor,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with our blend of live sessions and on-demand content'
  }
]

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide a comprehensive learning experience designed to help you succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex gap-6 items-start p-6 rounded-xl hover:bg-[#024D5E]/5 transition-colors"
            >
              <div className="w-12 h-12 bg-[#024D5E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-[#024D5E]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs 