it("should list results of Ground Inspection Browse", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/GRNInspectionBrowse/Create");
  cy.contains("Reset Criteria").click();
  // this wait makes the test run more reliably
  cy.wait(500);
  cy.contains("List Results").click();
  // this wait makes the test run more reliably
  cy.wait(500);
  // expect at least five results in the table
  cy.get(".k-grid-content tr").eq(4).should("exist");
});
