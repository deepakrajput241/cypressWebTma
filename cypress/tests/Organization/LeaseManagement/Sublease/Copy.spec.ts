it("Copy Sublease", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SubLease/Create");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("TenantId");
  cy.clickSaveAndCheckResponse();
});
