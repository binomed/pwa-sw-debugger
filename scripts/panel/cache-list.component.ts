import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";


@customElement('cache-list')
export class CacheListComponent extends LitElement {

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
            'cache-data',
            { action: 'cache-data', cacheKey },
            'content-script@' + browser.devtools.inspectedWindow.tabId);

    }

    render_list() {
        return html`
            <ul>
                ${this.cacheKeys.map((cache) => html`<li><a href="#0" @click="${() => this.clickCache(cache)}">${cache}</a></li>`)}
            </ul>       
        `;
    }

    render() {
        return html`        
        ${this.cacheKeys && this.cacheKeys.length > 0 ?
                this.render_list()
                : 'no cache'
            }
        `;
    }
}