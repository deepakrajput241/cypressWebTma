it("Print Asset Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/AssetTransfer");
  cy.wait(2000);
  cy.getButton("Print").click();
  cy.get("a[aria-label='PDF']").should("be.visible");
  cy.get("a[aria-label='HTML']").should("be.visible");
  cy.get("a[aria-label='Excel']").should("be.visible");
  cy.get("a[aria-label='Image']").should("be.visible");
  cy.get("a[aria-label='Cancel']").click();
});
