import { ID_PANEL, logDebug } from '../helper/helper';
import { sendMessage } from 'webext-bridge/content-script';
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
        sendMessage(ID_PANEL,
            {
                type: 'sw-registration',
                registration: regManual
            }, 'devtools');
    });
}