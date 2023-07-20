const data = { technicianCode: "101" };

function batchUpdate() {
  cy.wait(2000);
  cy.get(".k-grid-content.k-auto-scrollable").then((data) => {
    if (data.find("tr").length > 0) {
      cy.get(".k-grid-content.k-auto-scrollable")
        .find("tr")
        .then((row) =>
          cy
            .xpath(
              `/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[2]/div/div[2]/div/tma-data-grid/div/div[2]/table/tbody/tr[${Cypress._.random(
                1,
                row.length
              )}]/td[1]/input`
            )
            .click()
        );
      cy.get("input[name='BatchUpdate']").click();
    } else {
      cy.openFlyoutAndSelectRandomValue("Technician Name");
      cy.get("a[name='FindTechnician']").click();
      batchUpdate();
    }
  });
}

it("Manage Training Technician Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/TrainingManageTechnician/Create");
  cy.openFlyoutAndSelectRandomValue("Technician Name");
  cy.get("a[name='FindTechnician']").click();
  batchUpdate();
});
