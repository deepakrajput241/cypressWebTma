it("Navigates to Fast find", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  cy.get(".dropdown.yamm-fw").contains("Help").click();
  cy.get("#lim2220").click();
  cy.get("#ulSubm2220 > li:nth-child(2)").click();
  cy.contains("This is the Fast Find search box").should("exist");
});
