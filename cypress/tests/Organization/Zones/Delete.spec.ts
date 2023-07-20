import { faker } from "@faker-js/faker";

it("Delete Zone record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Zone/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
