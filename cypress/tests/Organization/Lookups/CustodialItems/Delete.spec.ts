import { faker } from "@faker-js/faker";

it("Delete Custodial Item Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CDItem/Create");
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
