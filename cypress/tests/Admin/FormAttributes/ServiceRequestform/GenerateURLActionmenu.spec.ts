it("Generate Request URL from Action Menu", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RequestPortal");
  cy.get("span[ng-bind='WindowTitle']:contains('Service Request Form')").should(
    "be.visible"
  );
  cy.get("div[ng-bind='actionItem.Langstring']")
    .contains("Generate Request URL")
    .click();
  cy.get("input[ng-click='goToURL()']").click();
});
