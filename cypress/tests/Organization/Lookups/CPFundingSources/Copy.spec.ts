import { faker } from "@faker-js/faker";

it("Search and Copy CP Funding Source Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPFundingSource");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();
});
