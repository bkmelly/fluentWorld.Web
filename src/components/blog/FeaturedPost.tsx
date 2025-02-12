import { Link } from 'react-router-dom'
import Button from '../common/button'

const FeaturedPost = () => {
  return (
    <Link to="/blog/featured" className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-16 hover:shadow-md transition-shadow">
        <div className="grid md:grid-cols-2">
          <div className="aspect-video md:aspect-auto">
            <img
              src="/path-to-featured-image.jpg"
              alt="Featured post"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="text-sm text-gray-500 mb-2">March 15, 2024</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Future of Tech: Implications and Trends
            </h2>
            <p className="text-gray-600 mb-6">
              The future of Tech: Implications and also trends, this is an very important because it helps here to...
            </p>
            <div className="flex items-center gap-4">
              <Button variant="primary">Read More</Button>
              <div className="flex items-center gap-2 text-gray-500">
                <span>4 min read</span>
                <span>•</span>
                <span>Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedPost 