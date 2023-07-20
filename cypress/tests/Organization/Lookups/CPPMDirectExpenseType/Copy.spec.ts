import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Direct Expense Type", () => {
  let expenseId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Direct Expense Type record", () => {
    cy.visit("/#!/Lookup/CJDirectExpenseType");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJDirectExpenseType/Create?copyId=?*",
      200
    ).then((id) => {
      expenseId = id;
    });
  });

  it("Edit CPPM Direct Expense Type record", () => {
    cy.visit(`/#!/Lookup/CJDirectExpenseType/${expenseId}`);

    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Direct Expense Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
