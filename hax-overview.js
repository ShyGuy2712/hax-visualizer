import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js"

export class HaxOverview extends DDDSuper(I18NMixin(LitElement)) {
    static get properties() {
        return {
            title: { type: String },
            description: { type: String },
            logo: { type: String },
            created: { type: String },
            updated: { type: String },
            hexCode: { type: String },
            theme: { type: String },
            icon: { type: String },
            jsonURL: { type: String },
        };
    }

    static get styles() {
        return [
            super.styles,
            css`
            :host {
                display: block;
            }

            .overview-container {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: var(--ddd-spacing-2, 12px);
                width: fit-content;
                padding: var(--ddd-spacing-4, 20px);
                margin: auto;
                font-size: 16px;
                color: var(--ddd-theme-default-nittanyNavy);
                border: var(--ddd-border-sm);
                border-radius: var(--ddd-radius-sm);
            }

            .text {
                font-weight: 400;
            }

            .title {
                font-size: 24px;
                font-weight: var(--ddd-font-weight-bold, bold);
                text-align: center;
                margin-bottom: var(--ddd-spacing-3);
            }

            .overview-container img {
                display: block;
                height: 300px;
            }
            `];
    }

    render() {
        return html`
            <div class="overview-container" style="background-color:${this.hexCode}">
    <!-- seperate div for img -->
                <div class="img-container">
    <!-- If logo exists, render it, else, put "No Logo Available" -->
                    ${this.logo 
                        ? html`<img src="https://haxtheweb.org/${this.logo}" alt="${this.title}" />`
                        : html`<div>No Logo Available</div>`}
                </div>

    <!-- seperate div for text -->
                <div class="text">
                    <div class="title">
                        <a href="https://haxtheweb.org/${this.slug}" target="_blank" rel="nooperner noreferrer">
    <!-- If icon exists, render it, else, render nothing -->
                            ${this.icon ? html`<simple-icon icon="${this.icon}"></simple-icon>` : ""}
                            ${this.title}
                        </a>
                    </div>
    <!-- If data point exists, create a <p> for each and fill with data, else, render nothing -->
                    ${this.description ? html`<p><strong>Description: </strong>${this.description}</p>` : ""}
                    ${this.created ? html`<p><strong>Date Created: </strong>${this.created}</p>` : ""}
                    ${this.updated ? html`<p><strong>Last Updated: </strong>${this.updated}</p>` : ""}
                    ${this.theme ? html`<p><strong>Theme: </strong>${this.theme}</p>` : ""}
                </div>
            </div>
        `;
    }

    static get tag() {
        return 'hax-overview';
    }
}


customElements.define(HaxOverview.tag, HaxOverview);