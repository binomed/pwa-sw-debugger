import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry } from "../models/model";


@customElement('cache-section')
export class CacheSectionComponent extends LitElement {

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

    constructor() {
        super();
    }

    clickCache(cacheKey) {
        sendMessage(
            'cache-data',
            { action: 'cache-data', cacheKey },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }


    render() {
        return html`
        <h1 id="caches">Caches</h1>
        <cache-list .cacheKeys="${this.cacheKeys}" ></cache-list>
        <br>
        <cache-table .cacheEntry="${this.cacheEntry}"></cache-table>            
        `;
    }
}