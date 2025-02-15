import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FiUser, FiSettings, FiLogOut, FiBook, FiCreditCard } from 'react-icons/fi'
import useClickOutside from '../../hooks/useClickOutside'

const UserMenu = () => {
  const { currentUser, isAdmin, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useClickOutside(menuRef, () => setIsOpen(false))

  if (!currentUser) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80"
      >
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName || ''}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            {currentUser.displayName?.[0] || currentUser.email?.[0] || 'U'}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">
              {currentUser.displayName || currentUser.email}
            </p>
            <p className="text-xs text-gray-500">{currentUser.email}</p>
          </div>

          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="w-4 h-4" />
              Profile
            </Link>
            <Link
              to="/progress"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiBook className="w-4 h-4" />
              My Progress
            </Link>
            <Link
              to="/payments"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiCreditCard className="w-4 h-4" />
              Payment History
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiSettings className="w-4 h-4" />
              Settings
            </Link>
            
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="border-t py-2">
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <FiLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu 