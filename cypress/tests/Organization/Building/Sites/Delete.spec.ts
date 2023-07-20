import { faker } from "@faker-js/faker";

it("Delete Site", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Site/Create/Identity");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
