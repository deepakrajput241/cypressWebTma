import { faker } from "@faker-js/faker";

const data = { regulatoryCategoryCode: "1" };
describe("Create CP Regulation Record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPRegulation/Create");
  });

  it("Create CP Regulation without Code", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.editTextarea("Description", faker.random.words(4));
    cy.clickAndCheckAlert(
      "Save",
      "Regulatory Category Code is required\r\nRegulatory Category Desc is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Regulatory Category Code");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("textarea[aria-label='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Regulation with Required Fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.editTextarea("Description", faker.random.words(4));
    cy.openFlyoutAndSelectRandomValue("Regulatory Category Code");
    cy.clickSaveAndCheckResponse();
  });
});
