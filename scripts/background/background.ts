import { getBrowserObject } from "../helper/helper";
import { getCurrentSWRegistration } from "../inject/getCurrentSW";
//import { getCurrentRegistration } from "../pwa-console-sw";

/**
When we receive the message, execute the given script in the given
tab.
*/
function handleMessage(request, sender, sendResponse) {

    const browserObject = getBrowserObject()
    if (request && request.source && request.source === 'pwa-sw-debbugger-ext') {
        console.log(sender.tab ?
            "in background, from a content script:" + sender.tab.url :
            "in background, from the extension", request);
        browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.tabs.sendMessage(tabs[0].id, request,
                (response) => {
                    console.log('Réponse du content script :', response);
                });
        });
        sendResponse({
            source: 'pwa-sw-debbugger-ext',
            action: 'message-sent-from-back-to-content',
        })
    }


    if (sender.url != browserObject.runtime.getURL("/panel/panel.html")) {
        return;
    }

    if (request.click === "test") {
        //console.log('Will send data to content.js');
        //sendResponse({farewell: "goodbye"});
        /*console.log('ask for execution of inject.js');
        browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                files: ['./inject/inject.js']
            });
        });*/
        /*browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                files: ['./inject/getCurrentSW.mjs']
            });
        });*/

    } else if (request.click === "test bis") {
        //console.log('Will send data to content.js');
        //sendResponse({farewell: "goodbye"});
        console.log('ask for execution of write inject script', browserObject);
        /*browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                func: () => {
                    getCurrentSWRegistration();
                }
            });
        });*/
    }
    /*browserObject.tabs.executeScript(
        request.tabId,
        {
            code: request.script
        });*/

}

/**
Listen for messages from our devtools panel.
*/
//getBrowserObject().runtime.onMessage.addListener(handleMessage);


/*
window.addEventListener('message', function(event) {
    console.log('got message', event);
});*/