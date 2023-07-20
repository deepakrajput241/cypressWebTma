import { faker } from "@faker-js/faker";

const data = {
  transactionType: "BAS - Meter Import",
};

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.selectRepairCenter();
}

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  // Transaction Type is missing aria label
  cy.get("select[id='ddlField']").as("select").select(data.transactionType);
  cy.get("@select")
    .find("option:selected")
    .should("have.text", data.transactionType);
  cy.setWait();
  cy.fillInput("Description", faker.random.words(5));
  addRepairCenter();
}

describe("add Universal Interface Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/UniversalIntegrationSetup/Create");
  });

  it("should not add Universal Interface Setup without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");

    // missing Transaction Type
    // the select element is not clearable so this test never fills it
    cy.reload();
    cy.fillInput("Code", faker.random.numeric(7));
    cy.setWait();
    cy.fillInput("Description", faker.random.words(5));
    addRepairCenter();
    cy.contains("Identity").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UniversalIntegrationSetup/Create?copyId=undefined",
      200,
      "Error",
      "Identity\r\n\r\nTransaction Type is required\r\n"
    );

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    // delete Repair Center
    cy.get("tbody a:first").click();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Repair Center Grid\r\n"
    );
  });

  it(
    "should add Universal Interface Setup with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.setWait();
      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Universal Interface Setup with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    // Transaction Type is missing aria label
    cy.get("select[id='ddlField']").as("select").select(data.transactionType);
    cy.get("@select")
      .find("option:selected")
      .should("have.text", data.transactionType);
    cy.setWait();
    cy.fillInput("Description", faker.random.words(5));
    cy.fillInput("Server Name", faker.random.words(1));
    cy.fillInput("Database Name", faker.random.words(1));
    cy.fillNumericTextBoxInput("Port #", faker.random.numeric(2));
    cy.fillInput("User Name", faker.internet.userName());
    cy.fillInput("Password", faker.internet.password());
    cy.fillInput("Table Name", faker.random.words(1));
    cy.fillInput("Key Column Name", faker.random.words(1));
    cy.fillInput("Processed Column Name", faker.random.words(1));
    cy.fillInput("Error Column Name", faker.random.words(1));
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
