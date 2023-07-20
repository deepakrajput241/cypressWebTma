import { faker } from "@faker-js/faker";

it("Delete Contract Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/ContractType/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
