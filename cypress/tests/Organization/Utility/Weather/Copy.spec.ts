it("Copy Weather record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Weather");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
  cy.openFlyoutAndSelectRandomValue("Station Code");
  cy.fillNumericTextBox(0, new Date().getFullYear());
  cy.get("select[aria-label='Month']").select(
    new Date().toLocaleString("default", { month: "long" })
  );
  cy.getButton("Save").click();
});
