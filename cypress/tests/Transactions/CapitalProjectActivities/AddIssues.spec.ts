it("Create new Issue Records", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJIssue/Create/Identity");
  cy.get("select[name='WorkflowId']").select(2);
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.fillCombobox("Priority Code", "Auto_379");
  cy.getButton("Save").click();
});
