import { faker } from "@faker-js/faker";

describe("Create CP Audit Type record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPAuditType/Create");
  });

  it("CP Audit - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new CP Audit Type Data", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
