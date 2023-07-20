it("should login the user", () => {
  cy.visit("/Login");
  cy.get("#Username").type(Cypress.env("user1").loginId);
  cy.get("#Password").type(Cypress.env("user1").password);
  cy.get("#Client").type(Cypress.env("user1").clientName);
  cy.contains("Log in").click();
  // TODO: check for successful login
});
