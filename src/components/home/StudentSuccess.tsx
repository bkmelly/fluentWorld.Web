import { FiBriefcase, FiTrendingUp, FiAward } from 'react-icons/fi'
import Button from '../common/button'

const successStories = [
  {
    name: 'David Chen',
    role: 'Software Engineer at Google',
    image: '/path-to-image.jpg',
    story: 'From teaching assistant to software engineer at Google in 8 months.',
    achievement: '3x Salary Increase',
    icon: FiTrendingUp
  },
  {
    name: 'Sarah Miller',
    role: 'UX Designer at Apple',
    image: '/path-to-image.jpg',
    story: 'Career switcher who landed her dream job after completing our UX program.',
    achievement: 'Award Winner',
    icon: FiAward
  },
  {
    name: 'James Wilson',
    role: 'DevOps Engineer at Amazon',
    image: '/path-to-image.jpg',
    story: 'Self-taught developer who scaled his career with our advanced courses.',
    achievement: 'Multiple Offers',
    icon: FiBriefcase
  }
]

const StudentSuccess = () => {
  return (
    <section className="py-24 bg-[#024D5E]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from our graduates who transformed their careers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {successStories.map((story, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white">
                    <story.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{story.achievement}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                  {story.name}
                </h3>
                <p className="text-[#024D5E] font-medium mb-4">
                  {story.role}
                </p>
                <p className="text-gray-600">
                  {story.story}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary">
            Read More Success Stories
          </Button>
        </div>
      </div>
    </section>
  )
}

export default StudentSuccess 