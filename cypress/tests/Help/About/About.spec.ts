it("Navigates to About", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  cy.get(".dropdown.yamm-fw").contains("Help").click();
  cy.get("#liw1073").click();
  cy.contains("WebTMA Information").should("exist");
});
