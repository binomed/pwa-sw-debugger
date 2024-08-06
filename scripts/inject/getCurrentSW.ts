import { getBrowserObject, ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, logDebug } from '../helper/helper';
import { getCurrentRegistration } from '../pwa-console-sw';

export function getCurrentSWRegistration() {
    getCurrentRegistration().then((registration) => {
        logDebug('registration', registration, JSON.stringify(registration));
        let regManual: any = {};
        if (registration) {
            if (registration.installing) {
                regManual.installing = registration.installing;
            }
            if (registration.waiting) {
                regManual.waiting = registration.waiting;
            }
            if (registration.active) {
                regManual.active = {
                    scriptURL: registration.active.scriptURL,
                    state: registration.active.state
                };
            }
            if (registration.scope) {
                regManual.scope = registration.scope;
            }
        }

        const eventData = {
            source: ID_MAIN_SCRIPT,
            target: ID_CONTENT_SCRIPT,
            data: {
                type: 'sw-registration',
                registration: regManual
            }
        };
        logDebug('Send message to content script with window.postMessage', eventData)
        window.postMessage(eventData, '*');
    });
}