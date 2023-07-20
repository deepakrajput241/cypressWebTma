describe("Area Function Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/AreaFunction");
  });

  it("Navigate to first button", () => {
    cy.getButton("First").click();
  });

  it("Navigate to Prev button", () => {
    cy.getButton("Prev").click();
  });

  it("Navigate to Next button", () => {
    cy.getButton("Next").click();
  });

  it("Navigate to Last button", () => {
    cy.getButton("Last").click();
  });
});
