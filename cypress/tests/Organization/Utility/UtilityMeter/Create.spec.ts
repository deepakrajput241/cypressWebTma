import { faker } from "@faker-js/faker";

describe("Create Utility Meter record", () => {
  const data = {
    locationId: "ADMIN-100A",
    weatherStation: "123213",
    serviceType: "Auto-International",
    vendor: "3M",
    chargeAccount: "1111 2222 3333 4444",
    creditAmount: "1111 2222 3333 4444",
    budgetCode: "Auto-7180",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityMeter/Create");
  });

  it("Utility Meter - Negative Cases", { tags: "@smoke" }, () => {
    //Without Servive Type
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Service Type is required\r\n");

    //Without Code
    cy.openFlyoutAndSelectRandomValue("Service Type");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    //Without Description
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    //without Repair Center
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UtilityMeter/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center Code\r\n"
    );
  });

  it(
    "Create Utility Meter record with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(99999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Service Type");
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Utility Meter record with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.openFlyoutAndSelectRandomValue("Weather Station");
    cy.openFlyoutAndSelectRandomValue("Service Type");
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.openFlyoutAndSelectRandomValue("Charge Account");
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.openFlyoutAndSelectRandomValue("Budget Code");
    cy.fillCheckbox("Chargeable");
    cy.openFlyoutAndSelectRandomValue("Transformer");
    cy.openFlyoutAndSelectRandomValue("Rate Schedule");
    cy.get("select[name='SummerAdjCode']").select(
      "User enters adjustment factors by hand"
    );
    cy.get("select[name='WinterAdjCode']").select(
      "Adjust billing period, length, and cost"
    );
    cy.EditInputElement("Location", faker.address.city());
    cy.fillCheckbox("Roll cost to building");
    cy.fillCheckbox("Adjust For Changes");
    cy.fillCheckbox("Area Included");
    cy.fillCheckbox("Production");
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(9999));
    cy.fillNumericTextBox(5, faker.datatype.number(9999));
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.fillCheckbox("Linked to EMS");
    cy.fillCheckbox("Sub-Meter");
    cy.fillCheckbox("Readings Entered");
    cy.fillCheckbox("Track Demand");
    cy.fillCheckbox("Convert");
    cy.editTextarea("Comments", faker.random.words(5));

    cy.selectRepairCenter();

    cy.contains("Readings").click();
    cy.get("#toolbarAddUtilityMeterReading").click();
    cy.fillCombobox("Technician", 1);
    cy.fillCombobox("Utility Service", 1);
    cy.fillCombobox("Route", 1);
    cy.EditInputElement("Value", faker.datatype.number(10));
    cy.fillCheckbox("Increment Current Reading");
    cy.getButtonWithText("Save").click();

    cy.contains("Serviced Locations").click();
    cy.get("#toolbarAddLocation").click();
    cy.fillCombobox("Location ID", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(99));
    cy.getButtonWithText("Save").click();
    cy.get("a").contains("Auto Distribute").click();

    cy.clickSaveAndCheckResponse();
  });
});
