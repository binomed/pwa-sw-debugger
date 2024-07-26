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

    if (sender.url != browserObject.runtime.getURL("/devtools/panel/panel.html")) {
        return;
    }

    browserObject.tabs.executeScript(
        request.tabId,
        {
            code: request.script
        });

}

/**
Listen for messages from our devtools panel.
*/
browserObject.runtime.onMessage.addListener(handleMessage); 