import { faker } from "@faker-js/faker";

it("Copy Utility Transformer record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityTransformer");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
