let browserObject = undefined;
if (typeof window != 'undefined') {
    window.browserObject = window.browser !== undefined ? browser : chrome;
} else {
    browserObject = chrome;
}

/**
When we receive the message, execute the given script in the given
tab.
*/
function handleMessage(request, sender, sendResponse) {

    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension", request);

    if (sender.url != browserObject.runtime.getURL("/panel/panel.html")) {
        return;
    }

    if (request.click === "test") {
        //console.log('Will send data to content.js');
        //sendResponse({farewell: "goodbye"});
        console.log('ask for execution of inject.js');
        browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                files: ['./inject/inject.js']
            });
        });
    } else if (request.click === "test bis") {
        //console.log('Will send data to content.js');
        //sendResponse({farewell: "goodbye"});
        console.log('ask for execution of write inject script', browserObject);
        browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                func: function () {
                    console.log('Executing inject function for registration');
                    /*document.querySelectorAll('img').forEach(function(img){
                        img.style.display = 'none';
                    });*/
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        console.log('registration', registration, JSON.stringify(registration));
                        let browserObject2 = window.browser !== undefined ? browser : chrome;
                        let regManual = {};
                        if (registration) {
                            if (registration.installing) {
                                regManual.installing = registration.installing;
                            }
                            if (registration.waiting) {
                                regManual.waiting = registration.waiting;
                            }
                            if (registration.active) {
                                regManual.active = {
                                    scriptURL: registration.active.scriptURL,
                                    state: registration.active.state
                                };
                            }
                            if (registration.scope) {
                                regManual.scope = registration.scope;
                            }
                        }

                        browserObject2.runtime.sendMessage({
                            resp: "ok",
                            regManual
                        });
                    });
                }
            });
        });
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
browserObject.runtime.onMessage.addListener(handleMessage);


/*
window.addEventListener('message', function(event) {
    console.log('got message', event);
});*/