import { Link, useLocation } from 'react-router-dom'
import { FiPieChart, FiBook, FiFileText, FiArchive } from 'react-icons/fi'

const navItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: FiPieChart
  },
  {
    path: '/admin/blog',
    label: 'Blog',
    icon: FiFileText
  },
  {
    path: '/admin/programs',
    label: 'Programs',
    icon: FiBook
  },
  {
    path: '/admin/resources',
    label: 'Study Materials',
    icon: FiArchive
  }
]

const AdminNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white border-r min-h-screen w-64 py-8 px-4 fixed left-0 top-20">
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default AdminNav 