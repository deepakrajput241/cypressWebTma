import { faker } from "@faker-js/faker";

describe("Create Master Check", () => {
  const data = { type: "108226" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/MasterCheck/Create");
  });

  it("Master Check - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.editTextarea("Description", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/MasterCheck/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Master Check Center Grid\r\n"
    );

    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("textarea[aria-label='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Master Check with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.editTextarea("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Master Check with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.editTextarea("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("select[aria-label='Control']").select("Input Requested");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
