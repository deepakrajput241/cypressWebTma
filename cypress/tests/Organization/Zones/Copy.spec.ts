import { faker } from "@faker-js/faker";

it("Copy Zone with required fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Zone");

  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
