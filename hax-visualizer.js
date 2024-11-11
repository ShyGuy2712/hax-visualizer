/**
 * Copyright 2024 ShyGuy2712
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-visualizer`
 * 
 * @demo index.html
 * @element hax-visualizer
 */
export class HaxVisualizer extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-visualizer";
  }

  constructor() {
    super();
    this.siteURL = "";
    this.siteData = null;
    this.errorMessage = "";
    this.title = "Visualization App"
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      siteURL: { type: String },
      siteData: { type: Object },
      errorMessage: { type: String },
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--hax-visualizer-label-font-size, var(--ddd-font-size-s));
      }
      .searchBar {
        
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3>${this.title}</h3>
        <div class="input">
          <input
            type="url"
            placeholder="Enter HAX URL"
            @input="${this.updateUrl}"
            .value="${this.siteURL}"
          />
          <button @click="${this.fetchSiteData}">Analyze</button>
        </div>

        ${this.errorMessage
          ? html`<div class="errorMessage">${this.errorMessage}</div>`
          : ""}

        ${this.siteData 
          ? html`
            <div clas="preview">
              <h4>Preview</h4>
              <p><strong>Name:</strong> ${this.siteData.name}</p>
              <p><strong>Description:</strong> ${this.siteData.description}</p>
              <p><strong>Theme:</strong> ${this.siteData.theme}</p>
              <p><strong>Created:</strong> ${this.siteData.created}</p>
              <p><strong>Last Updated:</strong> ${this.siteData.lastUpdated}</p>
              ${this.siteData.logo
                ? html`<img src="${this.siteData.logo}" alt="Site Logo" />`
                : ""}
            </div>
            <div class="cardContainer">
              ${this.siteData.items.map(
                (item) => html`
                  <div class="card">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <p><small>Last updated: ${item.lastUpdated}</small></p>
                    ${item.icon
                      ? html`<simple-icon icon="${item.icon}"></simple-icon>`
                      : ""}
                    <a href="${item.page}" target="_blank">Open Page</a>
                    <a href="${item.source}" target="_blank">Open Source</a>
                  </div>
                `
              )}
            </div>
          `
        : ""}
        </div>
    `;
  }


  updateUrl(event) {
    this.siteURL = event.target.value;
  }

  async fetchSiteData() {
    // if url not valid, return error
    if (!this.siteURL) {
      this.errorMessage = "Please enter a valid URL";
      return;
    }
    // clear any previous errors
    this.errorMessage = ""; 

    // if url doesn't end with ".json", append to url
    const url = this.siteURL.endsWith("site.json")
      ? this.siteURL
      : `${this.siteURL}/site.json`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch site.json from ${url}`);
      const data = await response.json();

      if (!this.validateData(data)) {
        throw new Error("Invalid site.json data format");
      }
      this.siteData = data; 
    } catch (error) {
      this.errorMessage = error.message;
      this.siteData = null;
    }
  }

  validateData(data) {
    return (
      data &&
      data.name &&
      data.items &&
      Array.isArray(data.items) &&
      data.items.length > 0
    );
  }



  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxVisualizer.tag, HaxVisualizer);