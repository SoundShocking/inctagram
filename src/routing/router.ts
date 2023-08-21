export const routes = {
  auth: {
    login: '/auth/login',
    unProtectedPaths: [
      '/auth/forgot-password',
      '/auth/login',
      '/auth/recovery',
      '/auth/recovery/resend-form',
      '/auth/registration',
      '/auth/registration/external-account',
      '/auth/registration/resend-form',
      '/auth/registration-confirmation',
    ],
  },
  sideBar: {
    home: '/',
    userHomePage: '/',
    profile: '/profile',
    messenger: '/messenger',
    statistics: '/statistics',
    search: '/search',
    favorites: 'favorites',
  },
  myProfilePage: {
    settings: '/profile/settings/edit',
  },
}
