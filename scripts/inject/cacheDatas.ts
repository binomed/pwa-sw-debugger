import { sendMessage } from "webext-bridge/content-script";
import { logDebug } from "../helper/helper";

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
        sendMessage('cache-data',
            {
                type: 'cache-data',
                cacheMap
            }, 'devtools');

    });

}
