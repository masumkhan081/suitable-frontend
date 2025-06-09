export const routes = {
  afterLogin: {
    admin: '/admin/dashboard',
    tenant: '/tenant/dashboard',
    user: '/user/profile'
  } as const,
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up'
  } as const,
  public: {
    home: '/',
    about: '/about'
  } as const
} as const

export type RoutePaths = typeof routes
export type RouteType = keyof RoutePaths
export type AfterLoginRoutes = typeof routes.afterLogin
export type AfterLoginPath = keyof AfterLoginRoutes
