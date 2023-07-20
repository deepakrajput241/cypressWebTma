import { faker } from "@faker-js/faker";

it("Copy Region with Required fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Region");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Name", faker.random.words(2));
  cy.EditInputElement("Code", `A${faker.datatype.number(99999)}`);
  cy.clickSaveAndCheckResponse();
});
