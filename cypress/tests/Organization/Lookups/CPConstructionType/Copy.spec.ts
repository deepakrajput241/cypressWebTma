import { faker } from "@faker-js/faker";

it("copy CP Construction Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPConstructionType");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
