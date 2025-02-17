import { FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi'
import type { BlogPost } from '../../types/blog'
import { useNavigate } from 'react-router-dom'

interface BlogPostCardProps {
  post: BlogPost
  onEdit: () => void
  onDelete: () => void
}

const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  const navigate = useNavigate()

  return (
    <div className="group">
      <div className="aspect-video relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
            title="Edit Details"
          >
            <FiEdit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => navigate(`/admin/blog/${post.id}/edit`)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
            title="Edit Content"
          >
            <FiFileText className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
            title="Delete Post"
          >
            <FiTrash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime} read</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </div>
  )
}

export default BlogPostCard 