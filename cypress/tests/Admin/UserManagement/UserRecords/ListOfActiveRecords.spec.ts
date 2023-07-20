describe("Pull List of Active Records", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UserManagement/");
  });

  it("List of Active Users", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.get("#lnkBrowsePanelShow").click().wait(500);
    cy.get(".entryTitle:contains('TMA Browse')").should("be.visible");
    cy.getButtonWithText("Close").click().wait(500);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get("input[name='AddQueryBtn']").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").select("active");
    cy.get("#lnkAddCriteria").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").eq(1).select("Role");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(1)
      .select("is equal to");
    cy.get("select[ng-model='dataItem.searchCriteriaValue']").select("User");
    cy.get("input[name='FindBtn']").click();
    cy.get("input[name='SaveQueryBtn']").click();
    cy.EditInputElement("Name", "Active User Records");
    cy.wait(500);
    cy.getButtonWithText("Save").click();
  });

  it("List of Active Technicians", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get(".entryTitle:contains('TMA Browse')").should("be.visible");
    cy.getButtonWithText("Close").click().wait(500);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get("input[name='AddQueryBtn']").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").select("active");
    cy.get("#lnkAddCriteria").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").eq(1).select("Role");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(1)
      .select("is equal to");
    cy.get("select[ng-model='dataItem.searchCriteriaValue']").select(
      "Technician"
    );
    cy.get("input[name='FindBtn']").click();
    cy.get("input[name='SaveQueryBtn']").click();
    cy.EditInputElement("Name", "Active Technicians");
    cy.getButtonWithText("Save").click();
  });

  it("List of Active Requestor", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get(".entryTitle:contains('TMA Browse')").should("be.visible");
    cy.getButtonWithText("Close").click().wait(500);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get("input[name='AddQueryBtn']").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").select("active");
    cy.get("#lnkAddCriteria").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").eq(1).select("Role");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(1)
      .select("is equal to");
    cy.get("select[ng-model='dataItem.searchCriteriaValue']").select(
      "Requestor"
    );
    cy.get("input[name='FindBtn']").click();
    cy.get("input[name='SaveQueryBtn']").click();
    cy.EditInputElement("Name", "Active Requestor");
    cy.getButtonWithText("Save").click();
  });

  it("List of Active Contractor", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get(".entryTitle:contains('TMA Browse')").should("be.visible");
    cy.getButtonWithText("Close").click().wait(500);
    cy.get("#lnkBrowsePanelShow").click();
    cy.get("input[name='AddQueryBtn']").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").select("active");
    cy.get("#lnkAddCriteria").click();
    cy.get("select[ng-model='dataItem.searchFieldId']").eq(1).select("Role");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(1)
      .select("is equal to");
    cy.get("select[ng-model='dataItem.searchCriteriaValue']").select(
      "Contractor"
    );
    cy.get("input[name='FindBtn']").click();
    cy.get("input[name='SaveQueryBtn']").click();
    cy.EditInputElement("Name", "Active Contractor");
    cy.getButtonWithText("Save").click();
  });
});
