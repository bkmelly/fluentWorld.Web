import { useState, Suspense, lazy, useEffect } from 'react'
// import Hero from '../components/home/hero'
import BlogCategories from '../components/blog/BlogCategories'
import CommunitySection from '../components/resources/CommunitySection'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { BlogPost } from '../types/blog'

// Lazy load components
const FeaturedPost = lazy(() => import('../components/blog/FeaturedPost'))
const BlogGrid = lazy(() => import('../components/blog/BlogGrid'))

// Loading placeholder
const ContentLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-64 bg-gray-200 rounded-lg"></div>
    <div className="grid md:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  </div>
)

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const blogRef = collection(db, 'blogs')
        const q = query(blogRef, orderBy('date', 'desc'))
        const querySnapshot = await getDocs(q)
        
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate?.() || new Date(doc.data().date),
        })) as BlogPost[]

        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-gray-900 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Latest Insights & News
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights in technology and education.
          </p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Categories */}
            <BlogCategories
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Article
          </h2>
          <Suspense fallback={<ContentLoader />}>
            {posts.length > 0 && <FeaturedPost post={posts[0]} />}
          </Suspense>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select className="border rounded-lg px-3 py-1">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Trending</option>
              </select>
            </div>
          </div>
          <Suspense fallback={<ContentLoader />}>
            <BlogGrid posts={filteredPosts.slice(1)} />
          </Suspense>
        </div>
      </section>

      {/* Community Section */}
      <CommunitySection />
    </main>
  )
}

export default Blog 