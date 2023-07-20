import { faker } from "@faker-js/faker";

describe("Create New Inspection Form", () => {
  const data = {
    repairCenterCode: "SGQ2EL",
    taskCode: "000000",
    defaultPriorityCode: "1",
    defaultRepairCenterCode: "SGQ2EL",
    defaultTaskCode: "000000",
    defaultWoTypeCode: "100",
    defaultTradeCode: "Trade76553",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/GeneralInspectionForm/Create");
  });

  it("Inspection Form - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.clickAndCheckAlert(
      "Save",
      "Task Code is required\r\nTask Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Task Code");
    cy.get("input[aria-label='Repair Center Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Repair Center Code is required\r\nRepair Center Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create new Inspection Form with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(9999999));
      cy.EditInputElement("Name", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Repair Center Code");
      cy.openFlyoutAndSelectRandomValue("Task Code");
      cy.clickSaveAndCheckResponse();
    }
  );

  it(
    "Create new Inspection Form with All Fields",
    { tags: "@spreadsheet" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(9999999));
      cy.EditInputElement("Name", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Repair Center Code");
      cy.openFlyoutAndSelectRandomValue("Task Code");
      cy.openFlyoutAndSelectRandomValue("Default Priority Code");
      cy.openFlyoutAndSelectRandomValue("Default Repair Center Code");
      cy.openFlyoutAndSelectRandomValue("Default Task Code");
      cy.openFlyoutAndSelectRandomValue("Default WO Type Code");
      cy.openFlyoutAndSelectRandomValue("Default Trade Code");

      cy.contains("Inspection Checks").click();
      cy.get("#toolbarAddCheck").should("be.visible").click();
      cy.editTextarea("Description", faker.random.words(2));
      cy.fillCheckbox("Pass / Fail");
      cy.fillCheckbox("Reading");
      cy.fillCheckbox("Comments");
      cy.openFlyoutAndSelectRandomValue("Priority");
      cy.openFlyoutAndSelectRandomValue("Repair Center");
      cy.openFlyoutAndSelectRandomValue("Task");
      cy.openFlyoutAndSelectRandomValue("WO Type");
      cy.openFlyoutAndSelectRandomValue("Trade");
      cy.getButtonWithText("Save").click();

      cy.contains("Layout").click();
      cy.get("#toolbarAddSection").click();
      cy.EditInputElement("Description", faker.random.words(2));
      cy.getButtonWithText("Save").click();
      cy.get("input[ng-change='gridCtrl.AddSelectedPK(dataItem)']")
        .eq(0)
        .click();
      cy.get("#toolbarAddItemSelected").click();
      cy.wait(2000);
      cy.get(".entryTitle").contains("Item Entry");
      cy.selectCheckBoxFromGrid(
        "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.getButtonWithText("Add Selected").click();
      cy.get("a[aria-label='Expand']").click();
      cy.get("input[ng-change='gridCtrl.AddSelectedPK(dataItem)']")
        .eq(1)
        .click();
      cy.get("#toolbarAddCheckSelected").click().wait(2000);
      cy.selectCheckBoxFromGrid(
        "/html/body/pageslide[1]/div/div/div/div[2]/form/div[2]/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.getButtonWithText("Add Selected").click();
      cy.get("#toolbarDeleteSelectedRows").should("be.visible").click();

      cy.clickSaveAndCheckResponse();
    }
  );
});
