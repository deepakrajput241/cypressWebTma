import { faker } from "@faker-js/faker";

describe("Create Task Record", () => {
  const data = {
    typeDescription: "Account",
    trade: "Account Engineer",
    generalInspectionForm: "1000000",
    defaultPriority: "1 - Safety/Regulatory",
    autotrackDescription: "Replace Roof on Building",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Task/Create");
  });

  it("Task Records- Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Type Description is required\r\n");

    cy.get("input[name='Code']").clear();
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.get("input[name='Description']").clear();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new Task Record", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Task Record with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.openFlyoutAndSelectRandomValue("Trade");
    cy.openFlyoutAndSelectRandomValue("General Inspection Form");
    cy.fillNumericTextBox(0, faker.datatype.number(99));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillCheckbox("Require Action Requested");
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.openFlyoutAndSelectRandomValue("Default Priority");
    cy.openFlyoutAndSelectRandomValue("Autotrack Description");
    cy.fillCheckbox("Available for Request Forms");
    cy.fillCheckbox("Zone Related");
    cy.fillCheckbox("Apply Multiplier");
    cy.fillCheckbox("Master Task");
    cy.fillCheckbox("MedTester Task");
    cy.fillCheckbox("BMP");
    cy.fillCheckbox("Shutdown Notification");
    cy.fillCheckbox("Key Adjustment Task");
    cy.fillNumericTextBox(4, faker.datatype.number(9999));
    cy.fillNumericTextBox(5, faker.datatype.number(9999));
    cy.fillCheckbox("Resolution Required");
    cy.fillCheckbox("Regulatory Agency Related");
    cy.fillCheckbox("KB Resolution Required");
    cy.clickCheckbox("PrintOnPmWorkOrders");
    cy.clickCheckbox("PrintOnNonPmWorkOrders");
    cy.editTextarea("Task Sheet", faker.random.words(5));

    cy.selectRepairCenter();

    cy.contains("Task Check List").click();
    cy.get("#toolbarAddCheck").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Resolution").click();
    cy.get("#toolbarAddResolution").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Requirements").click();
    cy.get("#toolbarAddPart").click();
    cy.get("select[aria-label='Item Types DDL']").select("Area");
    cy.fillCombobox("Code", 3);
    cy.fillCombobox("Part Code", 3);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.getButtonWithText("Save").click();

    //Add Tool
    cy.get("#toolbarAddTool").click();
    cy.get("select[aria-label='Item Type Dropdown List']").select("Tool Type");
    cy.fillCombobox("Item Code", 3);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.getButtonWithText("Save").click();

    //Add Training
    cy.get("#toolbarAddTraining").click();
    cy.fillCombobox("Course Code", 3);
    cy.getButtonWithText("Save").click();

    cy.contains("PMs").click();
    cy.get("#toolbarAddPM").click();
    cy.fillCombobox("Item TagNumber", 2);
    cy.fillCombobox("Repair Center", 2);
    cy.fillCombobox("Work Order Type", 2);
    cy.fillCombobox("Priority", 2);
    cy.fillCombobox("Trade", 2);
    cy.fillCombobox("Technician ID", 2);
    cy.fillCombobox("Department", 2);
    cy.fillCombobox("Account #", 2);
    cy.fillCombobox("Rate Schedule", 2);
    cy.fillCombobox("Warehouse Code", 2);
    cy.fillCheckbox("Charge");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.get("input[aria-label='Season Start']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Season End']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
