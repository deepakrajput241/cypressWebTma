describe("Create a Project Browse", () => {
  const data = {
    queryName: "Project Browse Test",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ProjectBrowse/Create/Identity");
  });

  it("Create Request Browser", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.getCriteria3DotMenu("Repair Center Name").click();
    cy.get("input[placeholder='Search']").type("Auto repair center");
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.fillInput("Query Name", "Project Browse Test");
    cy.fillCombobox("Repair Center Code", "Auto-01");
    cy.getButtonWithText("Save").click();
    cy.wait(2000);
  });

  it("Delete Added Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Project Browse Test"
    );
    cy.get("a[name='DeleteQueryBtn']", { timeout: 30000 })
      .should("be.visible")
      .click();
  });
});
