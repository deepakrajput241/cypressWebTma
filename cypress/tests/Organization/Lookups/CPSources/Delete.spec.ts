import { faker } from "@faker-js/faker";

it("Delete CP Source Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPSource/Create");
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
