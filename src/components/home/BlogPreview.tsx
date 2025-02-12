import { Link } from 'react-router-dom'
import Button from '../common/button'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Start Your Career in Tech',
    excerpt: 'A comprehensive guide to launching your career in the tech industry...',
    image: '/path-to-blog-image.jpg',
    date: 'March 15, 2024'
  },
  {
    id: '2',
    title: 'The Future of Digital Marketing',
    excerpt: 'Explore the latest trends and technologies shaping digital marketing...',
    image: '/path-to-blog-image.jpg',
    date: 'March 10, 2024'
  },
  {
    id: '3',
    title: 'Success Stories: Student Spotlight',
    excerpt: 'Meet our graduates who have transformed their careers through our programs...',
    image: '/path-to-blog-image.jpg',
    date: 'March 5, 2024'
  }
]

const BlogPreview = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Featured Blog Post */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src="/path-to-featured-blog-image.jpg"
              alt="Featured blog post"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest insights, student success stories, and industry trends.
            </p>
            <Button variant="primary">
              Read More
            </Button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Recent Posts
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <div className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <h4 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview 