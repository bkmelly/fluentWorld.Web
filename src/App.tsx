import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Header from './components/common/header'
import Footer from './components/common/footer'
import { useLoadingState } from './hooks/useLoadingState'

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'))
const Programs = lazy(() => import('./pages/Programs'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const ProgramDetails = lazy(() => import('./pages/ProgramDetails'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const StudyMaterials = lazy(() => import('./pages/StudyMaterials'))

// Loading placeholder
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse space-y-4">
      <div className="h-12 w-48 bg-gray-200 rounded"></div>
      <div className="h-4 w-64 bg-gray-200 rounded"></div>
    </div>
  </div>
)

function App() {
  const isLoading = useLoadingState()

  useEffect(() => {
    // Remove loading indicator from title when components are loaded
    if (!isLoading) {
      document.title = document.title.replace(' - Loading...', '')
    }
  }, [isLoading])

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Suspense 
            fallback={<PageLoader />}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:id" element={<ProgramDetails />} />
              <Route path="/study-materials" element={<StudyMaterials />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/checkout/:type/:id" element={<Checkout />} />
              <Route 
                path="/admin/*" 
                element={
                  <div className="bg-gray-50 min-h-screen">
                    <Dashboard />
                  </div>
                } 
              />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
