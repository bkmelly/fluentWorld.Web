import { Link, useLocation } from 'react-router-dom'
import { 
  FiPieChart, FiUsers, FiBook, FiFileText, 
  FiLogOut, FiMenu, FiX 
} from 'react-icons/fi'

interface AdminNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminNav = ({ isOpen, onToggle }: AdminNavProps) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: FiPieChart },
    { path: '/admin/users', label: 'Users', icon: FiUsers },
    { path: '/admin/courses', label: 'Courses', icon: FiBook },
    { path: '/admin/blog', label: 'Blog', icon: FiFileText },
  ]

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      {/* Menu Panel */}
      <div className={`
        fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-50
        transform transition-transform duration-200 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full pt-16">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onToggle}
                className={`
                  flex items-center px-4 py-3 mb-2 rounded-xl
                  transition-colors duration-200
                  ${location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button 
              className="flex items-center w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50"
              onClick={() => {
                onToggle()
                // Add logout logic here
              }}
            >
              <FiLogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNav 