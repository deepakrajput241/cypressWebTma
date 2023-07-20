import { faker } from "@faker-js/faker";

describe("Create Risk Factor Formula record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/RiskFormula/Create");
  });

  it("Risk Factor Formula - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Formula", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.editTextarea("Description", faker.random.words(2));
    cy.get("input[name='Formula']").clear();
    cy.clickAndCheckAlert("Save", "Formula is required\r\n");

    cy.EditInputElement("Formula", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it(
    "Create Risk Factor Formula with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(99999));
      cy.EditInputElement("Formula", faker.random.words(2));
      cy.editTextarea("Description", faker.random.words(2));
      cy.clickSaveAndCheckResponse();
    }
  );
});
