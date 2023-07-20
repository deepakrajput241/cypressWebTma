it("Navigates to Getting Started", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  cy.get(".dropdown.yamm-fw").contains("Help").click();
  cy.get("#lim2220").click();
  cy.get("#ulSubm2220 > li:nth-child(1)").click();
  cy.contains("Welcome to the new WebTMA!").should("exist");
});
