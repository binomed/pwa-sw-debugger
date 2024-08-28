import { sendMessage } from "webext-bridge/content-script";
import { logDebug } from "../helper/helper";

export function getCacheKeys() {
    caches.keys()
        .then(cacheEntries => {
            logDebug(`List of all caches : [${cacheEntries.join(',')}]`)
            sendMessage('cache-entries',
                {
                    type: 'cache-entries',
                    cacheEntries
                }, 'devtools');

        });
}
