import { faker } from "@faker-js/faker";

describe("Create Utility Rate Schedule record", () => {
  const data = { service: "ELE", contractor: "3MMM", repairCenter: "SGQ2EL" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityRateSchedule/Create");
  });

  it("Utility Rate Schedule - Negative Cases", () => {
    //Without Service
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Service");
    cy.clickAndCheckAlert(
      "Save",
      "Contractor is required\r\nContractor Name is required\r\n"
    );

    //Without Contractor
    cy.openFlyoutAndSelectRandomValue("Contractor");
    cy.get("input[aria-label='Service']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Service is required\r\nService Name is required\r\n"
    );

    //without Code
    cy.openFlyoutAndSelectRandomValue("Service");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    //Without Name
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it(
    "Create Utility Rate Schedule record with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(9999999));
      cy.EditInputElement("Name", faker.random.words(5));
      cy.openFlyoutAndSelectRandomValue("Service");
      cy.openFlyoutAndSelectRandomValue("Contractor");
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Utility Rate Schedule record with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Service");
    cy.openFlyoutAndSelectRandomValue("Contractor");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(9999));
    cy.get("input[aria-label='Winter Begins']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Summer Begins']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillCheckbox(
      "Use partial and multiple month billing period averaging method."
    );
    cy.fillCheckbox("Rates change from winter to summer");
    cy.selectRadioBtnById("ServiceCharge-0");
    cy.editTextarea("Comment", faker.random.words(5));

    cy.contains("Demand").click();
    cy.selectRadioBtnById("DemChargeTypeW-1");
    cy.EditInputElement("WUnitCost", faker.datatype.number(99));
    cy.selectRadioBtnById("DemChargeTypeS-0");
    cy.fillNumericTextBox(0, faker.datatype.number({ min: 1, max: 10 }));
    cy.fillNumericTextBox(1, faker.datatype.number({ min: 11, max: 50 }));

    cy.contains("Energy").click();
    cy.selectRadioBtnById("WinterECharge-0");
    cy.selectRadioBtnById("SummerECharge-1");
    cy.fillNumericTextBox(0, faker.datatype.number(99));

    cy.contains("Minimum").click();
    cy.selectRadioBtnById("MinimumCharge-3");
    cy.fillNumericTextBox(0, faker.datatype.number(99));

    cy.contains("Maximum").click();
    cy.selectRadioBtnById("MaxAVGCharge-1");
    cy.fillNumericTextBox(0, faker.datatype.number(99));

    cy.contains("Tax & Adjustments").click();
    cy.selectRadioBtnById("TaxADJMETH-3");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(99));
    cy.fillNumericTextBox(2, faker.datatype.number(999));

    cy.contains("Billed Demand").click();
    cy.selectRadioBtnById("BilledDemand-3");
    cy.EditInputElement("BdFlatRate", faker.datatype.number(999));
    cy.clickSaveAndCheckResponse();
  });
});
