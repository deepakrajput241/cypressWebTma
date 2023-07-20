import { faker } from "@faker-js/faker";

it("Delete Division", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Division/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
