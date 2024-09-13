import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheDetails, CacheValue } from "../models/model";


@customElement('cache-details')
export class CacheDetailsComponent extends LitElement {

    static styles = [
        css`
        :host{           
        }

        .tabs {
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ccc;
        }

        .tab {
            padding: 10px;
            cursor: pointer;
        }

        .tab.active {
            font-weight: bold;
            border-bottom: 2px solid #333;
        }

        .tab-content {
            padding: 20px;
        }

        `
    ]

    activeTab = 'header';

    @property()
    cacheDetails: CacheDetails;

    constructor() {
        super();
    }

    selectTab(tab: string) {
        this.activeTab = tab;
        this.requestUpdate();
    }

    render() {
        return html`${this.cacheDetails ? html`        
            <div class="tabs">
                <div class="tab ${this.activeTab === 'header' ? 'active' : ''}" @click="${() => this.selectTab('header')}">Header</div>
                <div class="tab ${this.activeTab === 'preview' ? 'active' : ''}" @click="${() => this.selectTab('preview')}">Preview</div>
            </div>
            <div class="tab-content">
                ${this.activeTab === 'header' ?
                html`<cache-header .request="${this.cacheDetails.request}"></cache-header>`
                :
                html`<cache-preview .response="${this.cacheDetails.response}"></cache-preview>`}
            </div>
        `: 'Select a cache to see it\'s data'}`;
    }
}