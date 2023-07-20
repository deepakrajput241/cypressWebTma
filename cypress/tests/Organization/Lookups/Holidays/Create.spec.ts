import { faker } from "@faker-js/faker";

describe("Create Holiday record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Holiday/Create/Identity");
  });

  it("Holidays - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.random.words(2));
    cy.fillDateInput("Start");
    cy.clickAndCheckAlert("Save", "End Date is required\r\n");

    cy.fillDateInput("End Date");
    cy.get("input[aria-label='Start Date']").clear();
    cy.clickAndCheckAlert("Save", "Start Date is required\r\n");

    cy.fillDateInput("Start");
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Holiday/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Holiday Repair Center Grid\r\n"
    );
  });

  it("Create a Holiday with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.random.words(2));
    cy.fillDateInput("Start");
    cy.fillDateInput("End Date");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
