import { faker } from "@faker-js/faker";

describe("Create CPPM Budget Categories", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJBudgetCategory/Create");
  });

  it("CPPM Budget Categories - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new CPPM Budget Categories Data", { tags: "@smoke" }, () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJBudgetCategory/Create/Identity");
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
