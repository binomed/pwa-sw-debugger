import { ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, logDebug } from "../helper/helper";

export function getCacheDatas() {
    caches.keys().then(async (cacheEntries) => {
        const cacheMap = {};
        for (let cacheKey of cacheEntries) {
            logDebug(`List of entries for cache '${cacheKey}'`);
            const cache = await caches.open(cacheKey);
            cacheMap[cacheKey] = []
            const entries = await cache.keys();
            for (let entry of entries) {
                const response = await cache.match(entry);
                logDebug(`-->${entry.url}`, response);
                cacheMap[cacheKey].push(entry.url);
            }
        }
        const eventData = {
            source: ID_MAIN_SCRIPT,
            target: ID_CONTENT_SCRIPT,
            data: {
                type: 'cache-data',
                cacheMap
            }
        };
        logDebug('Send message to content script with window.postMessage', eventData)
        window.postMessage(eventData, '*');
    });

}
