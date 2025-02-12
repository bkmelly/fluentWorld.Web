import { Link } from 'react-router-dom'

interface RelatedPostsProps {
  currentPostId?: string
}

const RelatedPosts = ({ currentPostId }: RelatedPostsProps) => {
  const relatedPosts = [
    {
      id: '2',
      title: 'Understanding Modern Web Development',
      excerpt: 'A deep dive into modern web development practices and tools...',
      image: '/path-to-image.jpg',
      date: 'March 10, 2024'
    },
    {
      id: '3',
      title: 'The Impact of AI on Software Development',
      excerpt: 'How artificial intelligence is changing the way we code...',
      image: '/path-to-image.jpg',
      date: 'March 8, 2024'
    }
  ]

  return (
    <section className="py-16 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {relatedPosts.map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500">{post.date}</span>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mt-2 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedPosts 