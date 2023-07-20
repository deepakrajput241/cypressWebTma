it("Navigates to Find Panel", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  cy.get(".dropdown.yamm-fw").contains("Help").click();
  cy.get("#lim2220").click();
  cy.get("#ulSubm2220 > li:nth-child(4)").click();
  cy.contains("To use the Search Panel click on the search icon.").should(
    "exist"
  );
});
