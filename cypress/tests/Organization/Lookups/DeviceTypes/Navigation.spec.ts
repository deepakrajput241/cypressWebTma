describe("Device Type Navigation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/DeviceType");
  });

  it("Device Type Navigate to First", () => {
    cy.getButton("First").click();
  });

  it("Device Type Navigate to Prev", () => {
    cy.getButton("Prev").click();
  });

  it("Device Type Navigate to Next", () => {
    cy.getButton("Next").click();
  });

  it("Device Type Navigate to Last", () => {
    cy.getButton("Last").click();
  });
});
