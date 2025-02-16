export interface AdminLog {
  id: string
  userId: string
  action: AdminAction
  timestamp: Date
  details?: string
}

export type AdminAction = 
  | 'grant_admin'
  | 'revoke_admin'
  | 'create_program'
  | 'update_program'
  | 'delete_program'
  | 'manage_users'

export interface AdminStats {
  totalUsers: number
  totalPrograms: number
  activeEnrollments: number
  revenue: number
  lastUpdated: Date
}

export interface AdminPermissions {
  canManageUsers: boolean
  canManagePrograms: boolean
  canManagePayments: boolean
  canViewStats: boolean
  canGrantAdmin: boolean
} 