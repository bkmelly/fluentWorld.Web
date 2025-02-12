interface Benefit {
  id: number
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Industry-Relevant Skills',
    description: 'Learn the most in-demand skills that employers are looking for.'
  },
  {
    id: 2,
    title: 'Expert Instructors',
    description: 'Learn from professionals with real-world industry experience.'
  },
  {
    id: 3,
    title: 'Career Support',
    description: 'Get guidance and support to launch your new career.'
  }
]

const BenefitsTimeline = () => {
  return (
    <section className="py-16 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Program Benefits
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-primary" />
          
          {/* Benefits */}
          <div className="space-y-12">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2" />
                
                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsTimeline 