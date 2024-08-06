export interface BrowserObject {
    runtime: RuntimeBrowser;
    tabs: TabsBrowser;
    scripting: ScriptingBrowser;
    devtools: {
        panels: {
            create: (name: string, icon: string, html: string) => void
        }
    }
}

export interface RuntimeBrowser {
    onMessage: {
        addListener: (callback: (request: any, sender: any, sendResponse: any) => void) => void;
    }
    sendMessage: (any) => Promise<any>;
    getURL: (string) => string;
}

export interface TabBrowser {
    id: number;
}
export interface TabsBrowser {
    query: (query: any, callback: (tabs: TabBrowser[]) => void) => void;
    sendMessage: (tabId: number, message: any, callbackResponse: (response: any) => void) => void;
}

export interface ScriptBrowser {
    target: {
        tabId: string
    },
    func?: () => void;
    files?: string[];
}

export interface ScriptingBrowser {
    executeScript: (script: ScriptBrowser) => void;
}