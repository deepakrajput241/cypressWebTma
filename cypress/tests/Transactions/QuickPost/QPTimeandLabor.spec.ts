it("Create Quick Post Time and Labor Record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/QPTimeLabor/Create/Identity");
  cy.openFlyoutAndSelectRandomValue("Technician Code");
  cy.openFlyoutAndSelectRandomValue("Trade");
  cy.fillInputTextBox("Hours", "6");
  cy.fillCombobox("Time Type Code", "PTO");
  cy.getButtonWithText("Save").click();
  cy.intercept("POST", "/QPTimeLabor/Create?*").as("createNewRecord");
  cy.getButton("Save").click();
  cy.wait("@createNewRecord").its("response.statusCode").should("eq", 200);
});
