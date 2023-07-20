import { faker } from "@faker-js/faker";

it("Copy Site", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Site/1002/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
