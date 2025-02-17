import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from './AuthModal'

const PersistentAuthModal = () => {
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()
  const location = useLocation()
  
  useEffect(() => {
    if (!currentUser && !sessionStorage.getItem('modalDismissed')) {
      // Get or initialize page visit count
      const visitCount = parseInt(sessionStorage.getItem('pageVisits') || '0')
      
      // Increment visit count for new page
      sessionStorage.setItem('pageVisits', (visitCount + 1).toString())

      // Show modal after 30 seconds if user has visited multiple pages
      if (visitCount >= 2) {
        const timer = setTimeout(() => {
          setShowModal(true)
        }, 30000) // 30 seconds
        
        return () => clearTimeout(timer)
      }
    }
  }, [currentUser, location.pathname]) // Track pathname changes

  const handleClose = () => {
    setShowModal(false)
    sessionStorage.setItem('modalDismissed', 'true')
  }

  if (!showModal || currentUser) return null

  return <AuthModal isOpen={showModal} onClose={handleClose} />
}

export default PersistentAuthModal 