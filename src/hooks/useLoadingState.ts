import { useState, useEffect } from 'react'

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set loading to false after initial render
    setIsLoading(false)
    
    // Optional: Update document title when loading changes
    if (!isLoading) {
      document.title = document.title.replace(' - Loading...', '')
    }
  }, [])

  return isLoading
} 