// cypress/integration/downloadSitemap.spec.js

describe("Download Sitemap", () => {
  it("should download sitemap.json file", () => {
    // Visit the page where the download button exists
    cy.visit("http://localhost:3000/download");

    // Click the download button
    cy.get('button:contains("Sitemap JSON")').click();

    // retun sucess.
    cy.get('button:contains("Sitemap JSON")').should(
      "be.visible"
    );
  });
});
