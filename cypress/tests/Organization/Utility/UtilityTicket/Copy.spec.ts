it("Copy Utility Ticket record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityTicket");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("Utility Meter");
  cy.get("input[aria-label='Ticket Date']")
    .clear()
    .wait(500)
    .type(new Date().toLocaleDateString("en-US"));
  cy.clickSaveAndCheckResponse();
});
