it(
  "Create Quick Post Utility Meters with Required fields",
  { tags: "@smoke" },
  () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPUtilityMeter/Create/Identity");
    cy.fillCombobox("Technician", 1);
    cy.fillCombobox("Utility Service", "ELE");
    cy.fillCombobox("Meter", "UM");
    cy.EditInputElement("Value", "6");
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  }
);
