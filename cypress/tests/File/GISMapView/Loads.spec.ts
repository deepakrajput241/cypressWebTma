it("should load map", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/GISMapView");
  cy.contains("Sign In").click();
  cy.origin("https://www.arcgis.com", () => {
    cy.get("#user_username").type(Cypress.env("arcGis").username);
    cy.get("#user_password").type(Cypress.env("arcGis").password);
    cy.contains("Sign In").click();
  });
  // cy.origin requires a navigation back to original route
  cy.visit("/#!/GISMapView");
  // TODO: check for canvas and expand to cover items in smoke test
  cy.contains("Sign Out", { timeout: 10000 }).should("exist");
});
