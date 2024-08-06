'use strict';
/**
 * Debugging helper
 */
const DEBUG = false;
function logDebug(...args) {
  if (DEBUG) {
      console.log(args);
  }
};

/**
 * Compat code
 */
let browserObject = undefined;

if (typeof window != 'undefined') {
  browserObject =  window.browser !== undefined ? window.browser : chrome;
} else {
  browserObject = chrome;
}

const ID_PANEL = 'pwa-sw-debugger-ext-panel';
const ID_CONTENT_SCRIPT = 'pwa-sw-debugger-ext-content-script';
const ID_MAIN_SCRIPT = 'pwa-sw-debugger-ext-main-script';

/**
 * Injection code to play with import in the main page
 */
const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('main-content.mjs'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);

/**
 * Pass messages from the main page to the content script
 */
window.addEventListener('message', function(event) {
    logDebug('got message in content script', event);
    // We only accept messages from ourselves
    if (event.source != window)
      return;
    if (event && event.data.source 
      && event.data.source === ID_MAIN_SCRIPT
      && event.data.target === ID_CONTENT_SCRIPT
    ) {
      logDebug('got message from main script', event.data, 'now send it to panel');
      browserObject.runtime.sendMessage({
        source:ID_CONTENT_SCRIPT,
        target:ID_PANEL,
        data: event.data.data
      });
    }

    
});
/**
 * Listen to message from devtools panel
 */
browserObject.runtime.onMessage.addListener((request, sender, sendResponse) => {
  logDebug('Content script received message from devtools panel', request);
  if (request && request.source 
    && request.source === ID_PANEL
    && request.target === ID_CONTENT_SCRIPT
  ){
    // Send message to the main page
    logDebug('Sending message to the main page');
    window.postMessage({
      ...request,
      source:ID_CONTENT_SCRIPT,
      target:ID_MAIN_SCRIPT,
      }, "*");
    sendResponse({
      source:ID_CONTENT_SCRIPT,
      target:ID_PANEL,
      action:'message-sent-from-content-to-panel',
    })
  }  
});
