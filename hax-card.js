import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxItem extends DDDSuper(LitElement) {

    constructor() {
        super();
        this.title = '';
        this.logo = '';
        this.lastUpdate = '';
        this.description = '';
        this.contentLink = '#';
        this.sourceLink = '#';
    }

    static get properties() {
        return {
            title: { type: String },
            logo: { type: String },
            lastUpdate: { type: String },
            description: { type: String },
            contentLink: { type: String },
            sourceLink: { type: String },
        };
    }

    static get styles() {
        return [super.styles, css`
            /* CSS goes here */
            `]
    }

    render() {
        return html`
        <a href= ${this.contentLink} target="_blank">
            <div class="haxCard">
                <img src="${this.logo}" /> 
                <h1>${this.title}</h1>
                <slot>Last Updated: ${this.lastUpdate}</slot>
                <slot>Description: ${this.description}</slot>
                <a href= ${this.contentLink} target="_blank">
                    <button>Open Content</button>
                </a>
                <a href= ${this.sourceLink} target="_blank">
                    <button>Open Source</button>
                </a>
            </div>
        </a>
        `;
    }

    static get tag() {
        return "hax-card";
    }
}
