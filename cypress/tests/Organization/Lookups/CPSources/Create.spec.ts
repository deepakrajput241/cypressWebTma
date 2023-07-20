import { faker } from "@faker-js/faker";

describe("Create CP Source record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPSource/Create");
  });

  it("CP Source - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create CP Source record", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });
});
