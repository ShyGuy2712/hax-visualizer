import { html, fixture, expect } from '@open-wc/testing';
import "../hax-visualizer.js";

describe("HaxVisualizer test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <hax-visualizer
        title="title"
      ></hax-visualizer>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
