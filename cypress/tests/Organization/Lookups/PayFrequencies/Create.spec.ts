import { faker } from "@faker-js/faker";

describe("Create Pay Frequency record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/PayFrequency/Create");
  });

  it("Pay Frequency - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/PayFrequency/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it("Create a Pay Frequency with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
