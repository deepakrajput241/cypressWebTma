import { faker } from "@faker-js/faker";

describe("Create Lockout", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lockout/Create");
  });

  it("Lockout - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(1));
    cy.editTextarea("Lock-out Procedure", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Lockout/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Lockout Repair Center Grid\r\n"
    );

    cy.get("textarea[aria-label='Lock-out Procedure']").clear();
    cy.clickAndCheckAlert("Save", "Lock-out Procedure is required\r\n");

    cy.get("input[name='Code']").clear();
    cy.editTextarea("Lock-out Procedure", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.get("input[name='Name']").clear();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it("Create Lockout with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.editTextarea("Lock-out Procedure", faker.random.words(5));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Lockout with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[aria-label='Last Modified']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.selectRadioBtnById("RiskLevel-1");
    cy.editTextarea("Lock-out Procedure", faker.random.words(5));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
