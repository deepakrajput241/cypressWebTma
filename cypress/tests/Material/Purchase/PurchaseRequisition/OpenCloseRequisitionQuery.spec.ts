describe("Create Query to show Open And Closed Requsitions", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PurchaseRequisition/");
  });

  it("Create Query to show Open Requisitions", () => {
    cy.get("#lnkBrowsePanelShow").click();
    cy.get("input[name='AddQueryBtn']").click();
    cy.get("#lnkBrowsePanelShow").click();
    cy.wait(1000);
    cy.get("input[name='AddQueryBtn']").click().wait(1000);
    cy.get("select[ng-model='dataItem.searchFieldId']").select("Status (Full)");
    cy.get("select[ng-model='dataItem.searchOperatorId']").select("contains");
    cy.get("input[ng-model='dataItem.searchCriteriaValue']").type("Open");
    cy.get("input[name='FindBtn']").click();
    cy.get("input[name='SaveQueryBtn']").click();
    cy.EditInputElement("Name", "Show Open Requisitions");
    cy.getButtonWithText("Save").click();
    cy.get("input[name='CloseBtn']").click();
  });

  it("Create Query to show Closed Requisitions", () => {
    cy.get("#lnkBrowsePanelShow").click();
    cy.get("input[name='AddQueryBtn']").click();
    cy.get("#lnkBrowsePanelShow").click();
    cy.wait(1000);
    cy.get("input[name='AddQueryBtn']").click().wait(1000);
    cy.get("select[ng-model='dataItem.searchFieldId']").select("Status (Full)");
    cy.get("select[ng-model='dataItem.searchOperatorId']").select("contains");
    cy.get("input[ng-model='dataItem.searchCriteriaValue']").type("Close");
    cy.get("input[name='FindBtn']").click();
    cy.get("input[name='SaveQueryBtn']").click();
    cy.EditInputElement("Name", "Show Closed Requisitions");
    cy.getButtonWithText("Save").click();
    cy.get("input[name='CloseBtn']").click();
  });
});
