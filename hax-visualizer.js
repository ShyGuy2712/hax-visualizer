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
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/hax-visualizer.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
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
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        
        <div class="searchBar">
          <input
            class="searchBar"
            type="text"
            placeholder="https://haxtheweb.org/site.json (Replace with your URL)" 
            @input="${this.inputUpdate}" />
        </div>

        <a href= '' target="_blank">      <!-- Need a Link -->
          <div class="previewCard">
            <img src="" />                <!-- Need an img -->
            <h1>${this.siteName}</h1>
            <slot>Description: ${this.description}</slot>   <!-- Need to make these properties -->
            <slot>Created: ${this.created}</slot>
            <slot>Last Updated: ${this.lastUpdate}</slot>
          </div>
        </a>

        <div class="results">
          ${this.items.map((item, index) => html`
            <hax-card
            title="${item.metadata.site.name}"              
            logo="${item.metadata.site.logo}"
            lastUpdate="${item.metadata.site.updated}"
            description=
            contentLink=
            sourceLink=
            ></hax-card>      <!-- Scour the JSON -->
              `)}
        </div>

      </div>
    `;
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