import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Button from './button'
import { FiMenu, FiX } from 'react-icons/fi'
import AuthModal from '../auth/AuthModal'
import UserMenu from '../auth/UserMenu'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { currentUser } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/programs', label: 'Programs' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#024D5E]">
            Logo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-[#024D5E] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300
                  ${isActive(link.path) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <UserMenu />
            ) : (
              <Button 
                variant="primary"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-[#024D5E] md:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Mobile Sidebar */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden ${
              isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Sidebar Content */}
            <div 
              className={`fixed inset-y-0 right-0 w-[280px] bg-[#024D5E] p-6 transition-transform duration-300 ease-in-out transform ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-white"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Mobile Navigation Links */}
              <nav className="mt-16 flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-white/80 text-lg font-medium py-2 hover:text-white transition-colors ${
                      isActive(link.path) ? 'text-white' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA - Styled like footer card */}
              <div className="absolute bottom-8 left-6 right-6 bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ready to Start?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Begin your language learning journey today.
                </p>
                <Button 
                  variant="secondary"
                  className="w-full bg-[#C18721] hover:bg-[#C18721]/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  )
}

export default Header 