import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sendMessage } from "webext-bridge/devtools";
import { ParentComponent } from "../helper/parent-component";
import { Manifest, ManifestData } from "../models/model";
import { sharedGridInfo } from "../styles/shared-styles";



@customElement('manifest-section')
export class ManifestSectionComponent extends ParentComponent {



    static styles = [
        sharedGridInfo,
        css`
        :host{           
        }

        .border-color{
            width: 15px;
            height: 15px;
            border-color: thin solid black;
            background-color: var(--manifest-bg-color) ;
        }

        .flex-inline{
            display: flex;
            flex-direction: row;
            gap: 10px;
        }

        img{
            max-width: 200px;
            max-height: 200px;
        }

        [hidden]{
            display: none;
        }

        `
    ]

    @property()
    manifestData: ManifestData;



    constructor() {
        super();
    }

    renderIcons() {
        const iconsBySize = {};
        for (let icon of this.manifestData.manifest.icons) {
            if (!iconsBySize[icon.sizes]) {
                iconsBySize[icon.sizes] = [];
            }
            iconsBySize[icon.sizes].push(icon);
        }
        return html`
        <section class="grid-info">
        ${Object.keys(iconsBySize).map((size) => {
            const iconInformations = {
                size,
                type: undefined
            }
            const icons = iconsBySize[size];
            if (icons.length > 1) {
                iconInformations.type = icons[0].type;
            }
            return html`
            <label>
                ${iconInformations.size}
                <br>
                ${iconInformations.type ? iconInformations.type : ''}
            </label>
            <div class="flex-inline">                        
                ${icons.map((iconImg) => html`
                <div>
                    <span>${iconImg.purpose}</span><br>
                    <img src="${iconImg.base64}" alt="${iconImg.purpose}" />
                </div>
                `)}
            </div>
            
        `})}
        </section>`
    }

    renderTheme() {
        return html`
        <section class="grid-info">
                <!-- Theme -->
                <label ?hidden="${this.manifestData.manifest.theme_color === undefined}">Theme Color</label>
                <div ?hidden="${this.manifestData.manifest.theme_color === undefined}" class="flex-inline">
                    <div class="border-color" style="--manifest-bg-color:${this.manifestData.manifest.theme_color}"></div>
                    <span>${this.manifestData.manifest.theme_color}</span>
                </div>
                <!-- Background color -->
                <label ?hidden="${this.manifestData.manifest.background_color === undefined}">Background color</label>
                <div ?hidden="${this.manifestData.manifest.background_color === undefined}" class="flex-inline">
                    <div class="border-color" style="--manifest-bg-color:${this.manifestData.manifest.background_color}"></div>
                    <span>${this.manifestData.manifest.background_color}</span>
                </div>
            </section>
            `;
    }

    renderInfo() {
        return html`
        <section class="grid-info">
            <label ?hidden="${this.manifestData.manifest.name === undefined}">Name</label>
            <span ?hidden="${this.manifestData.manifest.name === undefined}">${this.manifestData.manifest.name}</span>
            <label ?hidden="${this.manifestData.manifest.short_name === undefined}">Short name</label>
            <span ?hidden="${this.manifestData.manifest.short_name === undefined}">${this.manifestData.manifest.short_name}</span>
            <label ?hidden="${this.manifestData.manifest.description === undefined}">Description</label>
            <span ?hidden="${this.manifestData.manifest.description === undefined}">${this.manifestData.manifest.description}</span>
        </section>
        `;
    }

    renderLayout() {
        return html`
        <section class="grid-info">
            <label ?hidden="${this.manifestData.manifest.orientation === undefined}">Orientation</label>
            <span ?hidden="${this.manifestData.manifest.orientation === undefined}">${this.manifestData.manifest.orientation}</span>
            <label ?hidden="${this.manifestData.manifest.display === undefined}">Display</label>
            <span ?hidden="${this.manifestData.manifest.display === undefined}">${this.manifestData.manifest.display}</span>
            <label ?hidden="${this.manifestData.manifest.dir === undefined}">Dir</label>
            <span ?hidden="${this.manifestData.manifest.dir === undefined}">${this.manifestData.manifest.dir}</span>
        </section>
        `;
    }

    renderConfiguration() {
        return html`
        <section>            
            <label ?hidden="${this.manifestData.manifest.lang === undefined}">Langage</label>
            <span ?hidden="${this.manifestData.manifest.lang === undefined}">${this.manifestData.manifest.lang}</span>
            <label ?hidden="${this.manifestData.manifest.start_url === undefined}">Start URL</label>
            <span ?hidden="${this.manifestData.manifest.start_url === undefined}">${this.manifestData.manifest.start_url}</span>
            <label ?hidden="${this.manifestData.manifest.scope === undefined}">Scope</label>
            <span ?hidden="${this.manifestData.manifest.scope === undefined}">${this.manifestData.manifest.scope}</span>
            <label ?hidden="${this.manifestData.manifest.serviceworker === undefined}">Service worker</label>
            <span ?hidden="${this.manifestData.manifest.serviceworker === undefined}">${this.manifestData.manifest.serviceworker}</span>
        </section>
        `;
    }

    renderManifest() {
        return html`
            ${this.manifestData.path}
            <h2>General informations</h2>
            ${this.renderInfo()}

            <h2>Configuration</h2>
            ${this.renderConfiguration()}

            <h2>Layout</h2>
            ${this.renderLayout()}

            <h2>Theme</h2>
            ${this.renderTheme()}
            
            <h2>Icons</h2>
            ${this.renderIcons()}
    `;
    }

    render() {
        return html`
        ${super.render()}
        <h1 id="manifest">Manifest</h1>
        ${this.manifestData && this.manifestData.hasManifest ? this.renderManifest() : html`<div>No manifest found</div>`}
        `;
    }
}