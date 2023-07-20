it("Batch Update Part", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/BatchPrefVendor/Create");
  cy.get("#lnkAddCriteria").click();
  cy.get("select[ng-model='dataItem.searchFieldId']").select("Warehouse Code");
  cy.get("input[ng-model='dataItem.searchCriteriaValue']", { timeout: 30000 })
    .eq(0)
    .type("0225920311");
  cy.EditInputElement("SearchCriteria", "Auto");
  cy.wait(100);
  cy.get("input[ng-model='dataItem.searchCriteriaValue']").click();
  cy.get("a[name='Search']").click();
  cy.wait(100);
  cy.get("table[class='k-selectable'] input", { timeout: 30000 }).eq(0).click();
  cy.fillCombobox("Update Preferred Vendor With", "Auto test Manufacture");
  cy.get("input[name='BatchUpdate'][type='button']", {
    timeout: 30000,
  }).click();
});
