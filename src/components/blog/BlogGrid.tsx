import { Link } from 'react-router-dom'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
}

const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Developing Useful Products That Would Meet User Needs',
    excerpt: 'The future of Tech: Implications and also trends, this is an very important because it helps here to...',
    image: '/path-to-image.jpg',
    date: 'March 15, 2024',
    readTime: '4 min',
    category: 'Development'
  },
  {
    id: '2',
    title: 'The Importance of Branding: tips for building a personal brand online',
    excerpt: 'The future of Tech: Implications and also trends, this is an very important because it helps here to...',
    image: '/path-to-image.jpg',
    date: 'March 14, 2024',
    readTime: '3 min',
    category: 'UX/UI Design'
  },
  {
    id: '3',
    title: 'Understanding Modern Web Development Frameworks',
    excerpt: 'The future of Tech: Implications and also trends, this is an very important because it helps here to...',
    image: '/path-to-image.jpg',
    date: 'March 13, 2024',
    readTime: '5 min',
    category: 'Development'
  },
  {
    id: '4',
    title: 'Best Practices for Quality Assurance in Software Development',
    excerpt: 'The future of Tech: Implications and also trends, this is an very important because it helps here to...',
    image: '/path-to-image.jpg',
    date: 'March 12, 2024',
    readTime: '4 min',
    category: 'QA Engineering'
  },
  {
    id: '5',
    title: 'DevOps: Bridging the Gap Between Development and Operations',
    excerpt: 'The future of Tech: Implications and also trends, this is an very important because it helps here to...',
    image: '/path-to-image.jpg',
    date: 'March 11, 2024',
    readTime: '6 min',
    category: 'DevOps'
  },
  {
    id: '6',
    title: 'Career Growth in Tech: A Comprehensive Guide',
    excerpt: 'The future of Tech: Implications and also trends, this is an very important because it helps here to...',
    image: '/path-to-image.jpg',
    date: 'March 10, 2024',
    readTime: '5 min',
    category: 'Career'
  }
]

interface BlogGridProps {
  category: string | null
}

const BlogGrid = ({ category }: BlogGridProps) => {
  const filteredPosts = category
    ? posts.filter(post => post.category === category)
    : posts

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
        <Link 
          key={post.id}
          to={`/blog/${post.id}`}
          className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="aspect-video relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 rounded-full text-sm text-gray-700">
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{post.date}</span>
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