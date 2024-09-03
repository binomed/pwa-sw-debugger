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
            grid-template-columns: 200px 1fr;
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
        onMessage(
            ID_PANEL,
            (message) => this.handleMessage(message));
    }

    firstUpdated() {
        this.initBaseElements();
    }

    initBaseElements() {
        // Ask sw registration 
        sendMessage(
            'current-sw-registration',
            { action: 'current-sw-registration' },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

        // Ask cache keys
        sendMessage(
            'cache-keys',
            { action: 'cache-keys' },
            'content-script@' + browser.devtools.inspectedWindow.tabId);
    }

    handleMessage(message) {
        console.log("Message recieved by devtools-panel", message);

        switch (message.data.type) {
            case 'sw-registration':
                console.log('sw-registration', message.data);
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


    clickCacheDatas() {
        sendMessage(
            'cache-data',
            { action: 'cache-data' },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }

    render() {
        return html`
        <menu>
            <h3>PWA ServiceWorker Debugger</h3>
            <ul>
                <li>Service worker</li>
                <li>Cache</li>
                <li>Manifest</li>
            </ul>
        </menu> 
        <main>
            ${this.render_SW()}
            <hr>
            ${this.render_caches()}
            <hr>
            ${this.render_manifest()}
            
        </main>
        `
    }


    render_SW() {
        return html`
        <h1>Service worker registration</h1>
        ${this.reg ? this.reg.active?.scriptURL : 'no registration'}<br>
        `;
    }

    render_caches() {
        return html`
        <h1>Caches</h1>
        <button @click="${() => this.clickCacheDatas()}">Get Cache Datas</button><br>
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
        `;
    }

    render_manifest() {
        return html`
        <h1>Manifest</h1>
        
        `;
    }
}
