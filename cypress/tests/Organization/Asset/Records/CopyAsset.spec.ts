import { faker } from "@faker-js/faker";

it("Copy Asset Record With reuired Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Asset");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("Type Description");
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
