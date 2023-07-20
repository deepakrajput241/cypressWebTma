it("Edit Biomed Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CEEquipmentTransfer/Create/Identity");
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.get("a[name='Search']").click();
  cy.fillCombobox("To Facility Name", "Automation Facility");
  cy.get("[ng-change='gridCtrl.AddSelectedPK(dataItem)']").eq(0).click();
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.openFlyoutAndSelectRandomValue("Repair Center");
  cy.get("a[name='Search']").click();
  cy.selectCheckBoxFromGrid(
    "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.clickSaveAfterEditAndCheckResponse();
});
