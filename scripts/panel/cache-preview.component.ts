import { LitElement, PropertyDeclaration, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry } from "../models/model";


@customElement('cache-preview')
export class CachePreviewComponent extends LitElement {

    static styles = [
        css`
        :host{                      
        }

        `
    ]



    constructor() {
        super();
    }

    render() {
        return html`
                  PREVIEW
        `;
    }
}