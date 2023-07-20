describe("Document Types Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/DocumentType");
  });

  it("Document Type Navigate to First", () => {
    cy.getButton("First").click();
  });

  it("Document Type Navigate to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Document Type Navigate to Next", () => {
    cy.getButton("Next").click();
  });

  it("Document Type Navigate to Last", () => {
    cy.getButton("Last").click();
  });
});
