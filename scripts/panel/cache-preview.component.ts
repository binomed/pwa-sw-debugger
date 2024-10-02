import { LitElement, PropertyDeclaration, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry } from "../models/model";
import { ParentComponent } from "../helper/parent-component";


@customElement('cache-preview')
export class CachePreviewComponent extends ParentComponent {


    static styles = [
        css`
        :host{                      
        }

        `
    ]

    @property()
    response: Response;

    constructor() {
        super();
    }

    render() {
        return html`
            ${super.render()}
                  PREVIEW
                  ${JSON.stringify(this.response, null, 4)}
        `;
    }
}