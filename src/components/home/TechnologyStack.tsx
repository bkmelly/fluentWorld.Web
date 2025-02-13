import { 
  FiCode, FiDatabase, FiCloud, FiServer, 
  FiLayers, FiBox, FiPenTool, FiMonitor 
} from 'react-icons/fi'

const technologies = [
  {
    name: 'JavaScript',
    icon: FiCode,
    category: 'Frontend'
  },
  {
    name: 'React',
    icon: FiLayers,
    category: 'Frontend'
  },
  {
    name: 'Python',
    icon: FiDatabase,
    category: 'Backend'
  },
  {
    name: 'AWS',
    icon: FiCloud,
    category: 'Cloud'
  },
  {
    name: 'Docker',
    icon: FiBox,
    category: 'DevOps'
  },
  {
    name: 'Kubernetes',
    icon: FiServer,
    category: 'DevOps'
  },
  {
    name: 'Figma',
    icon: FiPenTool,
    category: 'Design'
  },
  {
    name: 'Adobe XD',
    icon: FiMonitor,
    category: 'Design'
  }
]

const TechnologyStack = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Master In-Demand Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn the tools and technologies that top companies are actively hiring for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group p-6 bg-white rounded-xl border hover:border-[#024D5E] transition-colors"
            >
              <div className="flex flex-col items-center">
                <tech.icon className="w-12 h-12 text-gray-400 group-hover:text-[#024D5E] transition-colors" />
                <h3 className="mt-4 font-semibold text-gray-900">
                  {tech.name}
                </h3>
                <span className="mt-1 text-sm text-[#C18721]">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologyStack 