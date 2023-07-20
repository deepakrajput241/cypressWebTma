it("Delete Utility Budget record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityBudget/Create");
  cy.openFlyoutAndSelectRandomValue("Utility Meter");
  cy.fillNumericTextBox(0, new Date().getFullYear());
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
