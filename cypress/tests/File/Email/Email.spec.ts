describe("Create Email Records", () => {
  function DeleteCriteria() {
    cy.wait(1500);
    const indexDelete = [0, 0, 0, 0];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.get("a[title='Delete']").eq(indexDelete[i]).click();
    }
  }

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Email/Create");
  });

  it("Select List Result Data", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible");
    cy.getButtonWithText("Reset Criteria").click();
    cy.getButtonWithText("List Results").click();
  });

  it("Add New Criteria and Save Query", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    DeleteCriteria();
    cy.get("#lnkAddCriteria").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").select(5).wait(1000);
    cy.getButtonWithText("Save Query As").click();
    cy.wait(1000);
    cy.EditInputElement("Name", "Query1");
    cy.getButtonWithText("Save").click();
    cy.wait(1000);
    cy.getButtonWithText("List Results").click();
  });

  it("Delete Query", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible");
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .select("Query1")
      .wait(1000);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
