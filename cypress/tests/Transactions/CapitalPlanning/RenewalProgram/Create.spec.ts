import { faker } from "@faker-js/faker";

const data = {
  capitalSetup: "District Wide",
  building: "ACA-BOYD",
  biomed: "15",
  fundingSource: "Test",
  uniformat1: "B",
  uniformat2: "B10",
  uniformat3: "B1010",
  uniformat4: "B1010.10",
  weType: "Capital Construction",
  justification: "DP",
  priority: "1",
  estimator: "101",
  trade: "ADMIN",
  costType: "Labor",
  technician: "101",
};

// TODO: finish this test
describe.skip("should create Renewal Programs", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CPRenewalItem/Create");
  });

  it(
    "should not create Renewal Programs when missing required fields",
    { tags: "@smoke" },
    () => {
      // missing "Capital Setup"
      cy.openFlyoutAndSelectRandomValue("UniFormat 1");
      cy.openFlyoutAndSelectRandomValue("WE Type");
      cy.openFlyoutAndSelectRandomValue("Justification");
      cy.openFlyoutAndSelectRandomValue("Priority");
      cy.fillNumericTextBox(0, faker.datatype.number(1000));
      cy.clickSaveAndCheckAlert(
        "Capital Setup is required\r\nLocation is required\r\n"
      );

      // missing "Location"

      // missing "UniFormat 1"
      cy.fillCombobox("Capital Setup", "District Wide");
      cy.get("select[aria-label='LocationTypeDDL']").select(1);
      cy.openFlyoutAndSelectRandomValue("Location");
      cy.get("input[aria-label='UniFormat 1']").eq(0).clear();
      cy.clickSaveAndCheckAlert(
        "UniFormat 1 is required\r\nUniFormat 1 Description is required\r\n"
      );

      // missing "We Type"
      cy.openFlyoutAndSelectRandomValue("UniFormat 1");
      cy.get("input[aria-label='WE Type']").eq(0).clear();
      cy.clickSaveAndCheckAlert(
        "WE Type is required\r\nWE Type Description is required\r\n"
      );

      // missing "Justification"
      cy.openFlyoutAndSelectRandomValue("WE Type");
      cy.get("input[aria-label='Justification']").eq(0).clear();
      cy.clickSaveAndCheckAlert(
        "Justification is required\r\nJustification Description is required\r\n"
      );

      // missing "Priority"
      cy.openFlyoutAndSelectRandomValue("Justification");
      cy.get("input[aria-label='Priority']").eq(0).clear();
      cy.clickSaveAndCheckAlert(
        "Priority is required\r\nCP Priority Description is required\r\n"
      );

      // missing "Frequency"
      cy.openFlyoutAndSelectRandomValue("Priority");
      cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
      cy.clickSaveAndCheckAlert("Frequency is required\r\n");
    }
  );

  it(
    "should create new Renewal Program with required fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Capital Setup", "District Wide");
      cy.get("select[aria-label='LocationTypeDDL']").select(1);
      cy.openFlyoutAndSelectRandomValue("Location");
      cy.openFlyoutAndSelectRandomValue("WE Type");
      cy.openFlyoutAndSelectRandomValue("Justification");
      cy.openFlyoutAndSelectRandomValue("Priority");
      cy.openFlyoutAndSelectRandomValue("UniFormat 1");
      cy.fillNumericTextBox(0, faker.datatype.number(1000));
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  // TODO: fix this test - currently only has required fields
  it.skip("should create Renewal Program with all fields", () => {
    cy.fillCombobox("Capital Setup", "District Wide");
    cy.get("select[aria-label='LocationTypeDDL']").select(1);
    cy.openFlyoutAndSelectRandomValue("Location");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.get("select[aria-label='Item Type']").select(1);
    cy.openFlyoutAndSelectRandomValue("Tag Number");
    cy.openFlyoutAndSelectRandomValue("Funding Source");
    cy.openFlyoutAndSelectRandomValue("WE Type");
    cy.openFlyoutAndSelectRandomValue("Justification");
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.editTextarea("Deficiency", faker.random.words(5));
    cy.editTextarea("Coordination", faker.random.words(5));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.xpath("//*[@role='tab' and text()='Estimate']")
      .should("be.visible")
      .click();
    cy.fillCombobox("Estimator", 2);
    cy.fillCombobox("Estimate Model", 2);
    cy.get("#toolbarAddItem").should("be.visible").click();
    cy.fillCombobox("Trade", 2);
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillCombobox("Estimate Type", 2);
    cy.fillCombobox("Technician", 2);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
