describe("Validate Render And Copy System Report", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Report");
  });

  it("Render Report", () => {
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Render Report")
      .click();
    cy.getButtonWithText("PDF").click();
    cy.wait(1000);
    cy.getButtonWithText("Excel").click();
  });

  it("Copy System Report", () => {
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Copy System Report")
      .click();
    cy.get(".k-master-row.ng-scope").eq(0).click();
    cy.getButtonWithText("Save").click();
  });
});
