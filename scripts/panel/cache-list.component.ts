import browser from "webextension-polyfill";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { ParentComponent } from "../helper/parent-component";
import { KEY_CACHE_DATA, KEY_CACHE_DETAILS } from "../models/consts";


@customElement('cache-list')
export class CacheListComponent extends ParentComponent {


    static styles = [
        css`
        :host{           
        }
        `
    ]

    @property()
    cacheKeys: string[] | undefined;


    constructor() {
        super();
    }

    clickCache(cacheKey) {
        sendMessage(
            KEY_CACHE_DATA,
            { action: KEY_CACHE_DATA, cacheKey },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }

    render_list() {
        return html`
        <select name="select" aria-label="Select" @change="${(e) => this.clickCache(e.target.value)}">
            <option selected disabled value="">Select a cache</option>
            ${this.cacheKeys.map((cache) => html`<option value="${cache}">${cache}</option>`)}
        </select>
        `;
    }

    render() {
        return html`        
            ${super.render()}
        ${this.cacheKeys && this.cacheKeys.length > 0 ?
                this.render_list()
                : 'no cache'
            }
        `;
    }
}