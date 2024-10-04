import browser from "webextension-polyfill";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheDetails, CacheEntry, CacheValue } from "../models/model";
import { ParentComponent } from "../helper/parent-component";
import { KEY_CACHE_DATA } from "../models/consts";


@customElement('cache-section')
export class CacheSectionComponent extends ParentComponent {


    static styles = [
        css`
        :host{           
        }
        `
    ]

    @property()
    cacheKeys: string[] | undefined;

    @property()
    cacheEntry: CacheEntry;

    @property()
    cacheDetails: CacheDetails;

    cacheValue: CacheValue;

    constructor() {
        super();
    }

    clickCache(cacheKey) {
        sendMessage(
            KEY_CACHE_DATA,
            { action: KEY_CACHE_DATA, cacheKey },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }

    selectCacheValue(cacheValue: CacheValue) {
        this.cacheValue = cacheValue;
        this.requestUpdate();
    }


    render() {
        return html`
        ${super.render()}
        <h1 id="caches">Caches</h1>
        <cache-list .cacheKeys="${this.cacheKeys}" ></cache-list>
        <br>
        <cache-table .cacheEntry="${this.cacheEntry}"
            @cache-row="${(e) => this.selectCacheValue(e.detail)}"></cache-table>            
        <br>
        <cache-details 
            .cacheDetails="${this.cacheDetails}"></cache-details>
        `;
    }
}