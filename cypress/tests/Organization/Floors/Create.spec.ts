import { faker } from "@faker-js/faker";

describe("Create Floor", () => {
  const data = { buildingCode: "ADMIN", type: "FLR" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Floor/Create");
  });

  it("Floors - Negative Cases", () => {
    cy.EditInputElement("Number", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickAndCheckAlert(
      "Save",
      "Building Code is required\r\nBuilding Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Building Code");
    cy.get("input[aria-label='Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[name='Number']").clear();
    cy.clickAndCheckAlert("Save", "Floor # is required\r\n");
  });

  it("Create Floors with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Number", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Building Code");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickSaveAndCheckResponse();
  });

  it("Create Floors with All fields", () => {
    cy.EditInputElement("Number", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Building Code");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditInputElement("Latitude", faker.address.latitude());
    cy.EditInputElement("Longitude", faker.address.longitude());
    cy.editTextarea("Floor Description", faker.random.words(5));
    cy.editTextarea("Popup Message", faker.random.words(5));

    //Click on PMs
    cy.contains("PMs").click();
    cy.get("#DefaultAddPm").should("be.visible").click();
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
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();

    //ClickOnrates
    cy.contains("Rates").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.fillNumericTextBox(5, faker.datatype.number(1000));
    cy.fillNumericTextBox(6, faker.datatype.number(1000));
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");

    cy.clickSaveAndCheckResponse();
  });
});
