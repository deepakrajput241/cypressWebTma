import { faker } from "@faker-js/faker";

describe("Create CPPM Issue Priority record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJIssuePriority/Create");
  });

  it("Issue Priority - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Issue Priority", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.selectRepairCenter();
    cy.contains("a", "Identity").click();
    cy.clickSaveAndCheckResponse();
  });
});
