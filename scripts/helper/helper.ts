import { BrowserObject } from "../models/model";

const DEBUG = true;

export const ID_PANEL = 'pwa-sw-debugger-ext-panel';
export const ID_CONTENT_SCRIPT = 'pwa-sw-debugger-ext-content-script';
export const ID_MAIN_SCRIPT = 'pwa-sw-debugger-ext-main-script';

export function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
};

export function getBrowserObject(): BrowserObject {
    if (typeof window != 'undefined') {
        return (window as any).browser !== undefined ? (window as any).browser : (chrome as any) as BrowserObject;
    } else {
        return (chrome as any) as BrowserObject;
    }
};
