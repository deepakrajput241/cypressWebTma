describe("Validate Custodial Browse", () => {
  const data = {
    name: "Insp Browse Test",
    repairCenterCode: "FAC",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CDInspectionBrowse/Create");
  });

  it("Create Custodial Inspection Browser query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.fillInput("Query Name", "Insp Browse Test");
    cy.fillCombobox("Repair Center Code", "Auto-01");
    cy.getButtonWithText("Save").click();
    cy.wait(500);
    cy.getCriteria3DotMenu("Supervisor Name").click();
    cy.get("input[aria-label='Trade Code']")
      .eq(0)
      .click()
      .type("Auto")
      .wait(1000)
      .type("{downArrow}{enter}");
    cy.get("a[name='btnFilter']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.wait(500);
    cy.getButtonWithText("List Results").click();
  });

  it("Delete Added Query", () => {
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Insp Browse Test"
    );
    cy.get("a[name='DeleteQueryBtn']", { timeout: 30000 }).click();
  });
});
