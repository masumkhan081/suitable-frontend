import { UserRole } from '@/0.types/config.type'

export const USER_ROLES: Record<string, UserRole> = {
  landlord: 'LANDLORD',
  agency: 'AGENCY',
  tenant: 'TENANT'
  // admin: 'ADMIN'
}

// export const PROTECTED_ROUTES = {
//   [USER_ROLES.tenant]: (role: UserRole) => role === USER_ROLES.tenant,
//   [USER_ROLES.agency]: '/agency/dashboard',
//   [USER_ROLES.landlord]: '/landlord/dashboard',
//   [USER_ROLES.admin]: '/admin/dashboard'
// }

export const REDIRECT_MAP = {
  onboardRequest: {
    [USER_ROLES.tenant]: '/onboard/tenant/onboarding-request',
    [USER_ROLES.agency]: '/onboard/agency/onboarding-request',
    [USER_ROLES.landlord]: '/onboard/landlord/onboarding-request'
  },
  onboardInit: {
    [USER_ROLES.tenant]: '/onboard/tenant/account-info',
    [USER_ROLES.agency]: '/onboard/agency/steps/agency-info',
    [USER_ROLES.landlord]: '/onboard/landlord/account-info'
  },
  afterLogin: {
    [USER_ROLES.tenant]: '/tenant/dashboard',
    [USER_ROLES.agency]: '/agency/dashboard',
    [USER_ROLES.landlord]: '/landlord/dashboard'
  },
  default: {
    [USER_ROLES.tenant]: '/tenant/dashboard',
    [USER_ROLES.agency]: '/agency/dashboard',
    [USER_ROLES.landlord]: '/landlord/dashboard'
  },
  afterLogout: '/auth/sign-in',
  afterRegister: '/auth/sign-in',
  afterForgotPassword: '/auth/sign-in',
  afterResetPassword: '/auth/sign-in',
  afterUpdateAccountType: '/auth/sign-in',
  afterVerifyEmail: '/auth/sign-up/account-type',
  afterResendVerificationEmail: '/auth/sign-in',
  afterUpdateProfile: '/auth/sign-in',
  afterUpdatePassword: '/auth/sign-in',
  afterUpdateEmail: '/auth/sign-in',
  afterUpdateRole: '/auth/sign-in',
  afterUpdateTenant: '/auth/sign-in',
  afterUpdateResidence: '/auth/sign-in',
  afterUpdateAgency: '/auth/sign-in',
  afterUpdateRent: '/auth/sign-in'
}

//  operable entities = ['residence', 'agency', 'tenant','rent'];
export const OPERABLE_ENTITIES = {
  residence: 'residence',
  landlord: 'landlord',
  dossier: 'dossier',
  agency: 'agency',
  tenant: 'tenant',
  property: 'property',
  rent: 'rent'
}

export const responseMessageMap = {
  field_required: { code: 'validation error', message: null },
  email_not_found: { code: 'email_not_found', message: 'User Not Found.' },
  invalid_email: { code: 'invalid_email', message: 'Invalid email.' },
  email_used: { code: 'email_used', message: 'Email is associated with an existing account.' },
  user_exists: { code: 'user_exists', message: 'User already exists.' },
  invalid_password: { code: 'invalid_password', message: 'Invalid password.' },
  invalid_role: { code: 'invalid_role', message: 'Invalid role.' },
  something_went_wrong: { code: 'something_went_wrong', message: 'Something went wrong.' },
  validation_error: { code: 'validation_error', message: 'Validation error.' },
  unprocessable_entity: { code: 'unprocessable_entity', message: 'Unprocessable entity.' },
  bad_request: { code: 'bad_request', message: 'Bad request.' }
}
