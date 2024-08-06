import { ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, logDebug } from "../helper/helper";
import { sendDataFromMainScriptToContentScript } from "../helper/message-helper";

export function getCacheKeys() {
    caches.keys()
        .then(cacheEntries => {
            logDebug(`List of all caches : [${cacheEntries.join(',')}]`)
            sendDataFromMainScriptToContentScript({
                type: 'cache-entries',
                cacheEntries
            })
        });
}
