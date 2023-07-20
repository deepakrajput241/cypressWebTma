import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Budget Revision Type", () => {
  let budgetId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("copy CPPM Budget Revision Type record", () => {
    cy.visit("/#!/Lookup/CJBudgetRevisionType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJBudgetRevisionType/Create?copyId=?*",
      200
    ).then((id) => {
      budgetId = id;
    });
  });

  it("Edit CPPM Budget Revision Type record", () => {
    cy.visit(`/#!/Lookup/CJBudgetRevisionType/${budgetId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Budget Revision Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
