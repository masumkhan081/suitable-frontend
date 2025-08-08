// types/nav.ts

// import { USER_ROLES } from '@/0.config'

// import { USER_ROLES } from '../0.config/index'

export type TopNavEntry = {
  title: string
  subtitle: string
  btnText?: string
  btnIcon?: React.ReactNode
}

// Page keys for USER role
export type UserPageKeys =
  | 'home'
  | 'profile'
  | 'matching'
  | 'onboarding'
  | 'subscription-plans'

// Page keys for ADMIN role
export type AdminPageKeys =
  | 'dashboard'
  | 'users'
  | 'documents'
  | 'settings'

// Combined page keys for all roles
export type AppPageKeys = UserPageKeys | AdminPageKeys

// Role-based navigation structure
export type UserRole = 'USER' | 'ADMIN'

export type RoleBasedPages = {
  USER: UserPageKeys[]
  ADMIN: AdminPageKeys[]
}

// Navigation map for role-based pages
export type TopNavMap = {
  USER: Record<UserPageKeys, TopNavEntry>
  ADMIN: Record<AdminPageKeys, TopNavEntry>
}
