import { useParams } from 'react-router-dom'
import RelatedPosts from '../components/blog/RelatedPosts'
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaLink } from 'react-icons/fa'

interface BlogPostData {
  id: string
  title: string
  content: string
  image: string
  date: string
  readTime: string
  category: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

const blogPost: BlogPostData = {
  id: '1',
  title: 'The Future of Tech: Implications and Trends',
  content: `
    <p class="mb-6 text-gray-700 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-6">The Rise of AI and Machine Learning</h2>
    <p class="mb-6 text-gray-700 leading-relaxed">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <blockquote class="border-l-4 border-primary pl-6 my-12 text-xl italic text-gray-700">
      "The future of technology lies in the hands of those who can adapt and innovate."
    </blockquote>
  `,
  image: '/path-to-featured-image.jpg',
  date: 'March 15, 2024',
  readTime: '4 min',
  category: 'Development',
  author: {
    name: 'John Smith',
    role: 'Tech Lead',
    avatar: '/path-to-avatar.jpg'
  }
}

const BlogPost = () => {
  const { id } = useParams()

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blogPost.title

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        // You might want to add a toast notification here
        break
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gray-900">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-4xl mx-auto px-6 text-white">
            <div className="flex items-center gap-3 text-sm mb-4">
              <span className="bg-primary/20 text-white px-3 py-1 rounded-full">
                {blogPost.category}
              </span>
              <span>•</span>
              <span>{blogPost.readTime} read</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {blogPost.title}
            </h1>
            <div className="flex items-center gap-4">
              <img
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                className="w-12 h-12 rounded-full border-2 border-white/20"
              />
              <div>
                <div className="font-semibold">{blogPost.author.name}</div>
                <div className="text-sm text-gray-300">
                  {blogPost.date} · {blogPost.author.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Floating Share Bar */}
          <div className="fixed left-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4">
            <button 
              onClick={() => handleShare('twitter')}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <FaTwitter size={20} />
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <FaLinkedinIn size={20} />
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <FaFacebookF size={20} />
            </button>
            <button 
              onClick={() => handleShare('copy')}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <FaLink size={20} />
            </button>
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
          
          {/* Mobile Share Section */}
          <div className="lg:hidden border-t border-b py-8 my-12">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Share this article:</div>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <FaTwitter size={20} />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <FaLinkedinIn size={20} />
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <FaFacebookF size={20} />
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <FaLink size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-8 my-12">
            <div className="flex items-center gap-6">
              <img
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {blogPost.author.name}
                </h3>
                <p className="text-gray-600">
                  {blogPost.author.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts currentPostId={id} />
    </main>
  )
}

export default BlogPost 