import { faker } from "@faker-js/faker";

describe("Create Area Type record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/AreaType/Create");
  });

  it("Create Area Type without Code", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new Area types data", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
