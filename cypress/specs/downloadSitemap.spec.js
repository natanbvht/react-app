// cypress/integration/downloadSitemap.spec.js

describe("Download Sitemap", () => {
  it("should download sitemap.json file", () => {
    // Visit the page where the download button exists
    cy.visit("/path/to/your/page");

    // Intercept the download request
    cy.intercept("/api/sitemap.json").as("downloadSitemap");

    // Click the download button
    cy.get('button:contains("Download Sitemap JSON")').click();

    // Wait for the download to complete
    cy.wait("@downloadSitemap").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.headers["content-type"]).to.equal(
        "application/json"
      );

      // The downloaded file should be saved in the response.body property
      const jsonData = interception.response.body;

      // Handle the downloaded JSON data as needed
      console.log("Downloaded JSON data:", jsonData);
    });
  });
});
