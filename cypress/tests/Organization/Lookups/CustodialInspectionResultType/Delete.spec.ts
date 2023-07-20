import { faker } from "@faker-js/faker";

it("Delete Custodial Inspection Result Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CDInspectionResultType/Create");
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
