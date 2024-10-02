import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { ParentComponent } from "../helper/parent-component";


@customElement('manifest-section')
export class ManifestSectionComponent extends ParentComponent {



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
        ${super.render()}
        <h1 id="manifest">Manifest</h1>
        
        `;
    }
}