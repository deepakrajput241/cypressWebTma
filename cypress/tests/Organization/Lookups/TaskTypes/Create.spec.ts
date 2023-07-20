import { faker } from "@faker-js/faker";

describe("Create Task Type record", () => {
  const data = {
    defaultTradeName: "Account Engineer",
    budgetCode: "101 Labor",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/TaskType/Create");
  });

  it("Task Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/TaskType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it("Create a Task Type with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
