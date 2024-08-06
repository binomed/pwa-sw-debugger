import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getBrowserObject, ID_CONTENT_SCRIPT, ID_PANEL, logDebug } from '../helper/helper';

let browserObject = getBrowserObject();


@customElement('sw-debug-panel')
export class SWPanel extends LitElement {

    static styles = [
        css`
        :host{
            position:absolute;
            width:100%;
            height:100%;
            margin:0;
            padding:0;
            top:0;
            left:0;
            display:grid;
            grid-template-columns: 300px 1fr;
            grid-template-rows: 1fr;
            grid-gap: 20px;
            grid-template-areas: "menu content";
        }

        menu{
            grid-area:"menu";
        }

        main{
            grid-area: "content";
        }
        `
    ]

    reg: ServiceWorkerRegistration | undefined;
    cacheKeys: string[] | undefined;
    cacheMap: any;
    tabId: number = 0;

    constructor() {
        super();
        browserObject.runtime.onMessage.addListener((request, sender, sendResponse) => this.handleMessage(request, sender, sendResponse));
    }

    handleMessage(request, sender, sendResponse) {
        console.log("Message recieved by devtools-panel", request);

        if (request
            && request.source === ID_CONTENT_SCRIPT
            && request.target === ID_PANEL) {
            switch (request.data.type) {
                case 'sw-registration':
                    this.reg = request.data.registration;
                    break;
                case 'cache-entries':
                    this.cacheKeys = request.data.cacheEntries;
                    break;
                case 'cache-data':
                    this.cacheMap = request.data.cacheMap;
                    break;
            }
            this.requestUpdate();
        }
    }

    click() {
        if (browserObject) {
            console.log('send message');
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                this.tabId = tabs[0].id;
                browserObject.tabs.sendMessage(tabs[0].id,
                    {
                        source: ID_PANEL,
                        target: ID_CONTENT_SCRIPT,
                        data: {
                            action: 'current-sw-registration'
                        }
                    },
                    (response) => {
                        logDebug('Réponse du content script :', response);
                    });
            });

        }
    }

    clickBis() {
        if (browserObject) {
            logDebug('send message bis');
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                this.tabId = tabs[0].id;
                browserObject.tabs.sendMessage(tabs[0].id,
                    {
                        source: ID_PANEL,
                        target: ID_CONTENT_SCRIPT,
                        data: {
                            action: 'cache-keys'
                        }
                    },
                    (response) => {
                        logDebug('Réponse du content script :', response);
                    });
            });
        }
    }

    clickTer() {
        if (browserObject) {
            logDebug('send message ter');
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                this.tabId = tabs[0].id;
                browserObject.tabs.sendMessage(tabs[0].id,
                    {
                        source: ID_PANEL,
                        target: ID_CONTENT_SCRIPT,
                        data: {
                            action: 'cache-data'
                        }
                    },
                    (response) => {
                        logDebug('Réponse du content script :', response);
                    });
            });
        }
    }

    render() {
        return html`
        <menu>Here menu item</menu>
        <main>Service worker registration : 
            <button @click="${() => this.click()}">Get Current Service Worker</button>
            <button @click="${() => this.clickBis()}">Get Cache Keys</button><br>
            <button @click="${() => this.clickTer()}">Get Cache Datas</button><br>
            ${this.reg ? this.reg.active?.scriptURL : 'no registration'}<br>
            <br>
            ${this.cacheKeys && this.cacheKeys.length > 0 ?
                html`
                <ul>
                    ${this.cacheKeys.map((cache) => html`<li>${cache}</li>`)}
                </ul>
                `
                : 'no cache'
            }
            <br>
            ${this.cacheMap ?
                html`
                <ul>
                    ${Object.entries(this.cacheMap).map(([cacheKey, cacheValues]) => html`<li>
                    ${cacheKey}
                    <ul>${cacheValues.map((value) => html`<li>${value}</li>`)}
                    </ul></li>`)}
                </ul>
                `
                : 'no cache data'
            }
        </main>
        `
    }

}
