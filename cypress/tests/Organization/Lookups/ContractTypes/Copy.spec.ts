import { faker } from "@faker-js/faker";

it("Copy Contract Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/ContractType");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();
});
