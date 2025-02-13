import { FiUserPlus, FiBookOpen, FiAward } from 'react-icons/fi'

const steps = [
  {
    icon: FiUserPlus,
    title: 'Join Our Community',
    description: 'Sign up and get access to our learning platform and community of learners'
  },
  {
    icon: FiBookOpen,
    title: 'Start Learning',
    description: 'Access structured courses, hands-on projects, and expert guidance'
  },
  {
    icon: FiAward,
    title: 'Get Certified',
    description: 'Complete your course and receive industry-recognized certification'
  }
]

const LearningProcess = () => {
  return (
    <section className="py-24 bg-[#024D5E]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Learning Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple and effective process to help you get started
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative text-center p-8 bg-white rounded-xl shadow-sm"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-[#024D5E]/10 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#024D5E]" />
                </div>
              )}
              <div className="w-16 h-16 bg-[#024D5E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-[#024D5E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LearningProcess 