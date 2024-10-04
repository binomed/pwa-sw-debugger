import { on } from "events";
import { logDebug } from "../helper/helper";
import { getCacheDatas } from "../inject/cacheDatas";
import { getCacheKeys } from "../inject/cacheKeys";
import { getCurrentSWRegistration } from "../inject/getCurrentSW";
import { sendMessage, onMessage } from "webext-bridge/content-script";
import { getCacheDetails } from "../inject/cacheDetails";
import { KEY_CACHE_DATA, KEY_CACHE_DETAILS, KEY_CACHE_KEYS, KEY_CURRENT_SW_REGISTRATION, KEY_MANIFEST_DATA } from "../models/consts";
import { getManifest } from "../inject/manifest";



onMessage(KEY_CURRENT_SW_REGISTRATION, (message) => {
  console.log(KEY_CURRENT_SW_REGISTRATION, message);
  getCurrentSWRegistration()
});
onMessage(KEY_CACHE_KEYS, (message) => getCacheKeys());
onMessage(KEY_CACHE_DATA, (message) => getCacheDatas(message.data.cacheKey));
onMessage(KEY_CACHE_DETAILS, (message) => getCacheDetails(message.data.cacheKey, message.data.url));
onMessage(KEY_MANIFEST_DATA, (message) => getManifest());
/**
Listen for messages from our content script.
*/
/*window.addEventListener('message', function (event) {
  logDebug('got message in content', event);
  if (event && event.data.source
    && event.data.source === ID_CONTENT_SCRIPT
    && event.data.target === ID_MAIN_SCRIPT
  ) {
    switch (event.data.data.action) {
      case 'current-sw-registration':
        getCurrentSWRegistration();
        break;
      case 'cache-keys':
        getCacheKeys()
        break;
      case 'cache-data':
        getCacheDatas()
        break;
    }

  }



});
*/
console.log('main-content running');
