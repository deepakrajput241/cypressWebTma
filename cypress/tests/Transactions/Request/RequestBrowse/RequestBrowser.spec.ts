describe("Request Browse - Create and Delete Query", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RequestBrowse/Create");
  });

  it("Create Request Browser and Create Query", () => {
    cy.wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000);
    cy.get("select[ng-model='dataItem.searchFieldId']")
      .eq(0)
      .should("be.visible")
      .select("Request Date");
    cy.get("select[ng-model='dataItem.searchFieldId']")
      .eq(1)
      .select("Request Type");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(1)
      .select("is equal to");
    cy.get(".btn.btn-default.k-val-btn").eq(0).click();
    cy.get("input[placeholder='Search']").type("Automation Request Type");
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", "Request Type Browser");
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").click();
    cy.wait(2000); // Without wait it will throw error
  });

  it("Delete Added Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Request Type Browser"
    );
    //this.deleteQuery();
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
