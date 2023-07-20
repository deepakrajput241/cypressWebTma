it("Create Quick Post Cost with Required fields", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/QPTimeLaborByTech/Create/TechEntry");
  cy.openFlyoutAndSelectRandomValue("Technician Code");
  cy.wait(1000);
  cy.get("Input[name='EnterLaborBtn']").click();
  cy.openFlyoutAndSelectRandomValue("Trade");
  cy.fillInputTextBox("Hours", "6");
  cy.openFlyoutAndSelectRandomValue("Time Type Code");
  cy.getButtonWithText("Save").click();
  cy.getButton("Save").click();
});
