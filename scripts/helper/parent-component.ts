import { LitElement, html } from "lit";

export class ParentComponent extends LitElement {
    render() {
        return html`<link rel="stylesheet" href="../style.css">`;
    }

}