it("Navigates to Linked Documents", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  cy.get(".dropdown.yamm-fw").contains("Help").click();
  cy.get("#lim2220").click();
  cy.get("#ulSubm2220 > li:nth-child(5)").click();
  cy.contains("This is your Linked Documents menu").should("exist");
});
