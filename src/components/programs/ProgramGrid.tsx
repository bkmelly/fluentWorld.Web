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
    title: 'Web Development',
    description: 'Learn modern web development from scratch',
    image: '/path-to-image.jpg',
    duration: '12 weeks',
    level: 'Beginner'
  },
  {
    id: '3',
    title: 'Web Development',
    description: 'Learn modern web development from scratch',
    image: '/path-to-image.jpg',
    duration: '12 weeks',
    level: 'Beginner'
  },
  {
    id: '4',
    title: 'Web Development',
    description: 'Learn modern web development from scratch',
    image: '/path-to-image.jpg',
    duration: '12 weeks',
    level: 'Beginner'
  },
  {
    id: '5',
    title: 'Web Development',
    description: 'Learn modern web development from scratch',
    image: '/path-to-image.jpg',
    duration: '12 weeks',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Web Development',
    description: 'Learn modern web development from scratch',
    image: '/path-to-image.jpg',
    duration: '12 weeks',
    level: 'Beginner'
  }
  // Add 5 more programs to make it 6 total
]

const ProgramGrid = () => {
  return (
    <section className="py-16 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
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
                  <Button variant="secondary" className="w-full">
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

export default ProgramGrid 