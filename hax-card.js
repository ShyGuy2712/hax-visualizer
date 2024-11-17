import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxCard extends DDDSuper(LitElement) {

    static get properties() {
        return {
            title: { type: String },
            description: { type: String },
            created: { type: String },
            lastUpdate: { type: String },
            logo: { type: String },
            slug: { type: String },
            jsonURL: { type: String },
            location: { type: String },
        };
    }

    static get styles() {
        return [
            super.styles,
            css`
                .card {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background-color: var(--ddd-theme-default-slateGray);
                    border: var(--ddd-border-sm);
                    border-radius: var(--ddd-redius-sm);
                    padding: var(--ddd-spacing-3);
                    width: 600px;
                    height: 900px;
                    outline: 4px solid var(--ddd-theme-default-skyBlue);
                }
                
                .img-container {
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .info {
                    font-weight: var(--ddd-font-weight-bold);
                    text-align: center;
                    color: var(--ddd-theme-default-limestoneLight);
                }

                .description, .created, .lastUpdate {
                    font-size: 32px;
                    text-align: center;
                    overflow: auto;
                }

                .imgPlaceholder {
                    width: 100%;
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--ddd-theme-default-limestoneGray);
                    color: var(--ddd-theme-default-limestoneLight);
                    font-size: var(--ddd-font-weight-regular);
                    text-align: center;
                    font-family: var(--ddd-font-primary);
                }
        `];
    }

    render() {
        return html`
    <!-- div for card, allows for user to click the entire div to open the slug -->
            <div
                class="card"
                @click="${this.openSlug}"
                @keydown="${this.handleKeydown}"
                tabindex="0"
                aria-label="${this.title}"
                >
    <!-- div for img -->
                <div class="img-container">
    <!-- If logo exists, render it with appropriate alt tag, else, render a placeholder div -->
                   ${this.logo 
                        ? html`<img src="https://haxtheweb.org/${this.logo}" alt="${this.title}" />`
                        : html`<div class="imgPlaceholder">No Image</div>`
                    }
                </div>
    <!-- div for text info -->
                <div class="info">
    <!-- if slug starts with "http", change it to "https" -->
                    <a href="${this.slug.startsWith('http') ? this.slug : `https://haxtheweb.org/${this.slug}`}" target="_blank" @click="${this.stopPropagation}">${this.title}</a>
                </div>

    <!-- make seperate divs for each item -->
                <div class="description">${this.description}</div>
                <div class="created">Created: ${this.created}</div>
                <div class="lastUpdate">Last Updated: ${this.lastUpdate}</div>

                <div class="info">
                    <a href="${this.location}" target="_blank" @click="${this.stopPropagation}">Index Source</a>
                </div>
            </div>
        `;
    }

    // allows user to open to the slug
    openSlug(event) {
        // if slug exists, create link to slug, else, throw error
        if (this.slug) {
            const url = this.slug.startsWith("http")
                ? this.slug
                : `https://haxtheweb.org/${this.slug}`;
            console.log("Going to:", url);
            window.open(url, "_blank");
        } else {
            console.error("Slug not defined");
        }
    }

    // allows for users to hit "enter" instead of clicking on each card to open the slug
    handleKeydown(event) {
        if (event.key === "Enter" || event.key === " ") {
            this.openSlug();
        }
    }

    // method to prevent event bubbling/capturing
    stopPropagation(event) {
        event.stopPropagation();
    }

    static get tag() {
        return "hax-card";
    }
}

customElements.define('hax-card', HaxCard);
