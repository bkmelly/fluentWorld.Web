import { Suspense, useEffect, useState } from 'react'

interface LoadingBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
  timeout?: number
}

const LoadingBoundary = ({ children, fallback, timeout = 30000 }: LoadingBoundaryProps) => {
  const [showTimeout, setShowTimeout] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true)
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout])

  if (showTimeout) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Content is taking longer than expected to load.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 text-primary hover:text-primary-dark underline"
        >
          Refresh Page
        </button>
      </div>
    )
  }

  return <Suspense fallback={fallback}>{children}</Suspense>
}

export default LoadingBoundary 