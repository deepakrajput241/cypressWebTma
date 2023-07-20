describe("Create Area Template Mass Update", () => {
  const data = {
    queryName: "CD Mass UpdateTest",
    repairCenterCode: "FAC",
    areaType: "CNS",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CDAreaTemplateMassUpdate/Create/Identity");
  });

  it("Create Area Template Mass Update", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.fillInput("Query Name", "CD Mass UpdateTest");
    cy.fillCombobox("Repair Center Code", "Auto-01");
    cy.getButtonWithText("Save").click();
    cy.wait(500);
    cy.getCriteria3DotMenu("Area Type").click();
    cy.get("input[placeholder='Search']").type("Achieve");
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.getButtonWithText("List Results").click();
  });

  it("Delete Added Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "CD Mass UpdateTest"
    );
    cy.get("a[name='DeleteQueryBtn']").should("be.visible").click().wait(500);
  });
});
