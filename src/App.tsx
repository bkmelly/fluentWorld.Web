import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from './components/common/header'
import Footer from './components/common/footer'
import { useLoadingState } from './hooks/useLoadingState'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PersistentAuthModal from './components/auth/PersistentAuthModal'
import { AdminProvider } from './contexts/AdminContext'
import EditBlogPost from './pages/admin/EditBlogPost'

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
const Profile = lazy(() => import('./pages/Profile'))
const BlogManagement = lazy(() => import('./pages/admin/BlogManagement'))

// Loading placeholder
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse space-y-4">
      <div className="h-12 w-48 bg-gray-200 rounded"></div>
      <div className="h-4 w-64 bg-gray-200 rounded"></div>
    </div>
  </div>
)

const App = () => {
  const isLoading = useLoadingState()

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow pt-20">
              <Suspense fallback={<PageLoader />}>
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
                    path="/admin" 
                    element={
                      <ProtectedRoute requireAdmin>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/blog" 
                    element={
                      <ProtectedRoute requireAdmin>
                        <BlogManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/blog/:postId/edit" 
                    element={
                      <ProtectedRoute requireAdmin>
                        <EditBlogPost />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Suspense>
            </div>
            <Footer />
            <PersistentAuthModal />
          </div>
        </AdminProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
