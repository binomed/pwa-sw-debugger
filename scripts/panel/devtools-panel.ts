import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ID_PANEL, KEY_CACHE_DATA, KEY_CACHE_DETAILS, KEY_CACHE_KEYS, KEY_CURRENT_SW_REGISTRATION, KEY_MANIFEST_DATA } from '../models/consts';
import { sendMessage, onMessage } from "webext-bridge/devtools";
import browser from "webextension-polyfill"
import { CacheDetails, CacheEntry, CacheValue, Manifest, ManifestData } from '../models/model';
import { ParentComponent } from '../helper/parent-component';



@customElement('sw-debug-panel')
export class SWPanel extends ParentComponent {


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
    cacheDetails: CacheDetails;
    manifestData: ManifestData;

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
            KEY_CURRENT_SW_REGISTRATION,
            { action: KEY_CURRENT_SW_REGISTRATION },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

        // Ask cache keys
        sendMessage(
            KEY_CACHE_KEYS,
            { action: KEY_CACHE_KEYS },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

        // Ask manifest data
        sendMessage(
            KEY_MANIFEST_DATA,
            { action: KEY_MANIFEST_DATA },
            'content-script@' + browser.devtools.inspectedWindow.tabId);
    }

    handleMessage(message) {
        console.log("Message recieved by devtools-panel", message);

        switch (message.data.type) {
            case KEY_CURRENT_SW_REGISTRATION:
                console.log(KEY_CURRENT_SW_REGISTRATION, message.data);
                this.reg = message.data.registration;
                break;
            case KEY_CACHE_KEYS:
                this.cacheKeys = message.data.cacheEntries;
                break;
            case KEY_CACHE_DATA:
                this.cacheEntry = message.data.cacheEntry;
                break;
            case KEY_CACHE_DETAILS:
                this.cacheDetails = message.data.cacheDetails;
                break;
            case KEY_MANIFEST_DATA:
                this.manifestData = message.data.mainfestData;
                break;
        }
        this.requestUpdate();
    }


    clickCacheDatas() {
        sendMessage(
            KEY_CACHE_DATA,
            { action: KEY_CACHE_DATA },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }


    render() {
        return html`
        ${super.render()}
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
            <cache-section 
                .cacheKeys="${this.cacheKeys}" 
                .cacheEntry="${this.cacheEntry}"
                .cacheDetails="${this.cacheDetails}"></cache-section>
            <hr>
            <manifest-section .manifestData="${this.manifestData}"></manifest-section>
            
        </main>
        `
    }




}
