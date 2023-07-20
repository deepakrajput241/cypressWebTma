describe("Progress Report Types Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJProgressReportType");
  });

  it("Navigation to First Button", () => {
    cy.getButton("First").click();
  });

  it("Navigation to Previous Button", () => {
    cy.getButton("Prev").click();
  });

  it("Navigation to Next Button", () => {
    cy.getButton("Next").click();
  });

  it("Navigation to Last Button", () => {
    cy.getButton("Last").click();
  });
});
