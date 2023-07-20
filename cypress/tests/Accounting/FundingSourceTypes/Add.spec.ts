import { faker } from "@faker-js/faker";

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

function addSubtype() {
  cy.contains("Add Subtype").click();
  // the aria-label is not unique
  cy.get("input[aria-label='Code']").eq(1).type(faker.random.numeric(7));
  cy.setWait();
  // the aria-label is not unique
  cy.get("input[aria-label='Description']").eq(1).type(faker.random.words(5));
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  cy.setWait();
  cy.fillInput("Description", faker.random.words(5));
  addRepairCenter();
}

describe("add Funding Source Type", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CAFundingSourceType/Create");
  });

  it("should not add Funding Source Type without required fields", () => {
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

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    // delete Repair Center
    cy.get("tbody a:first").click();
    cy.contains("Identity").click();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for CA Funding Source Type Repair Center\r\n"
    );
  });

  it(
    "should add Funding Source Type with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.setWait();
      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Funding Source Type with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    cy.setWait();
    cy.fillInput("Description", faker.random.words(5));
    addSubtype();
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
