// TODO: see if we can simplify these selectors
it("Create Tools Transfer Records with required fields information.", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/ToolTransfer/Create/Identity");
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.openFlyoutAndSelectRandomValue("Repair Center");
  cy.openFlyoutAndSelectRandomValue("Location ID");
  cy.openFlyoutAndSelectRandomValue("Account");
  cy.openFlyoutAndSelectRandomValue("Assigned Tech");
  cy.get('input[name="SearchCriteria"]').type("Auto");
  cy.get("#FilterCriteria > div > div > div > dl > dd > a > span").click();
  cy.selectCheckBoxFromGrid(
    "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]"
  );
  cy.clickAndCheckResponse("Save", "POST", "/ToolTransfer/Create?*", 200);
});
