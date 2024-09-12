import { sendMessage } from "webext-bridge/content-script";
import { ID_PANEL, logDebug } from "../helper/helper";
import { CacheEntry } from "../models/model";


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
                type: 'cache-data',
                cacheEntry: (cacheEntry as any),
            }, 'devtools');

    });

}
