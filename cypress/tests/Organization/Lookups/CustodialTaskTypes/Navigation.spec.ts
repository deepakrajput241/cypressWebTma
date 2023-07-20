describe("Custodial Task Type Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDTaskType");
  });

  it("Custodial Task Type Navigate to First", () => {
    cy.getButton("First").click();
  });

  it("Custodial Task Type Navigate to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Custodial Task Type Navigate to Next", () => {
    cy.getButton("Next").click();
  });

  it("Custodial Task Type Navigate to Last", () => {
    cy.getButton("Last").click();
  });
});
