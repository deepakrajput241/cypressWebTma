describe("Create And Validate RI Browse", () => {
  const data = { query: "RI Browse Query" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RoomInspectionBrowse/Create/Identity");
  });

  it("Create New Query", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    const indexDelete = [1, 1, 1];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.get("a[ng-click='treeViewCtrl.deleteCriteria(dataItem)']")
        .eq(indexDelete[i])
        .click();
    }
    cy.get("select[ng-model='dataItem.searchFieldId']")
      .eq(0)
      .select("Inspection Date");
    cy.get("select[ng-model='dataItem.searchFieldId']")
      .eq(1)
      .select("Form Description");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(0)
      .select("last year");
    cy.get("input[ng-model='dataItem.searchCriteriaValue']")
      .click()
      .type("Form 3")
      .wait(500)
      .type("{downArrow}{enter}");

    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.query);
    cy.getButtonWithText("Save").click();
    cy.wait(500);

    cy.getButtonWithText("List Results").click();
  });

  it("Delete Query", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(data.query);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
