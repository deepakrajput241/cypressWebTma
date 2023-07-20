import { faker } from "@faker-js/faker";

it("Copy Email Groups record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/EmailGroup");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
