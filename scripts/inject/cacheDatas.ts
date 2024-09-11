import { sendMessage } from "webext-bridge/content-script";
import { ID_PANEL, logDebug } from "../helper/helper";

export function getCacheDatas(cacheKey: string) {
    caches.open(cacheKey).then(async (cache) => {
        const cacheMap = {};
        cacheMap[cacheKey] = []
        const entries = await cache.keys();
        for (let entry of entries) {
            const response = await cache.match(entry);
            logDebug(`-->${entry.url}`, response);
            cacheMap[cacheKey].push({
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
                cacheMap
            }, 'devtools');

    });

}
