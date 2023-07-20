import { faker } from "@faker-js/faker";

const data = {
  formCode: "47",
  repairCenterCode: "17082",
  resultTypeCode: "001",
  superVisorName: "Adam Hanson",
  technicianCode: "101",
};

describe("Create Custodial Inspection - negative scenarios, Create and Delete", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CDInspection/Create");
  });

  it(
    "should not create Custodial Inspection without required fields",
    { tags: "@smoke" },
    () => {
      // the fields are out of order due to form flow
      // missing 'Form Code'
      cy.fillInput("Description", faker.random.words(5));
      cy.fillCombobox("Result Type Code", data.resultTypeCode);
      cy.fillCombobox("Repair Center Code", data.repairCenterCode);
      cy.fillDateInput(
        "Inspection Date",
        faker.date.past().toLocaleDateString("en-US")
      );
      cy.clickSaveAndCheckAlert(
        "Form Code is required\r\nForm Description is required\r\n"
      );

      // missing 'Description'
      cy.clearInput("Description");
      cy.fillCombobox("Form Code", data.formCode);
      cy.clickSaveAndCheckAlert("Description is required\r\n");

      // missing 'Result Type Code'
      cy.fillInput("Description", faker.random.words(5));
      cy.clearCombobox("Result Type Code");
      cy.clickSaveAndCheckAlert(
        "Result Type Code is required\r\nResult Type Description is required\r\n"
      );

      // missing 'Repair Center Code'
      cy.fillCombobox("Result Type Code", data.resultTypeCode);
      cy.clearCombobox("Repair Center Code");
      cy.clickSaveAndCheckAlert(
        "Repair Center Code is required\r\nRepair Center is required\r\n"
      );

      // missing 'Inspection Date'
      cy.fillCombobox("Repair Center Code", data.repairCenterCode);
      cy.clearInput("Inspection Date");
      cy.clickSaveAndCheckAlert("Inspection Date is required\r\n");
    }
  );

  it(
    "should create Custodial Inspection with required fields",
    { tags: "@smoke" },
    () => {
      cy.fillInput("Description", faker.random.words(5));
      cy.fillCombobox("Form Code", data.formCode);
      cy.fillCombobox("Result Type Code", data.resultTypeCode);
      cy.fillCombobox("Repair Center Code", data.repairCenterCode);
      cy.fillDateInput(
        "Inspection Date",
        faker.date.past().toLocaleDateString("en-US")
      );
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  // TODO: finish this test - only has required fields at the moment
  it.skip("should create Custodial Inspection with all fields", () => {
    cy.fillInput("Description", faker.random.words(5));
    cy.fillCombobox("Form Code", data.formCode);
    cy.fillCombobox("Result Type Code", data.resultTypeCode);
    cy.fillCombobox("Repair Center Code", data.repairCenterCode);
    cy.fillDateInput(
      "Inspection Date",
      faker.date.past().toLocaleDateString("en-US")
    );
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
