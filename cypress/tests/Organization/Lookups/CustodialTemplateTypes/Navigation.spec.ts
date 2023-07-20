describe("Custodial Template Types Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDTemplateType");
  });

  it("Custodial Template Type Navigate to First", () => {
    cy.getButton("First").click();
  });

  it("Custodial Template Type Navigate to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Custodial Template Type Navigate to Next", () => {
    cy.getButton("Next").click();
  });

  it("Custodial Template Type Navigate to Last", () => {
    cy.getButton("Last").click();
  });
});
