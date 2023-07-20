import { faker } from "@faker-js/faker";

describe("Create New Entity", () => {
  const data = {
    facilityName: "123",
    typeDescription: "Fountain",
    departmentName: "Community Education",
    account: "1111 2222 3333 4444",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Entity/Create");
  });

  it("Entity - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.clickAndCheckAlert("Save", "Type Description is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("input[aria-label='Facility Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Tag # is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Entity/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Centers\r\n"
    );
  });

  it("Create Entity with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Entity with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.openFlyoutAndSelectRandomValue("Department Name");
    cy.openFlyoutAndSelectRandomValue("Assigned Technician");
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.editTextarea("Additional Description", faker.random.words(5));
    cy.editTextarea("Location", faker.random.words(5));
    cy.get("input[aria-label='Install Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Registered Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Purchase Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.EditInputElement("SubLocation", faker.random.words(1));
    cy.EditInputElement("SerialNumber", faker.datatype.number(99999));
    cy.EditInputElement("ModelNumber", faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.EditInputElement("Latitude", faker.datatype.number(99999999));
    cy.EditInputElement("Longitude", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Lock-Out Proc");
    cy.editTextarea("Popup Message", faker.random.words(5));

    //Checkout
    cy.contains("Checkout").click();
    cy.get("#toolbarAddItem").click();
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.EditInputElement("CurrentJob", faker.random.words(1));
    cy.get(
      "input[aria-label='Time Out'][k-options='dateTimeCtrl.dateOptions']"
    ).type(new Date().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Time Out'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.getButtonWithText("Save").click();

    cy.selectRepairCenter();

    //Meters
    cy.contains("Meters").click();
    cy.get("#toolbarAddMeter").click();
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.get("a[ng-click='saveRecord()']").click();

    //PMs
    cy.contains("PMs").click();
    cy.get("#DefaultAddPm").click();
    cy.fillCombobox("Task Code", 3);
    cy.fillCombobox("Repair Center", 3);
    cy.fillCombobox("Work Order Type", 3);
    cy.fillCombobox("Priority Code", 3);
    cy.fillCombobox("Trade", 3);
    cy.fillCombobox("Department", 3);
    cy.fillCombobox("Account #", 3);
    cy.fillCombobox("Technician Code", 3);
    cy.fillCombobox("Rate Schedule", 3);
    cy.fillCombobox("Warehouse Code", 3);
    cy.fillCheckbox("Charge");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.get("a[ng-click='saveRecord()']").click();

    //IT
    cy.contains("IT").click();
    cy.get("#toolbarAddQuestion").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").click();

    //Rates
    cy.contains("Rates").click();
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(99999));
    cy.fillNumericTextBox(7, faker.datatype.number(99999));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillNumericTextBox(9, faker.datatype.number(99999));
    cy.fillNumericTextBox(10, faker.datatype.number(99999));
    cy.EditInputElement("UsageUnit", faker.datatype.number(99999));

    cy.clickSaveAndCheckResponse();
  });
});
