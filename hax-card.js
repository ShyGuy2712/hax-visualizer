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
        
    }
}
