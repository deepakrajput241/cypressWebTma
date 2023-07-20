import { faker } from "@faker-js/faker";

it("Create and copy CP Appropriation Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPAppropriation/Create");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();
});
