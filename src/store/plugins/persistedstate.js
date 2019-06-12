// The options for persisting state
export const persistedStateOptions = {
  key: 'mediamanager',
  paths: [
    'selectedDirectory',
    'showInfoBar',
    'view',
    'token',
    'isUserLoggedIn',
    'settings'
  ],
  storage: window.sessionStorage
}
