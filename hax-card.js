import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxItem extends DDDSuper(LitElement) {

    constructor() {
        super();
        this.title = '';
        this.source = '';
        this.alt = '';
        this.creator = '';
    }

    static get properties() {
        return {
            title: { type: String },
            source: { type: String },
            alt: { type: String },
            creator: { type: String },
        };
    }

    static get styles() {
        return [super.styles, css`
            /* CSS goes here */
            `]
    }

    render() {
        return html`
        <div class="card" tabindex="0" @click="${this._openImage}" @keydown="${this._handleKeydown}">
            <img src="${this.source}" alt="${this.alt}"/>
            <div class="info">${this.title}</div>
            <div class="info">${this.creator}</div>
        </div>
        `;
    }

    _openImage() {
        window.open(this.source, "_blank");
    }

    _handleKeydown(event) {
        if (event.key === "Enter") {
            this._openImage();
        }
    }

    static get tag() {
        return "hax-card";
    }
}
