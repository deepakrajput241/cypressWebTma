function selectSearchItem() {
  cy.wait(2000);
  cy.get("div[k-options='gridCtrl.gridOptions']")
    .find("tr")
    .then((row) =>
      cy
        .xpath(
          `/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[${Cypress._.random(
            1,
            row.length - 1
          )}]/td[1]`
        )
        .click()
    );
}

it("Copy IT Equipment Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/ITEquipmentTransfer");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.get("a[name='Search']").should("be.visible").click();
  selectSearchItem();
  cy.clickSaveAndCheckResponse();
});
