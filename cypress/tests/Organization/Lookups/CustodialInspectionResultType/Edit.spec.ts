import { faker } from "@faker-js/faker";

it("Edit Custodial Inspection Result Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CDInspectionResultType/Create");
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.get(
    "span[ng-bind='WindowTitle']:contains('Custodial Inspection Result Types')"
  ).should("be.visible");
  cy.wait(500);
  cy.contains("a", "Identity").click();
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAfterEditAndCheckResponse();
});
