it("Delete Biomed Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CEEquipmentTransfer/Create/Identity");
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.get("a[name='Search']").click();
  cy.fillCombobox("To Facility Name", "Automation Facility");
  cy.get("[ng-change='gridCtrl.AddSelectedPK(dataItem)']").eq(0).click();
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
