import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'

interface BlogGridProps {
  posts: BlogPost[]
}

const BlogGrid = ({ posts }: BlogGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map(post => (
        <Link 
          key={post.id} 
          to={`/blog/${post.id}`}
          className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-video">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime} read</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mb-3">
              {post.title}
            </h3>
            <p className="text-gray-600 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BlogGrid 