import { faker } from "@faker-js/faker";

describe("Create SOP", () => {
  const data = { type: "Tool" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/SOP/Create");
  });

  it("SOP - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/SOP/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for SOP Repair Center Grid\r\n"
    );

    cy.get("input[name='Code']").clear();
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.get("input[name='Name']").clear();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it("Create SOP with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create SOP with All fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.editTextarea("Standard Operating Procedure", faker.random.words(5));
    cy.EditInputElement("Source", faker.random.words(1));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
