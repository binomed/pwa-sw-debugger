import { ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, logDebug } from "../helper/helper";

export function getCacheKeys() {
    caches.keys()
        .then(cacheEntries => {
            logDebug(`List of all caches : [${cacheEntries.join(',')}]`)
            const eventData = {
                source: ID_MAIN_SCRIPT,
                target: ID_CONTENT_SCRIPT,
                data: {
                    type: 'cache-entries',
                    cacheEntries
                }
            };
            logDebug('Send message to content script with window.postMessage', eventData)
            window.postMessage(eventData, '*');
        });
}
