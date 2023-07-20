it("View Report manager", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/ReportManager/Create");
  cy.get("span[ng-bind='WindowTitle']:contains('Report Manager')")
    .should("be.visible")
    .wait(500);
  cy.get(".k-toolbar.k-grid-toolbar.ng-scope")
    .find("a")
    .contains("New Browse Selection")
    .click();
  cy.get(".entryTitle:contains('Query')").should("be.visible").wait(500);
  cy.getButtonWithText("Reset Criteria").click();
  cy.wait(1000);
  cy.get("#lnkAddCriteria").click();
  cy.wait(500);
  cy.get("input[ng-model='dataItem.searchCriteriaValue']").type(
    "Capital Planning"
  );
  cy.getButtonWithText("List Results").click();
  cy.get(".k-grid-ViewReport.ng-scope").contains("408").click();
});
