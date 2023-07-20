describe("Custodial Inspection Form Type Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDInspectionFormType");
  });

  it("Naviagte to First Button", () => {
    cy.getButton("First").click();
  });

  it("Naviagte to Previous Button", () => {
    cy.getButton("Prev").click();
  });

  it("Naviagte to Next Button", () => {
    cy.getButton("Next").click();
  });

  it("Naviagte to Last Button", () => {
    cy.getButton("Last").click();
  });
});
