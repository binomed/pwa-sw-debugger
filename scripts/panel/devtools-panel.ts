import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ID_PANEL } from '../helper/helper';
import { sendMessage, onMessage } from "webext-bridge/devtools";
import browser from "webextension-polyfill"
import { CacheEntry } from '../models/model';



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
            background-color: white;
        }

        menu{
            grid-area:"menu";
            background-color: ghostwhite;
        }

        main{
            grid-area: "content";
        }
        `
    ]

    // Model 
    reg: ServiceWorkerRegistration | undefined;
    cacheKeys: string[] | undefined;
    cacheEntry: CacheEntry;

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
                this.cacheEntry = message.data.cacheEntry;
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
                <li><a href="#service-worker">Service worker</a></li>
                <li><a href="#caches">Caches</a></li>
                <li><a href="#manifest">Manifest</a></li>
            </ul>
        </menu> 
        <main>
            <sw-registration .reg="${this.reg}"></sw-registration>
            <hr>
            <cache-section .cacheKeys="${this.cacheKeys}" .cacheEntry="${this.cacheEntry}"></cache-section>
            <hr>
            <manifest-section></manifest-section>
            
        </main>
        `
    }




}
