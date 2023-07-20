import { faker } from "@faker-js/faker";
import { fill } from "cypress/types/lodash";

const data = {
  capitalSetup: "Auto Minivan",
  building: "Katrina Building",
  justification: "DP",
  impactPriority: "1018880",
  uniformat1: "1079",
  uniformat2: "B10",
  uniformat3: "B1010",
  uniformat4: "B1010.10",
  weTypeDescription: "Facility Improvement",
  areaType: "ACH",
  parentNo: "1",
  appropriation: "G",
  department: "ALTED",
  Assessor: "101",
  Contractor: "ABLFNC",
  estimatorCode: "101",
  trade: "ADMIN",
  estimateType: "Labor",
  technician: "101",
};

function fillRequiredFields() {
  cy.fillInput("Title", faker.random.words(5));
  cy.fillCombobox("Capital Setup", data.capitalSetup);
  cy.fillCombobox("WE Type Description", data.weTypeDescription);
  cy.fillCombobox("Justification", data.justification);
  cy.fillCombobox("Impact Priority", data.impactPriority);
  cy.fillCombobox("UniFormat 1", data.uniformat1);
  cy.fillDateInput(
    "Base Cost Date",
    faker.date.recent().toLocaleDateString("en-US")
  );
  cy.fillDateInput(
    "Scheduled Date",
    faker.date.future().toLocaleDateString("en-US")
  );
}

describe("create Work Element record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CPWorkElement/Create");
  });

  it("should not create Work Element without required fields", () => {
    // missing Title
    fillRequiredFields();
    cy.clearInput("Title");
    cy.clickSaveAndCheckAlert("Title is required\r\n");

    // missing Capital Setup
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Capital Setup");
    cy.clickSaveAndCheckAlert("Capital Setup is required\r\n");

    // missing WE Type Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("WE Type Description");
    cy.clickSaveAndCheckAlert("WE Type Description is required\r\n");

    // missing Justification
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Justification");
    cy.clickSaveAndCheckAlert(
      "Justification is required\r\nJustification Description is required\r\n"
    );

    // missing Impact Priority
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Impact Priority");
    cy.clickSaveAndCheckAlert(
      "Impact Priority is required\r\nImpact Priority Description is required\r\n"
    );

    // missing UniFormat 1
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("UniFormat 1");
    cy.clickSaveAndCheckAlert(
      "UniFormat 1 is required\r\nUniFormat 1 Description is required\r\n"
    );

    // missing Base Cost Date
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Base Cost Date");
    cy.clickSaveAndCheckAlert("Base Cost Date is required\r\n");

    // missing Scheduled Date
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Scheduled Date");
    cy.clickSaveAndCheckAlert("Scheduled Date is required\r\n");
  });

  it(
    "should create Work Element with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Work Element With All Fields", () => {
    cy.EditInputElement("Title", faker.datatype.number(99999));
    cy.fillCombobox("Capital Setup", "District");
    cy.get("select[aria-label='LocationTypeDDL']")
      .should("be.visible")
      .select(1);
    cy.openFlyoutAndSelectRandomValue("Location");
    cy.get("select[aria-label='Item Type']").should("be.visible").select(1);
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.openFlyoutAndSelectRandomValue("Justification");
    cy.openFlyoutAndSelectRandomValue("Impact Priority");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.word(3));
    cy.openFlyoutAndSelectRandomValue("WE Type Description");
    cy.get("input[aria-label='Base Cost Date']")
      .should("be.visible")
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.get("input[aria-label='Scheduled Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Area Type");
    cy.openFlyoutAndSelectRandomValue("Parent #");
    cy.fillNumericTextBox("0", faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Appropriation");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Assessor");
    cy.openFlyoutAndSelectRandomValue("Contractor");
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Source");
    cy.get("input[aria-label='Design Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Study Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Start Date']")
      .should("be.visible")
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.fillCheckbox("Client Request");
    cy.fillCheckbox("H2O Conser.");
    cy.fillCheckbox("Preservation");
    cy.fillCheckbox("ADA");
    cy.fillCheckbox("Environmental");
    cy.fillCheckbox("Energy Savings");
    cy.fillCheckbox("Other");
    cy.editTextarea("Deficiency", faker.commerce.productDescription());
    cy.xpath("//*[@role='tab' and text()='Notes']")
      .should("be.visible")
      .click();
    cy.EditInputElement("SubLocation", faker.address.city());
    cy.editTextarea("Solution", faker.random.words(3));
    cy.editTextarea("Coordination", faker.random.words(3));
    cy.editTextarea("Comments", faker.random.words(3));
    cy.xpath("//*[@role='tab' and text()='Energy Conservation Measure']")
      .should("be.visible")
      .click();
    cy.EditInputElement("Title", faker.name.jobTitle());
    cy.fillCombobox("Source Code", 1);
    cy.EditInputElement("ECMNumber", faker.datatype.number(1000));
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));

    cy.get("#toolbarAddUtilityItem").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").should("be.visible").click();

    cy.editTextarea("Deficiency", faker.commerce.productDescription());
    cy.editTextarea("Coordination", faker.commerce.productDescription());
    cy.editTextarea("Comments", faker.commerce.productDescription());
    cy.editTextarea("Notes", faker.commerce.productDescription());
    cy.xpath("//*[@role='tab' and text()='Regulation Xref']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddRegulation").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").should("be.visible").click();
    cy.clickSaveAndCheckResponse();
  });
});
