import { faker } from "@faker-js/faker";

it("Copy Building Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Building");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Name", faker.datatype.number(99999999));
  cy.clickSaveAndCheckResponse();
});
