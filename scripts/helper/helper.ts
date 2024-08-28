const DEBUG = true;

export const ID_PANEL = 'pwa-sw-debugger-ext-panel';
export const ID_CONTENT_SCRIPT = 'pwa-sw-debugger-ext-content-script';
export const ID_MAIN_SCRIPT = 'pwa-sw-debugger-ext-main-script';
export const ID_BACKGROUND_SCRIPT = 'pwa-sw-debugger-ext-background-script';

export function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
};
