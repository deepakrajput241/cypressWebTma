describe("Validate Inspection Finding Batch Validation", () => {
  const data = { query: "Inspection Finding Query", value: "Facility" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/InspectionFindingsBatchValidation/Create/Identity");
  });

  it("Create New Query", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("input[ng-model='dataItem.searchCriteriaValue']").eq(1).type("TMA");
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.query);
    cy.getButtonWithText("Save").click();
    cy.wait(500);

    cy.getButtonWithText("List Results").click();
  });

  it("List Result And Validate the Record", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(500);
    cy.getButtonWithText("List Results").click();
    cy.wait(1000);
    cy.get("input[ng-model='dataItem.selected']")
      .eq(1)
      .click({ timeout: 10000 });
    cy.get("input[name='ValidateRequestBtn']").click().wait(1500);
    cy.get("select[name='LocationTypeId']")
      .should("be.visible")
      .select(data.value);
    cy.fillCombobox("Location Code", 1);
    cy.fillCombobox("Priority", 1);
    cy.fillCombobox("Task Code", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("WO Type", 1);
    cy.getButtonWithText("Accept").click();
  });

  it("Covert To Audit", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(500);
    cy.getButtonWithText("List Results").click();
    cy.wait(1000);
    cy.get("input[ng-model='dataItem.selected']")
      .eq(1)
      .click({ timeout: 10000 });
    cy.get("input[name='ValidateAuditReqBtn']").click().wait(500);
    cy.fillCombobox("Facility", 1);
    cy.fillCombobox("Condition", 1);
    cy.getButtonWithText("Save").click();
  });

  it("Delete Query", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(data.query);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
