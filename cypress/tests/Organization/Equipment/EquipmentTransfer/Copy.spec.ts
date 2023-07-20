it("Copy Equipment Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/EquipmentTransfer/1000/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.EditInputElement("SearchCriteria", "Auto");
  cy.get("a[name='Search']").click();
  cy.selectCheckBoxFromGrid(
    "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.clickSaveAndCheckResponse();
});
