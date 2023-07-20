describe("Check Types Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CheckType");
  });

  it("Navigate to First button", () => {
    cy.getButton("First").click();
  });

  it("Navigate to Previous button", () => {
    cy.getButton("Prev").click();
  });

  it("Navigate to Next button", () => {
    cy.getButton("Next").click();
  });

  it("Navigate to Last button", () => {
    cy.getButton("Last").click();
  });
});
