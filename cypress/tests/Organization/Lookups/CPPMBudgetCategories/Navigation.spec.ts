describe("CPPM Budget Categories Navigation on buttons", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJBudgetCategory");
  });

  it("CPPM Budget Categories Navigation on First", () => {
    cy.getButton("First").click();
  });

  it("CPPM Budget Categories Navigation on Prev", () => {
    cy.getButton("Prev").click();
  });

  it("CPPM Budget Categories Navigation on Next", () => {
    cy.getButton("Next").click();
  });

  it("CPPM Budget Categories Navigation on Last", () => {
    cy.getButton("Last").click();
  });
});
