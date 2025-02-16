import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from './AuthModal'

const PersistentAuthModal = () => {
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()
  const location = useLocation()
  
  // Show modal after 10 seconds if user is not logged in
  useEffect(() => {
    if (!currentUser && !sessionStorage.getItem('modalDismissed')) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 10000)
      
      return () => clearTimeout(timer)
    }
  }, [currentUser, location])

  const handleClose = () => {
    setShowModal(false)
    sessionStorage.setItem('modalDismissed', 'true')
  }

  if (!showModal || currentUser) return null

  return <AuthModal isOpen={showModal} onClose={handleClose} />
}

export default PersistentAuthModal 