import { faker } from "@faker-js/faker";

it("Create and copy Contractor Ratings Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/ContractRating");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
