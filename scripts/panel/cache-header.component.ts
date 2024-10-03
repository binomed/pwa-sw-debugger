import { LitElement, PropertyDeclaration, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry, ClonedHeaders, ClonedRequest } from "../models/model";
import { ParentComponent } from "../helper/parent-component";


@customElement('cache-header')
export class CacheHeaderComponent extends ParentComponent {


    static styles = [
        css`
        :host{                      
        }

        .details-header{
            display: grid;
            grid-template-columns: 300px 1fr;
            grid-row-gap: 5px;

        }

        details:not([open]) summary span{
            display: inline    
        }
        details[open] summary span{
            display: none;
        }



        `
    ]

    @property()
    request: ClonedRequest;
    @property()
    responseHeader: ClonedHeaders;

    constructor() {
        super();
    }
    displayHeader(header: ClonedHeaders) {
        const entries = Object.entries(header);
        return html`${entries.map((entry) => html`<div class="header-entry">${entry[0]}:</div><div class="header-value">${entry[1]}</div>`)}`;
    }

    render() {
        return html`
            ${super.render()}
                  HEADER
                  <details>
                    <summary role="button" class="secondary">General </summary>
                    <div class="details-header">
                        <div class="header-entry">url:</div><div class="header-value">${this.request.url}</div>
                        <div class="header-entry">method:</div><div class="header-value">${this.request.method}</div>
                    </div>
                  </details>
                  <details>
                    <summary role="button" class="secondary">Request headers <span>(${Object.keys(this.request.headers).length})</span></summary>
                    <div class="details-header">
                        ${this.displayHeader(this.request.headers)}
                    </div>
                </details>
                <details>
                    <summary role="button" class="secondary">Response headers <span>(${Object.keys(this.responseHeader).length})</span></summary>
                    <div class="details-header">
                        ${this.displayHeader(this.responseHeader)}
                    </div>
                </details>
        `;
    }
}