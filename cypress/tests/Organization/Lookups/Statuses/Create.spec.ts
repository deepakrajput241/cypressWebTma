import { faker } from "@faker-js/faker";

describe("Create Status record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Status/Create");
  });

  it("Status - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create a Status with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });
});
