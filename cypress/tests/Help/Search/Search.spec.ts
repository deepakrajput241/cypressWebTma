it("Navigates to search", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/help/Content/Home.htm");
  cy.contains("Search").should("exist");
});
