import { faker } from "@faker-js/faker";

const data = { taskCode: "56369374", taskType: "Auto-15" };

function addFacility() {
  cy.contains("Add Facility").click();
  // the table loads very slowly
  cy.get("tbody input:first", { timeout: 10000 }).check();
  cy.contains("button", "Add Selected").click();
}

function addPmSchedule() {
  cy.contains("Add PM Schedule").click();
  cy.fillCombobox("Task Type", data.taskType);
  cy.fillCombobox("Task Code", data.taskCode);
  // this doesn't work
  cy.get("li[ng-if='1==1'] a[aria-label='Save']").click({ force: true });
}

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(4));
  cy.setWait();
  cy.fillInput("Description", faker.random.words(5));
}

describe("add Rate Schedule of type Work Order", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RateSchedule/Create");
  });

  it("should not add Rate Schedule of type Work Order without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");
  });

  it(
    "should add Rate Schedule of type Work Order with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Rate Schedule of type Work Order with all fields, and then delete it", () => {
    // this form loads slowly
    cy.fillInput("Code", faker.random.numeric(4));
    cy.setWait();
    cy.fillInput("Description", faker.random.words(5));
    cy.fillNumericTextBoxInput("Hourly Rate", faker.finance.amount());
    cy.setWait();
    cy.fillNumericTextBoxInput(
      "Labor % Markup",
      faker.commerce.price(99).toString()
    );
    cy.fillNumericTextBoxInput(
      "Part % Markup",
      faker.commerce.price(99).toString()
    );
    cy.fillNumericTextBoxInput(
      "Rental/Other % Markup",
      faker.commerce.price(99).toString()
    );
    cy.fillNumericTextBoxInput(
      "Contractor % Markup",
      faker.commerce.price(99).toString()
    );
    // no Contract data so skip
    cy.addFirstItemFromSlideOverTable("Add Building", "Save");
    addFacility();
    cy.addFirstItemFromSlideOverTable("Add Department", "Add Selected");
    // the Save button on this slide-over is problematic
    // addPmSchedule();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
