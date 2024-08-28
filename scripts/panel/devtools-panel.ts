import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ID_CONTENT_SCRIPT, ID_PANEL, logDebug } from '../helper/helper';
//import { sendDataFromPanelToContentScript } from '../helper/message-helper';
import { sendMessage, onMessage } from "webext-bridge/devtools";
import browser from "webextension-polyfill"
import { send } from 'process';



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

    constructor() {
        super();
        console.log('Hello from panel')
        onMessage(
            'sw-registration',
            (message) => {
                this.reg = (message.data as any).registration;
                this.requestUpdate();
            }
        );
        onMessage(
            'cache-entries',
            (message) => {
                this.cacheKeys = (message.data as any).cacheEntries;
                this.requestUpdate();
            }
        );
        onMessage(
            'cache-data',
            (message) => {
                this.cacheMap = (message.data as any).cacheMap;
                this.requestUpdate();
            }
        );
    }

    handleMessage(message) {
        console.log("Message recieved by devtools-panel", message);

        if (message
            && message.source === ID_CONTENT_SCRIPT
            && message.target === ID_PANEL) {
            switch (message.data.type) {
                case 'sw-registration':
                    this.reg = message.data.registration;
                    break;
                case 'cache-entries':
                    this.cacheKeys = message.data.cacheEntries;
                    break;
                case 'cache-data':
                    this.cacheMap = message.data.cacheMap;
                    break;
            }
            this.requestUpdate();
        }
    }

    clickCurrentSWReg() {
        sendMessage(
            'current-sw-registration',
            { action: 'current-sw-registration' },
            'content-script@' + browser.devtools.inspectedWindow.tabId);
    }

    clickCacheKeys() {
        sendMessage(
            'cache-keys',
            { action: 'cache-keys' },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }

    clickCacheDatas() {
        sendMessage(
            'cache-data',
            { action: 'cache-data' },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }

    render() {
        return html`
        <menu>Here menu item</menu>
        <main>Service worker registration : 
            <button @click="${() => this.clickCurrentSWReg()}">Get Current Service Worker</button>
            <button @click="${() => this.clickCacheKeys()}">Get Cache Keys</button><br>
            <button @click="${() => this.clickCacheDatas()}">Get Cache Datas</button><br>
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
