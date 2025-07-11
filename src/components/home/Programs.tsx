import { Link } from 'react-router-dom'
import Button from '../common/button'

interface Program {
  id: string
  title: string
  description: string
  image: string
  duration: string
  level: string
}

const programs: Program[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Learn modern web development from scratch',
    image: '/path-to-image.jpg',
    duration: '12 weeks',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Data Science',
    description: 'Master data analysis and machine learning',
    image: '/path-to-image.jpg',
    duration: '16 weeks',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Digital Marketing',
    description: 'Learn to grow businesses online',
    image: '/path-to-image.jpg',
    duration: '8 weeks',
    level: 'All Levels'
  }
]

const Programs = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of educational programs designed to help you achieve your goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {program.title}
                </h3>
                <p className="text-gray-600">
                  {program.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{program.duration}</span>
                  <span>{program.level}</span>
                </div>
                <Link 
                  to={`/programs/${program.id}`}
                  className="block w-full"
                >
                  <Button variant="primary" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs 