// types/nav.ts

// import { USER_ROLES } from '@/0.config'

// import { USER_ROLES } from '../0.config/index'

export type TopNavEntry = {
  title: string
  subtitle: string
  btnText?: string
  btnIcon?: React.ReactNode
}

export type TenantPageKeys =
  | 'profile'
  | 'dashboard'
  | 'candidatures'
  | 'dossier-management'
  | 'offers'
  | 'settings'
  | 'support'
  | 'payments'

export type LandlordPageKeys =
  | 'profile'
  | 'dashboard'
  | 'candidatures'
  | 'dossier-management'
  | 'offers'
  | 'tenants'
  | 'properties'
  | 'users'
  | 'settings'
  | 'payments'
  | 'candidature-details'
  | 'tenant-details'
  | 'manage-dossier'

export type UserRoles = 'tenant' | 'landlord' | 'agency'

export type TopNavMap = {
  tenant: Record<TenantPageKeys, TopNavEntry>
  landlord: Record<LandlordPageKeys, TopNavEntry>
  agency: Record<LandlordPageKeys, TopNavEntry>
}
