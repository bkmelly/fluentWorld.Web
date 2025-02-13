import { Suspense, lazy, useEffect } from 'react'
import { useLoadingState } from '../hooks/useLoadingState'
import Hero from '../components/home/hero'
import LoadingBoundary from '../components/common/LoadingBoundary'

// Lazy load non-critical components
const Programs = lazy(() => import('../components/home/Programs'))
const AboutPrograms = lazy(() => import('../components/home/AboutPrograms'))
const Testimonials = lazy(() => import('../components/home/testimonials'))
const BlogIntro = lazy(() => import('../components/home/BlogIntro'))
const BlogSection = lazy(() => import('../components/home/BlogSection'))
const CTASection = lazy(() => import('../components/home/CTASection'))

// Loading placeholder
const SectionLoader = () => (
  <div className="py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded"></div>
        <div className="h-4 w-full max-w-2xl bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const Home = () => {
  const isLoading = useLoadingState()

  useEffect(() => {
    // Set page title
    document.title = isLoading ? 'Loading... | Site Name' : 'Home | Site Name'
  }, [isLoading])

  return (
    <main>
      {/* Keep Hero non-lazy as it's above the fold */}
      <Hero 
        title="Educational Resources"
        description="Browse through our collection of learning materials, tools, and resources"
        ctaText="Browse Resources"
        scrollTo="resources"
        image="/path-to-your-hero-image.jpg"
      />
      
      <LoadingBoundary fallback={<SectionLoader />}>
        <Programs />
      </LoadingBoundary>
      
      <LoadingBoundary fallback={<SectionLoader />}>
        <AboutPrograms />
      </LoadingBoundary>
      
      <LoadingBoundary fallback={<SectionLoader />}>
        <Testimonials />
      </LoadingBoundary>
      
      <LoadingBoundary fallback={<SectionLoader />}>
        <BlogIntro />
      </LoadingBoundary>
      
      <LoadingBoundary fallback={<SectionLoader />}>
        <BlogSection />
      </LoadingBoundary>
      
      <LoadingBoundary fallback={<SectionLoader />}>
        <CTASection />
      </LoadingBoundary>
    </main>
  )
}

export default Home 