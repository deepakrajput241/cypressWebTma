const fileName = "Asset-WebTMAExport.xlsx";

// TODO: add back .xlsx file and fix .gitignore
it.skip("Maintenance Item Batch Import", { tags: ["@smoke"] }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MaintenanceItemBatchImport/Create");
  cy.wait(1500);
  cy.get("select[name='ItemTypeId']").select(2);
  cy.get("#fileUpload").attachFile(fileName);
  cy.get("input[value='Load Data To Grid From File']")
    .should("be.visible")
    .click();
  cy.get("input[value='Verify Records']").should("be.visible").click();
  cy.get("input[value='Import Records to Database']")
    .should("be.visible")
    .click();
});
