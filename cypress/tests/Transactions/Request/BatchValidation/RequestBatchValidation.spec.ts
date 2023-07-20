function checkPopUp() {
  cy.wait(2000); // Without wait it will throw error.
  cy.get("body[ng-controller='MainController as mainCtrl']").then(($popup) => {
    if ($popup.text().includes("Popup Message")) {
      cy.wait(1000); // Without wait it will throw error
      cy.getButtonWithText("Close").click();
    } else {
      cy.log("Nothing to display.");
    }
  });
}

describe("Batch Validation - Create, Validate and Delete Query", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RequestValidation/Create");
  });

  it("Create Request Log with Required Field", () => {
    cy.wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='dataItem.searchOperatorId']").eq(0).select(15);
    cy.wait(1000);
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
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(0)
      .select("last year");
    cy.get("select[ng-model='dataItem.searchFieldId']")
      .eq(1)
      .select("Work Order #");
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .select("No Query Selected")
      .wait(1000);
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", "Request Type Filter");
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").click();
    cy.wait(1000);
  });

  it("Batch Validate", () => {
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Request Type Filter"
    );
    cy.getButtonWithText("List Results").click();
    cy.wait(1500);
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[2]/div/div/div/div[1]/tma-browse-grid/div/div[3]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("input[name='ValidateRequestBtn']").should("be.visible").click();
    checkPopUp();
    cy.fillCombobox("Task Code", 1);
    checkPopUp();
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("WO Type", 1);
    cy.wait(1000);
    cy.getButtonWithText("Accept").click();
  });

  it("Delete Added Query", () => {
    cy.wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Request Type Filter"
    );
    cy.wait(1000);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
