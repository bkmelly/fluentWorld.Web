import { useState } from 'react'
import { FiMoreVertical, FiEdit2, FiTrash2, FiMail, FiCheck } from 'react-icons/fi'
import { deleteUser } from '../../utils/adminUtils'
import { UserProfile } from '../../types/profile'
import { Enrollment } from '../../types/enrollment'

interface UserTableProps {
  users: (UserProfile & {
    isOnline: boolean
    enrollments: Enrollment[]
  })[]
  onDeleteUser: (userId: string) => Promise<boolean | void>
}

const UserTable = ({ users, onDeleteUser }: UserTableProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }
    
    try {
      await onDeleteUser(userId)
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    className="h-10 w-10 rounded-xl object-cover" 
                    src={user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || user.email || 'No Name')} 
                    alt="" 
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.displayName || 'No name'}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                  user.isOnline ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <FiCheck className={`w-3 h-3 mr-1 ${
                    user.isOnline ? 'text-green-500' : 'text-gray-500'
                  }`} />
                  {user.isOnline ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.joined}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative">
                  <button
                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                    className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiMoreVertical className="w-5 h-5" />
                  </button>
                  
                  {selectedUser === user.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiEdit2 className="w-4 h-4 mr-3" />
                          Edit
                        </button>
                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiMail className="w-4 h-4 mr-3" />
                          Send Email
                        </button>
                        <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <FiTrash2 className="w-4 h-4 mr-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable 