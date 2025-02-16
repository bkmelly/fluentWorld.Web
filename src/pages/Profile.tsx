import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/common/button'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { ProfileFormData, ProfileError } from '../types/profile'
import { promoteToAdmin } from '../utils/adminUtils'

const Profile = () => {
  const { currentUser, isAdmin } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<ProfileError[]>([])
  const [formData, setFormData] = useState<ProfileFormData>({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    bio: '',
    phoneNumber: currentUser?.phoneNumber || ''
  })
  const [adminSecret, setAdminSecret] = useState('')
  const [adminError, setAdminError] = useState('')

  const validateForm = (): boolean => {
    const newErrors: ProfileError[] = []

    if (isEditing) {
      if (formData.newPassword && !formData.currentPassword) {
        newErrors.push({
          field: 'currentPassword',
          message: 'Current password is required to set a new password'
        })
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.push({
          field: 'confirmPassword',
          message: 'Passwords do not match'
        })
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.push({
          field: 'newPassword',
          message: 'Password must be at least 6 characters'
        })
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      // Handle profile update logic here
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setErrors([{ field: 'name', message: 'Failed to update profile' }])
    }
  }

  const handleAdminPromotion = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminError('')

    try {
      if (!currentUser) return
      await promoteToAdmin(currentUser.id, adminSecret)
      // Refresh the page to update user role
      window.location.reload()
    } catch (error: any) {
      setAdminError(error.message)
    }
  }

  const getFieldError = (field: keyof ProfileFormData): string | undefined => {
    return errors.find(error => error.field === field)?.message
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Profile Settings
            </h1>

            <div className="flex items-center gap-6 mb-8">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || ''}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl">
                  {currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U'}
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentUser?.displayName || 'User'}
                </h2>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 ${
                      getFieldError('name') ? 'border-red-500' : ''
                    }`}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  {getFieldError('name') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    disabled
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50"
                    value={formData.email}
                  />
                </div>
              </div>

              {isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.currentPassword}
                        onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.newPassword}
                        onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                    type="button"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>

            {currentUser && !isAdmin && (
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Request Admin Access
                </h2>
                <p className="text-gray-600 mb-6">
                  If you have been given an admin secret, you can use it to gain admin privileges.
                </p>
                <form onSubmit={handleAdminPromotion} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Secret
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter admin secret"
                        value={adminSecret}
                        onChange={e => setAdminSecret(e.target.value)}
                      />
                    </div>
                    {adminError && (
                      <p className="mt-2 text-sm text-red-600">{adminError}</p>
                    )}
                  </div>
                  <Button 
                    variant="primary" 
                    type="submit"
                    className="w-full"
                  >
                    Request Admin Access
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 