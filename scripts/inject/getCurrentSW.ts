import { logDebug } from '../helper/helper';
import { sendMessage } from 'webext-bridge/content-script';
import { getCurrentRegistration } from '../pwa-console-sw';
import { ID_PANEL, KEY_CURRENT_SW_REGISTRATION } from '../models/consts';

export function getCurrentSWRegistration() {
    getCurrentRegistration().then((registration) => {
        logDebug('registration', registration, JSON.stringify(registration));
        let regManual: any = {};
        if (registration) {
            if (registration.installing) {
                regManual.installing = {
                    scriptURL: registration.installing.scriptURL,
                    state: registration.installing.state
                };
            }
            if (registration.waiting) {
                regManual.waiting = {
                    scriptURL: registration.waiting.scriptURL,
                    state: registration.waiting.state
                }
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
                type: KEY_CURRENT_SW_REGISTRATION,
                registration: regManual
            }, 'devtools');
    });
}