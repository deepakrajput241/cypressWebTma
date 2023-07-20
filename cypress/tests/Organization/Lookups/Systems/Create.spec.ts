import { faker } from "@faker-js/faker";

describe("Create System record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/SystemType/Create");
  });

  it("System - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/SystemType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center Grid\r\n"
    );
  });

  it("Create a System with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
