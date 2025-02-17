import { Link } from 'react-router-dom'
import Button from '../common/button'
import type { BlogPost } from '../../types/blog'

interface FeaturedPostProps {
  post: BlogPost
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-16 hover:shadow-md transition-shadow">
        <div className="grid md:grid-cols-2">
          <div className="aspect-video md:aspect-auto">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="text-sm text-gray-500 mb-2">
              {new Date(post.date).toLocaleDateString()}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <Button variant="primary">Read More</Button>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{post.readTime} read</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedPost 