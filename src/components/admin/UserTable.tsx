import { useState } from 'react'
import { FiTrash2, FiCheck, FiX } from 'react-icons/fi'
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
  const [deletingUser, setDeletingUser] = useState<string | null>(null)

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }
    
    setDeletingUser(userId)
    try {
      await onDeleteUser(userId)
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    } finally {
      setDeletingUser(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrolled
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Programs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {user.photoURL ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.photoURL}
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {user.displayName?.[0] || user.email?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.displayName || 'No name'}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      user.isOnline ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-500">
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.enrollments.length > 0 ? (
                    <FiCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <FiX className="w-5 h-5 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.enrollments.length > 0 ? (
                      <div className="space-y-1">
                        {user.enrollments.map(enrollment => (
                          <div key={enrollment.id} className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                              {enrollment.programId}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No programs</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.enrollments.map(enrollment => (
                    <div key={enrollment.id} className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {enrollment.progress}%
                      </span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deletingUser === user.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    {deletingUser === user.id ? (
                      <span className="inline-block animate-spin">⌛</span>
                    ) : (
                      <FiTrash2 className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable 