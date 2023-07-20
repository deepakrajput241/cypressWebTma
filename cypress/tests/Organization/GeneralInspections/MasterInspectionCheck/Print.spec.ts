it("Master Inspection Check Print", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MasterInspectionCheck");
  cy.get(
    "span[ng-bind='WindowTitle']:contains('Master Inspection Check')"
  ).should("be.visible");
  cy.wait(2000);
  cy.getButton("Print").click();
  cy.get("a[aria-label='PDF']").should("be.visible");
  cy.get("a[aria-label='HTML']").should("be.visible");
  cy.get("a[aria-label='Excel']").should("be.visible");
  cy.get("a[aria-label='Image']").should("be.visible");
  cy.get("a[aria-label='Cancel']").click();
});
