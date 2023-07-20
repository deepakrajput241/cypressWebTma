it("Edit System form attribute record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SystemFormAttribute");
  cy.getButton("Edit").click();
  cy.getButton("Cancel").click();
});
