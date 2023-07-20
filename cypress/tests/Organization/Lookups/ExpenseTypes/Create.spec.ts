import { faker } from "@faker-js/faker";

describe("Create Expense Type record", () => {
  const data = { budgetCode: "Other", account: "1111 2222 3333 4444" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/ExpenseType/Create/Identity");
  });

  it("Expense Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create an Expense Type with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
