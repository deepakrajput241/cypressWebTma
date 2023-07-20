it("Create new Payment Application Record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJPaymentApplication/Create/Identity");
  // cy.openFlyoutAndSelectRandomValue("Contract #");
  // cy.getButton("Save").click();
});
