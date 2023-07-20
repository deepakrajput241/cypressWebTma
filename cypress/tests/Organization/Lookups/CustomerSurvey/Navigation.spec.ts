describe("Customer Surveys Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Survey");
  });

  it("Customer Survey Navigation to First", () => {
    cy.getButton("First").click();
  });

  it("Customer Survey Navigation to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Customer Survey Navigation to Next", () => {
    cy.getButton("Next").click();
  });

  it("Customer Survey Navigation to Last", () => {
    cy.getButton("Last").click();
  });
});
