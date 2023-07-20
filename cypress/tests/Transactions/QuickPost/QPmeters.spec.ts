it("Create Quick Post Meters Reading", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/QPMeter/Create/Identity");
  cy.openFlyoutAndSelectRandomValue("Technician Code");
  cy.fillCombobox("Item Tag Number", "102306412");
  cy.fillCombobox("Meter Name", "pfft");
  cy.fillInputTextBox("Value", "1");
  cy.getButtonWithText("Save").click();
  cy.intercept("POST", "/QPMeter/Create?*").as("createNewRecord");
  cy.getButton("Save").click();
  cy.wait("@createNewRecord").its("response.statusCode").should("eq", 200);
});
