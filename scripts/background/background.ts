import "webext-bridge/background";

//import Browser = require("webextension-polyfill");
//import { getBrowserObject, ID_BACKGROUND_SCRIPT, ID_CONTENT_SCRIPT, ID_PANEL, logDebug } from "../helper/helper";
//import { getCurrentSWRegistration } from "../inject/getCurrentSW";
//import { getCurrentRegistration } from "../pwa-console-sw";
//import browser from "webextension-polyfill";
//import { sendMessage, onMessage } from "webext-bridge/background";



/*onMessage('current-sw-registration', (message) => {
    sendMessage('current-sw-registration', { action: 'current-sw-registration' }, 'content-script');
});*/
/**
When we receive the message, execute the given script in the given
tab.
*/
/*function handleMessage(request, sender, sendResponse) {

    console.log(sender.tab ?
        "in background, from a content script:" + sender.tab.url :
        "in background, from the extension", request);

    if (request.tabId && request.source === ID_PANEL && request.target === ID_BACKGROUND_SCRIPT) {
        console.log('will send message to content script');
        browser.tabs.sendMessage(request.tabId, {
            //getBrowserObject().tabs.sendMessage(request.tabId, {
            source: request.source,
            target: ID_CONTENT_SCRIPT,
            data: request.data
        });/*, (response) => {
            logDebug('Content script got data :', response);
        })*/
/*} else if (request.source === ID_CONTENT_SCRIPT && request.target === ID_BACKGROUND_SCRIPT) {
    console.log('will send message to panel');
    browser.runtime.sendMessage({
        //getBrowserObject().runtime.sendMessage({
        source: ID_CONTENT_SCRIPT,
        target: ID_PANEL,
        data: request.data
    });
}

}

/**
Listen for messages from our devtools panel.
*/
//browser.runtime.onMessage.addListener(handleMessage);
//getBrowserObject().runtime.onMessage.addListener(handleMessage);

console.log('Hello from background');


/*window.addEventListener('message', function (event) {
    console.log('got message in background', event);
});*/