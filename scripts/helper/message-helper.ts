import { getBrowserObject, ID_CONTENT_SCRIPT, ID_MAIN_SCRIPT, ID_PANEL, logDebug } from "./helper";

export function sendDataFromPanelToContentScript(data: any) {
    let browserObject = getBrowserObject();
    if (browserObject) {
        logDebug('send message to content script', data);
        const tabId = browserObject.devtools.inspectedWindow.tabId;
        browserObject.tabs.sendMessage(tabId,
            {
                source: ID_PANEL,
                target: ID_CONTENT_SCRIPT,
                data
            },
            (response) => {
                logDebug('Content script got data :', response);
            });
    }
}

export function sendDataFromMainScriptToContentScript(data: any) {
    const eventData = {
        source: ID_MAIN_SCRIPT,
        target: ID_CONTENT_SCRIPT,
        data
    };
    logDebug('Send message to content script with window.postMessage', eventData)
    window.postMessage(eventData, '*');
}