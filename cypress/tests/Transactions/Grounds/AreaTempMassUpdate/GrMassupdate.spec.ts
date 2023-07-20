describe("Ground Area Template Mass Update - Create and Delete Query", () => {
  const data = {
    name: "GRNUpdateTest",
    repairCenterCode: "FAC",
    areaType: "ACH",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/GRNAreaTemplateMassUpdate/Create/Identity");
  });

  it("Create Area Template Mass Update Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.getButtonWithText("Save Query As").click();
    cy.EditInputElement("Name", "GRNUpdateTest");
    cy.fillCombobox("Repair Center Code", "2");
    cy.getButtonWithText("Save").click();
    cy.wait(2000);
    cy.getCriteria3DotMenu("Area Type").click();
    cy.get("input[placeholder='Search']").type("ACH");
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.getButtonWithText("List Results").click();
  });

  it("Delete Added Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "GRNUpdateTest"
    );
    cy.get("a[name='DeleteQueryBtn']", { timeout: 30000 }).click();
  });
});
