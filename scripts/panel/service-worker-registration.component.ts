import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement('sw-registration')
export class SWRegistrationComponent extends LitElement {

    static styles = [
        css`
        :host{           
        }
        `
    ]

    @property()
    reg: ServiceWorkerRegistration | undefined;

    constructor() {
        super();
    }

    render() {
        return html`
        <h1 id="service-worker">Service worker registration</h1>
        ${this.reg ? html`
            Installing : ${this.reg.installing ? 'installing : ' + this.reg.installing?.scriptURL : '--'}<br>
            Waiting : ${this.reg.waiting ? 'waiting : ' + this.reg.waiting?.scriptURL : '--'}<br>
            Active : ${this.reg.active ? 'active : ' + this.reg.active?.scriptURL : '--'}<br>
            `
                : 'no registration'}<br>
        `;
    }
}