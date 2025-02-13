import { Link, useLocation } from 'react-router-dom'
import Button from './button'

const Header = () => {
  const location = useLocation()
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-brand-primary">
          Logo
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`
                relative py-2 text-sm font-medium transition-colors
                ${location.pathname === link.path 
                  ? 'text-brand-primary' 
                  : 'text-gray-600 hover:text-brand-primary'}
                ${location.pathname === link.path 
                  ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary' 
                  : ''}
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="outline">
            Sign In
          </Button>
          <Button variant="primary">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header 