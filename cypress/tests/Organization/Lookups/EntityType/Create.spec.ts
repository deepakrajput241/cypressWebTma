import { faker } from "@faker-js/faker";

describe("Create Entity Type record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/EntityType/Create/Identity");
  });

  it("Entity Type - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.get("input[name='Code']").clear();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/EntityType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Entity Type Repair Center Grid\r\n"
    );
  });

  it("Create Entity Type with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Entity Type with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(99999999));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();

    cy.selectRepairCenter();

    cy.contains("Rates").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(999999));
    cy.fillNumericTextBox(4, faker.datatype.number(9999999));
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.fillNumericTextBox(7, faker.datatype.number(9999));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");

    cy.clickSaveAndCheckResponse();
  });
});
