/**
 * Copyright 2024 ShyGuy2712
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-card.js";
import "./hax-overview.js";

import '@haxtheweb/hax-iconset/hax-iconset.js';
import '@haxtheweb/simple-icon/simple-icon.js';

export class HaxVisualizer extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-visualizer";
  }

  constructor() {
    super();
    this.items = [];
    this.title = '';
    this.loading = false;
    this.jsonURL = '';
    this.data = null;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      items: { type: Array },
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      jsonURL: { type: String, attribute: 'json-url' },
      data: { type: Object },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        width: 100%;;
      }

      .results {
        opacity: ${this.loading ? 0.1 : 1};
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
      }

      .overvoew-container {
        display: flex;
        margin: 0 auto;
        padding: var(--ddd-spacing-3);
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      .search-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--ddd-radius-sm);
        border: var(--ddd-border-md);
        padding: var(--ddd-spacing-2);
        max-width: 600px;
        margin: var(--ddd-spacing-3) auto;
      }

      .search-input {
        flex: 1;
        font-size: var(--ddd-font-weight-small);
        border: none;
      }

      .search-input:focus {
        outline: none
      }

      button {
        border-radius: var(--ddd-radius-xs);
        padding: var(--ddd-spacing-1);
        font-size: var(--ddd-font-weight-small);
        margin-left: var(--ddd-spacing-2);
        font-family: var(--ddd-font-primary);
        background-color: var(--ddd-theme-default-skyBlue);
        color: var(--ddd-theme-default-slateMaxLight);
        border: solid var(--ddd-theme-default-coalyGray);
      }

      button:disabled {
        opacity: 0.75;
      }

      hax-card:focus {
        outline: 2px solid var(--ddd-theme-default-skyBlue);
        outline-offset: 2px;
        border-radius: var(--ddd-radius-sm);
        background-color: var(--ddd-theme-default-coalyGray);
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <h2>${this.title}</h2>
      <!-- Input bar for URL, as well as button (though you can use "enter" to search anyways) -->
      <div class="search-bar">
        <input
          id="input"
          class="search-input"
          placeholder="input HAX URL"
          @input="${this.inputChanged}"
          @keydown="${this._handleKeydown}" />
        <button ?disabled="${!this.isValid}" @click="${this._analyze}">Analyze</button>
      </div>

  <!-- If the data exists, then render the overview container, else render nothing -->
      ${this.data?.name
        ? html`
          <div class="overview-container">
      <!-- Grabs JSON data, then returns to hax-overview element -->
            <hax-overview
              title="${this.data.name}"
              description="${this.data.description}"
              logo="${this.data.metadata.site.logo}"
              created="${this.formatDate(this.data.metadata.site.created)}"
              updated="${this.formatDate(this.data.metadata.site.updated)}"
              hexCode="${this.data.metadata.theme.variables.hexCode}"
              theme="${this.data.metadata.theme.name}"
              icon="${this.data.metadata.theme.variables.icon}"
              jsonURL="${this.jsonUrl}"
            ></hax-overview>
          </div>
          ` : ""
      }

      <div class="results">
        ${this.items.map(item =>
          html`
          <!-- Grabs JSON data, then returns to hax-card element -->
          <hax-card
            title="${item.title}"
            description="${item.description}"
            created="${this.formatDate(item.metadata.created)}"
            lastUpdate="${this.formatDate(item.metadata.updated)}"
            logo="${this.getLogoURL(item.metadata?.files?.[0]?.url)}"
            slug="https://haxtheweb.org/${item.slug}"
            location="https://haxtheweb.org/${item.location}"
            jsonURL="${item.jsonUrl}"
          ></hax-card>
          `)}
      </div>
    `;
  }

  // as the input is changed, make sure the URL is valid
  inputChanged(e) {
    this.jsonURL = e.target.value.trim();
    this.isValid = !!this.jsonURL;
  }

  // allows for "enter" to be used instead of the button
  _handleKeydown(e) {
    if (e.key === 'Enter' && this.isValid) {
      this._analyze();
    }
  }

  // formats URL and fetches JSON data
  async _analyze() {
    // if URL does not start with "http://" or "https://", add "https://"
    if (!this.jsonURL.startsWith("http://") && !this.jsonURL.startsWith("https://")) {
      this.jsonURL = `https://${this.jsonURL}`;
    }
    // if URL does not end with "site.json", add it
    if (!this.jsonURL.endsWith("site.json")) {
      this.jsonURL = `${this.jsonURL.replace(/\/?$/, '')}/site.json`;
    }
    
    // toggles loading state
    this.loading = true;
    // trys to fetch JSON data
    try {
      const response = await fetch(this.jsonURL);
      const data = await response.json();
      console.log("Fetched data:", data);

      // if JSON data is valid, process it, else, return error
      if (this.validateSchema(data)) {
        this.processData(data);
      } else { 
        alert("Invlaid JSON schema");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Invalid search");
    } finally {
      // toggles loading state off again
      this.loading = false;
    }
  }

  // makes sure data is in an array
  validateSchema(data) {
    return data && Array.isArray(data.items) && data.items.length > 0;
  }

  // grabs the correct info for each item (title gets "name" from JSON, and so on)
  processData(data) {
    console.log("Processing data:", data);

    this.data = {
      name: data.title || "No Title",
      description: data.description || "No description",
      metadata: {
        site: data.metadata?.site || {},
        theme: data.metadata?.theme || {},
      }
    };

    this.items = data.items.map(item => ({
      ...item,
      logo: data.metadata?.site?.logo || ""
    }));
  }

  // formats timestamps into something that actually makes sense
  formatDate(timestamp) {
    return timestamp ? new Date(parseInt(timestamp) * 1000).toLocaleDateString() : '';
  }

  // gets the Logo from the JSONURL
  getLogoURL(jsonURL) {
    return jsonURL;
  }


  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxVisualizer.tag, HaxVisualizer);