// The options for persisting state
export const persistedStateOptions = {
    key: 'mediamanager',
    paths: [
        'selectedDirectory',
        'showInfoBar',
        'view',
        'token',
        'isUserLoggedIn',
    ],
    storage: window.sessionStorage,
};
