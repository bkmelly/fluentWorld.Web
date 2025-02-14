import { Suspense, lazy, useEffect } from 'react'
import Hero from '../components/home/hero'
import StatsSection from '../components/home/StatsSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import LearningProcess from '../components/home/LearningProcess'
import LanguageSkills from '../components/home/LanguageSkills'
import StudentSuccess from '../components/home/StudentSuccess'
import TeamSection from '../components/home/TeamSection'
import ErrorBoundary from '../components/common/ErrorBoundary'

// Lazy load components
const Programs = lazy(() => import('../components/home/Programs'))
const Testimonials = lazy(() => import('../components/home/testimonials'))
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
  // Preload components when Home mounts
  useEffect(() => {
    const preloadComponents = async () => {
      const components = [
        import('../components/home/Programs'),
        import('../components/home/testimonials'),
        import('../components/home/BlogSection'),
        import('../components/home/CTASection')
      ]
      await Promise.all(components)
    }
    preloadComponents()
  }, [])

  return (
    <main>
      <ErrorBoundary>
        <Hero 
          title="Transform Your Future with Expert-Led Education"
          description="Access world-class learning programs designed to help you succeed in today's digital world. Learn from industry experts and join our global community of learners."
          ctaText="Explore Programs"
          scrollTo="programs"
        />
        
        <StatsSection />
        
        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary>
            <div>
              <Programs />
              <WhyChooseUs />
              <LanguageSkills />
              <LearningProcess />
              <Testimonials />
              <StudentSuccess />
              <TeamSection />
              <BlogSection />
              <CTASection />
            </div>
          </ErrorBoundary>
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

export default Home 