it("Create Batch PM Update", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/BatchPMUpdate/Create/Identity");
  cy.get(".entryTitle:contains('Query')").should("be.visible");
  cy.wait(1000);
  cy.getButtonWithText("Reset Criteria").click();
  cy.wait(1000);
  const indexDelete = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  for (var i = 0; i < indexDelete.length; i++) {
    cy.xpath(
      `//*[@id="divCriteria"]/ul/li[${indexDelete[i]}]/div/span[2]/span/span[1]/a[1]/span`
    ).click();
  }
  cy.get("#lnkAddCriteria").click();
  cy.get("select[ng-model='dataItem.searchFieldId']").select(17);
  cy.get("select[ng-model='dataItem.searchOperatorId']").select(0);
  cy.get("select[ng-model='dataItem.searchCriteriaValue']").select(6);
  cy.getButtonWithText("List Results").click();
  cy.wait(1000);
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) =>
      cy
        .xpath(
          `//*[@id="browseGrid"]/div[3]/table/tbody/tr[${Cypress._.random(
            1,
            row.length
          )}]/td[1]/input`
        )
        .click()
    );
  cy.wait(500);
  cy.get("input[name='MassUpdateBtn']").click().wait(2000);
  cy.get("a[aria-label='Update']").click();
});
