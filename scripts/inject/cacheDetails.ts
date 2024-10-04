import { sendMessage } from "webext-bridge/content-script";
import { logDebug } from "../helper/helper";
import { CacheDetails, ClonedHeaders } from "../models/model";
import { ID_PANEL, KEY_CACHE_DETAILS } from "../models/consts";


export function getCacheDetails(cacheKey: string, url: string) {
    let cacheTemp = undefined;
    caches.open(cacheKey)
        .then(async (cache) => {
            cacheTemp = cache;
            return cache.match(url)
        })
        .then(async (response) => {

            const cacheEntries = await cacheTemp.keys();
            let clonedRequest: Request;
            for (let cacheEntry of cacheEntries) {
                if (cacheEntry.url === url) {
                    clonedRequest = cacheEntry.clone();
                }
            }

            const clonedResponse = response.clone();

            const clonedRequestHeaders = {} as ClonedHeaders;
            clonedRequest.headers.forEach((value, key) => {
                clonedRequestHeaders[key] = value;
            });
            const clonedResponseHeaders = {} as ClonedHeaders;
            clonedResponse.headers.forEach((value, key) => {
                clonedResponseHeaders[key] = value;
            });

            const requestBodyTxt = await clonedRequest.text();
            const responseBodyTxt = await clonedResponse.text();

            let cacheDetails: CacheDetails = {
                request: {
                    body: requestBodyTxt,
                    bodyUsed: clonedRequest.bodyUsed,
                    cache: clonedRequest.cache,
                    credentials: clonedRequest.credentials,
                    destination: clonedRequest.destination,
                    headers: clonedRequestHeaders,
                    integrity: clonedRequest.integrity,
                    method: clonedRequest.method,
                    mode: clonedRequest.mode,
                    redirect: clonedRequest.redirect,
                    referrer: clonedRequest.referrer,
                    referrerPolicy: clonedRequest.referrerPolicy,
                    //signal: clonedRequest.signal,
                    url: clonedRequest.url,
                },
                response: {
                    body: responseBodyTxt,
                    bodyUsed: clonedResponse.bodyUsed,
                    headers: clonedResponseHeaders,
                    ok: clonedResponse.ok,
                    redirected: clonedResponse.redirected,
                    status: clonedResponse.status,
                    statusText: clonedResponse.statusText,
                    type: clonedResponse.type,
                    url: clonedResponse.url,
                }
            }

            sendMessage(ID_PANEL,
                {
                    type: KEY_CACHE_DETAILS,
                    cacheDetails: (cacheDetails as any),
                }, 'devtools');

        });

}
