import { LitElement, PropertyDeclaration, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { CacheEntry } from "../models/model";


@customElement('cache-table')
export class CacheTableComponent extends LitElement {

    static styles = [
        css`
        :host{                      
        }

        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }

        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }

        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }

        .styled-table tbody tr.active-row {
            font-weight: bold;
            color: #009879;
        }
        `
    ]

    @property()
    cacheEntry: CacheEntry;

    indexRowActive = -1;


    constructor() {
        super();
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has('cacheEntry')) {
            this.indexRowActive = -1;
            this.requestUpdate();
        }
    }


    selectRow(index: number) {
        this.indexRowActive = index;
        const event = new CustomEvent('cache-row', { detail: this.cacheEntry.cacheValues[index] });
        this.dispatchEvent(event);
        sendMessage(
            'cache-details',
            {
                action: 'cache-details',
                cacheKey: this.cacheEntry.cacheKey,
                url: this.cacheEntry.cacheValues[index].url
            },
            'content-script@' + browser.devtools.inspectedWindow.tabId);
        this.requestUpdate();
    }

    render_table() {
        return html`
            <h2>Cache entries for : "${this.cacheEntry.cacheKey}"</h2>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>url</th>
                        <th>type</th>
                        <th>status</th>
                        <th>content-type</th>
                        <th>size</th>
                        <th>last-modified</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.cacheEntry.cacheValues.map((value, index) => html`
                    <tr 
                        class="${index === this.indexRowActive ? 'active-row' : ''}" 
                        @click="${() => this.selectRow(index)}">     
                        <td>${index}</td>
                        <td>${value.url}</td>
                        <td>${value.type}</td>
                        <td>${value.status}</td>
                        <td>${value['content-type']}</td>
                        <td>${value.size}</td>
                        <td>${value['last-modified']}</td>
                    </tr>`)}
                </tbody>
            </table>
            `
    }

    render() {
        return html`
                   ${this.cacheEntry ?
                this.render_table()
                : 'no cache data : click on a cache to see it\'s data'
            }
        `;
    }
}