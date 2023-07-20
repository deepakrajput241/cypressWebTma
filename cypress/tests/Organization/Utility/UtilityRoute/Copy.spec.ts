import { faker } from "@faker-js/faker";

it("Copy Utility Route record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityRoute");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
