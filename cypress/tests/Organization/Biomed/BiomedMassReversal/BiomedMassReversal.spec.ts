it("Create Biomed Mass update Reversal", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CEEquipmentMassReversal/Create/Identity");
  cy.get("a[name='SetQueryBtn']").click();
  cy.get("div[id='ulActionMenu']").click();
});
