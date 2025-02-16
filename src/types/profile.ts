export interface UserProfile {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: 'user' | 'admin'
  createdAt: Date
  lastLogin?: Date
  phoneNumber?: string | null
  bio?: string
  preferences?: {
    notifications: boolean
    emailUpdates: boolean
    language: string
  }
}

export interface ProfileFormData {
  name: string
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  bio?: string
  phoneNumber?: string
}

export interface ProfileUpdateRequest {
  displayName?: string
  photoURL?: string
  phoneNumber?: string
  bio?: string
  preferences?: {
    notifications?: boolean
    emailUpdates?: boolean
    language?: string
  }
}

export interface PasswordUpdateRequest {
  currentPassword: string
  newPassword: string
}

export interface ProfileError {
  field: keyof ProfileFormData
  message: string
} 