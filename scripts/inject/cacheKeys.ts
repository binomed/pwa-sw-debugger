import { sendMessage } from "webext-bridge/content-script";
import { logDebug } from "../helper/helper";
import { ID_PANEL, KEY_CACHE_KEYS } from "../models/consts";

export function getCacheKeys() {
    caches.keys()
        .then(cacheEntries => {
            logDebug(`List of all caches : [${cacheEntries.join(',')}]`)
            sendMessage(ID_PANEL,
                {
                    type: KEY_CACHE_KEYS,
                    cacheEntries
                }, 'devtools');

        });
}
