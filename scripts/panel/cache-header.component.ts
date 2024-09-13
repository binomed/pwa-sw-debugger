import { LitElement, PropertyDeclaration, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry } from "../models/model";


@customElement('cache-header')
export class CacheHeaderComponent extends LitElement {

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
                  HEADER
                  ${JSON.stringify(this.request, null, 4)}
        `;
    }
}