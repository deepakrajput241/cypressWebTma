it("Create PM Generation Batch Job", { tags: "@spreadsheet" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/BatchJob/Create");
  cy.get("a[name='PMGeneration']").click();
  cy.get(".entryTitle:contains('Batch Job Entry')").should("be.visible");
  cy.get("input[name='Next']").click();
  cy.wait(500);
  cy.get("select[aria-label='Location Type Id']").select("Building");
  cy.fillCombobox("Location Code", "ADMIN");
  cy.get("input[name='Save']").click();

  cy.wait(1000);
  cy.reload();
});
