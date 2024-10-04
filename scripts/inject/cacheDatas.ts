import { sendMessage } from "webext-bridge/content-script";
import { logDebug } from "../helper/helper";
import { CacheEntry } from "../models/model";
import { ID_PANEL, KEY_CACHE_DATA } from "../models/consts";


export function getCacheDatas(cacheKey: string) {
    caches.open(cacheKey).then(async (cache) => {
        const cacheEntry: CacheEntry = {
            cacheKey,
            cacheValues: []
        };
        const entries = await cache.keys();
        for (let entry of entries) {
            const response = await cache.match(entry);
            logDebug(`-->${entry.url}`, response);
            cacheEntry.cacheValues.push({
                url: response.url,
                type: response.type,
                status: response.status,
                'content-type': response.headers.get('content-type'),
                'last-modified': response.headers.get('last-modified'),
                size: response.headers.get('content-length')
            });
        }
        sendMessage(ID_PANEL,
            {
                type: KEY_CACHE_DATA,
                cacheEntry: (cacheEntry as any),
            }, 'devtools');

    });

}
