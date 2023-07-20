describe("Disposal Types Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/DisposalType");
  });

  it("Disposal Type Navigate to First", () => {
    cy.getButton("First").click();
  });

  it("Disposal Type Navigate to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Disposal Type Navigate to Next", () => {
    cy.getButton("Next").click();
  });

  it("Disposal Type Navigate to Last", () => {
    cy.getButton("Last").click();
  });
});
