describe("Department Types Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/DepartmentType");
  });

  it("Department Type Navigate to First", () => {
    cy.getButton("First").click();
  });

  it("Department Type Navigate to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Department Type Navigate to Next", () => {
    cy.getButton("Next").click();
  });

  it("Department Type Navigate to Last", () => {
    cy.getButton("Last").click();
  });
});
