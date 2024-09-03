import { sendMessage } from "webext-bridge/content-script";
import { ID_PANEL, logDebug } from "../helper/helper";

export function getCacheKeys() {
    caches.keys()
        .then(cacheEntries => {
            logDebug(`List of all caches : [${cacheEntries.join(',')}]`)
            sendMessage(ID_PANEL,
                {
                    type: 'cache-entries',
                    cacheEntries
                }, 'devtools');

        });
}
