it("Create Quick Post Survey Result", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/QPSurveyResult/Create/Identity");
  cy.fillCombobox("Work Order#", "FM-1002");
  cy.get("input[name='EnterResultBtn'][type='button']")
    .should("be.visible")
    .click();
  cy.getButton("Save").click();
});
