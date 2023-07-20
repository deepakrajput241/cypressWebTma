const data = { pCardNumber: "1" };

it("should create PCard Reconcile Query with required information", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PCardReconcile/Create");
  cy.contains("New Transaction Query").click();
  cy.fillCombobox("PCard #", data.pCardNumber);
  cy.clickSaveAndCheckResponse();
});
