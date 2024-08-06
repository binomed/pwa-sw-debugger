import { ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, logDebug } from "../helper/helper";
import { sendDataFromMainScriptToContentScript } from "../helper/message-helper";

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
        sendDataFromMainScriptToContentScript({
            type: 'cache-data',
            cacheMap
        });

    });

}
