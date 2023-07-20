describe("Copy And Edit Utility Budget Record", () => {
  let budgetId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Utility Budget record", () => {
    cy.visit("/#!/UtilityBudget");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.get(".k-formatted-value.k-input.ng-scope").clear();
    cy.openFlyoutAndSelectRandomValue("Utility Meter");
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UtilityBudget/Create?copyId=?*",
      200
    ).then((id) => {
      budgetId = id;
    });
  });

  it("Edit Utility Budget record", () => {
    cy.visit(`/#!/UtilityBudget/${budgetId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Utility Budget')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Utility Meter");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
