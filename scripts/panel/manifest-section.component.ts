import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";


@customElement('manifest-section')
export class ManifestSectionComponent extends LitElement {

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
        <h1 id="manifest">Manifest</h1>
        
        `;
    }
}