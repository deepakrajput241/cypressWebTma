describe("Create Key Core Management query", () => {
  const data = {
    keyNumber: "Auto-Key",
    browserName: "Automation Browser",
    customBrowserName: "Automation Custom Browser",
    lockCode: "Auto-Lock",
    repairCenterCode: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CoreManagement/Create");
  });

  it("Verify List result and save Query", () => {
    cy.wait(2000);
    cy.get("input[ng-model='dataItem.searchCriteriaValue']")
      .eq(0)
      .wait(500)
      .click();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.getCriteriaDropdown("Lock Type Code").select("Key #");
    cy.getCriteriaDropdown("Lock Type Desc").select("Lock #");
    cy.getButtonWithText("List Results").click();
    cy.get("span[ng-bind='WindowTitle']:contains('Core Management')").should(
      "be.visible"
    );
    cy.get("a[ng-click='openBrowseQuery()']").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.browserName);
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").click();
    cy.wait(500);
  });

  it("Delete added Browser", () => {
    cy.wait(2000);
    cy.get(".entryTitle:contains('Query')").should("be.visible");
    cy.get("input[ng-model='dataItem.searchCriteriaValue']")
      .eq(0)
      .wait(500)
      .click();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(500);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Automation Browser"
    );
    cy.wait(1000);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
