import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getCurrentRegistration } from '../pwa-console-sw';

let browserObject = undefined;

if (typeof window != "undefined") {
    browserObject = window.browser !== undefined ? browser : chrome;
} else {
    browserObject = chrome;
}

@customElement('sw-debug-panel')
class SWPanel extends LitElement {

    static styles = [
        css`
        :host{
            position:absolute;
            width:100%;
            height:100%;
            margin:0;
            padding:0;
            top:0;
            left:0;
            display:grid;
            grid-template-columns: 300px 1fr;
            grid-template-rows: 1fr;
            grid-gap: 20px;
            grid-template-areas: "menu content";
        }

        menu{
            grid-area:"menu";
        }

        main{
            grid-area: "content";
        }
        `
    ]

    reg: ServiceWorkerRegistration | undefined;

    constructor() {
        super();
        getCurrentRegistration().then(reg => {
            this.reg = reg;
            console.log(reg);
        })

        browserObject.runtime.onMessage.addListener((request, sender, sendResponse) => this.handleMessage(request, sender, sendResponse));
    }

    handleMessage(request, sender, sendResponse) {
        console.log("Message recieved by devtools-panel", request);

        if (request && request.resp === "ok") {
            this.reg = request.regManual;
            this.requestUpdate();
        }
    }

    click() {
        if (browserObject) {
            console.log('send message');
            browserObject.runtime.sendMessage({ click: "test" }).then(response => {
                // do something with response here, not outside the function
                console.log(response);
            });
        }
    }

    clickBis() {
        if (browserObject) {
            console.log('send message bis');
            browserObject.runtime.sendMessage({ click: "test bis" }).then(response => {
                // do something with response here, not outside the function
                console.log(response);
            });
        }
    }

    render() {
        return html`
        <menu>Here menu item</menu>
        <main>Service worker registration : 
            ${this.reg ? this.reg.active?.scriptURL : 'no registration'}
            <button @click="${() => this.click()}">click me</button>
            <button @click="${() => this.clickBis()}">click me bis</button>
        </main>
        `
    }

}
