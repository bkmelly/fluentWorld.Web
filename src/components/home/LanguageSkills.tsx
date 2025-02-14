import { 
  FiMessageCircle, FiBookOpen, FiHeadphones, FiEdit,
  FiGlobe, FiUsers, FiMic, FiFileText 
} from 'react-icons/fi'

const languageSkills = [
  {
    name: 'Speaking',
    icon: FiMessageCircle,
    category: 'Communication',
    description: 'Develop fluent conversation skills'
  },
  {
    name: 'Reading',
    icon: FiBookOpen,
    category: 'Comprehension',
    description: 'Master text understanding'
  },
  {
    name: 'Listening',
    icon: FiHeadphones,
    category: 'Communication',
    description: 'Enhance audio comprehension'
  },
  {
    name: 'Writing',
    icon: FiEdit,
    category: 'Expression',
    description: 'Perfect written expression'
  },
  {
    name: 'Cultural Studies',
    icon: FiGlobe,
    category: 'Culture',
    description: 'Understand cultural contexts'
  },
  {
    name: 'Group Practice',
    icon: FiUsers,
    category: 'Interactive',
    description: 'Learn through collaboration'
  },
  {
    name: 'Pronunciation',
    icon: FiMic,
    category: 'Speaking',
    description: 'Master native-like accent'
  },
  {
    name: 'Grammar',
    icon: FiFileText,
    category: 'Foundation',
    description: 'Build strong language base'
  }
]

const LanguageSkills = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Language Skills
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our programs focus on developing all essential language skills for real-world fluency
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {languageSkills.map((skill, index) => (
            <div 
              key={index}
              className="group p-6 bg-white rounded-xl border hover:border-[#024D5E] transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#024D5E]/5 flex items-center justify-center mb-4 group-hover:bg-[#024D5E]/10 transition-colors">
                  <skill.icon className="w-8 h-8 text-[#024D5E]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.name}
                </h3>
                <span className="text-sm text-[#C18721] font-medium mb-2">
                  {skill.category}
                </span>
                <p className="text-sm text-gray-600">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LanguageSkills 