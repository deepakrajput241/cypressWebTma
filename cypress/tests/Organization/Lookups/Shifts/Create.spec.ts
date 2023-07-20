import { faker } from "@faker-js/faker";

describe("Create Shift record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Shift/Create");
  });

  it("Shift - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.fillTimeInput("Shift Start", "12:00 AM");
    cy.fillTimeInput("Shift End", "01:00 AM");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Color is required\r\n");

    cy.get("select[name='Color']").select("Black");
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Shift/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it("Create a Shift with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.fillTimeInput("Shift Start", "12:00 AM");
    cy.fillTimeInput("Shift End", "12:00 AM");
    cy.get("select[name='Color']").select("Black");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
