import { faker } from "@faker-js/faker";

it("Copy CP Estimate Model record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPEstimateModel/1135/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
