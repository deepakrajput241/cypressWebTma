import { faker } from "@faker-js/faker";

it("Create and delete Contractor Ratings Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/ContractRating/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
