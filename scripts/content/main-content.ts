import { ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, logDebug } from "../helper/helper";
import { getCacheDatas } from "../inject/cacheDatas";
import { getCacheKeys } from "../inject/cacheKeys";
import { getCurrentSWRegistration } from "../inject/getCurrentSW";





/**
Listen for messages from our content script.
*/
window.addEventListener('message', function (event) {
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