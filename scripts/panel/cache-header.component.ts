import { LitElement, PropertyDeclaration, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry } from "../models/model";
import { ParentComponent } from "../helper/parent-component";


@customElement('cache-header')
export class CacheHeaderComponent extends ParentComponent {


    static styles = [
        css`
        :host{                      
        }

        `
    ]

    @property()
    request: Request;

    constructor() {
        super();
    }

    render() {
        return html`
            ${super.render()}
                  HEADER
                  ${JSON.stringify(this.request, null, 4)}
        `;
    }
}