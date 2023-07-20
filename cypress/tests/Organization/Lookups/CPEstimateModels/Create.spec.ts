import { faker } from "@faker-js/faker";

describe("Create CP  Estimate Model", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPEstimateModel/Create");
  });

  it("CP Estimate Model - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new CP Estimate Model Data", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
