import { Suspense, useEffect, useState } from 'react'

interface LoadingBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
  timeout?: number
}

const LoadingBoundary = ({ children, fallback, timeout = 10000 }: LoadingBoundaryProps) => {
  const [showTimeout, setShowTimeout] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true)
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout])

  if (showTimeout) {
    return <div className="text-center py-4">Content taking too long to load. Please refresh the page.</div>
  }

  return <Suspense fallback={fallback}>{children}</Suspense>
}

export default LoadingBoundary 