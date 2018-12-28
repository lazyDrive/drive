// The options for persisting state
export const persistedStateOptions = {
    key: 'mediamanager',
    paths: [
        'selectedDirectory',
        'showInfoBar',
        'listView',
        'gridSize',
        'token',
    ],
    storage: window.sessionStorage,
};
